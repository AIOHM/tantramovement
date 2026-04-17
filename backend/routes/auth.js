import { Router } from 'express';
import { db, redis } from '../config/database.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = Router();

const WP_PASSWORD_ITOA64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const passwordEncode64 = (input, count) => {
  let output = '';
  let i = 0;
  while (i < count) {
    let value = input[i++];
    output += WP_PASSWORD_ITOA64[value & 0x3f];
    if (i < count) {
      value |= input[i] << 8;
    }
    output += WP_PASSWORD_ITOA64[(value >> 6) & 0x3f];
    if (i++ >= count) {
      break;
    }
    if (i < count) {
      value |= input[i] << 16;
    }
    output += WP_PASSWORD_ITOA64[(value >> 12) & 0x3f];
    if (i++ >= count) {
      break;
    }
    output += WP_PASSWORD_ITOA64[(value >> 18) & 0x3f];
  }
  return output;
};

const cryptPrivate = (password, setting) => {
  const output = '*0';
  if (!setting || setting.length < 12 || setting[0] !== '$') {
    return output;
  }

  const countLog2 = WP_PASSWORD_ITOA64.indexOf(setting[3]);
  if (countLog2 < 7 || countLog2 > 30) {
    return output;
  }
  const count = Math.pow(2, countLog2);
  const salt = setting.substring(4, 12);
  if (salt.length !== 8) {
    return output;
  }

  let hash = crypto.createHash('md5').update(salt + password).digest();
  for (let i = 0; i < count; i += 1) {
    hash = crypto.createHash('md5').update(Buffer.concat([hash, Buffer.from(password, 'utf8')])).digest();
  }

  return setting.substring(0, 12) + passwordEncode64(hash, 16);
};

const checkWordPressPassword = (password, storedHash) => {
  if (storedHash.startsWith('$P$') || storedHash.startsWith('$H$')) {
    return cryptPrivate(password, storedHash) === storedHash;
  }
  const md5Hash = crypto.createHash('md5').update(password).digest('hex');
  return md5Hash === storedHash;
};

const isAdminCapabilities = (capabilitiesValue) => {
  if (!capabilitiesValue || typeof capabilitiesValue !== 'string') {
    return false;
  }
  return capabilitiesValue.includes('administrator');
};

// Admin login - password-based authentication
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const tablePrefix = /^[a-zA-Z0-9_]+$/.test(process.env.DB_TABLE_PREFIX || '') ? process.env.DB_TABLE_PREFIX : 'wp_';

    // Try authenticating against WordPress users first
    const wpUserResult = await db.query(
      `SELECT ID AS id, user_login AS username, user_pass AS password_hash, user_email AS email FROM ${tablePrefix}users WHERE user_login = ? LIMIT 1`,
      [username]
    );

    let adminUser = null;
    let useWordPress = false;

    if (wpUserResult.rows.length > 0) {
      const wpUser = wpUserResult.rows[0];
      const validWpPassword = checkWordPressPassword(password, wpUser.password_hash);
      if (!validWpPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const wpCapabilitiesResult = await db.query(
        `SELECT meta_value FROM ${tablePrefix}usermeta WHERE user_id = ? AND meta_key = ? LIMIT 1`,
        [wpUser.id, `${tablePrefix}capabilities`]
      );

      const capabilitiesValue = wpCapabilitiesResult.rows[0]?.meta_value || '';
      if (!isAdminCapabilities(capabilitiesValue)) {
        return res.status(403).json({ error: 'Admin privileges are required' });
      }

      adminUser = {
        id: String(wpUser.id),
        username: wpUser.username,
        email: wpUser.email,
      };
      useWordPress = true;
    }

    if (!useWordPress) {
      const result = await db.query(
        'SELECT id, username, password_hash, is_active, email FROM admin_users WHERE username = ? LIMIT 1',
        [username]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const localAdmin = result.rows[0];
      if (!localAdmin.is_active) {
        return res.status(401).json({ error: 'Account deactivated' });
      }

      const validPassword = await bcrypt.compare(password, localAdmin.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      adminUser = {
        id: localAdmin.id,
        username: localAdmin.username,
        email: localAdmin.email,
      };
    }

    const token = jwt.sign(
      { adminId: adminUser.id, username: adminUser.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Update last login metadata for local admin accounts
    if (!useWordPress) {
      await db.query(
        'UPDATE admin_users SET last_login_at = NOW() WHERE id = ? LIMIT 1',
        [adminUser.id]
      );
    }

    const ttl = 7 * 24 * 60 * 60; // 7 days in seconds
    await redis.setex(`admin_session:${adminUser.id}`, ttl, token);

    res.json({
      success: true,
      token,
      admin: {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify admin session/token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false });
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check Redis for session validity
      const storedToken = await redis.get(`admin_session:${decoded.adminId}`);
      if (!storedToken || storedToken !== token) {
        return res.status(401).json({ valid: false });
      }

      res.json({ valid: true, admin: { id: decoded.adminId, username: decoded.username } });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ valid: false, expired: true });
      }
      return res.status(401).json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin logout
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.decode(token);
      if (decoded?.adminId) {
        await redis.del(`admin_session:${decoded.adminId}`);
      }
    }
    res.json({ success: true });
  } catch (error) {
    res.status(200).json({ success: true });
  }
});

// Change admin password (requires current password)
router.post('/change-password', [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 8 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    // Get current admin
    const result = await db.query(
      'SELECT id, password_hash FROM admin_users WHERE username = $1',
      ['admin']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    const admin = result.rows[0];

    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update in DB
    await db.query(
      'UPDATE admin_users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [newPasswordHash, admin.id]
    );

    // Invalidate all existing sessions
    await redis.del(`admin_session:${admin.id}`);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
