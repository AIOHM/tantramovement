import { db } from '../config/database.js';

export async function checkAdminAuth(req, res, next) {
  try {
    // Check for session token in header or cookie
    const authHeader = req.headers.authorization;
    const sessionToken = req.headers['x-admin-session'] || req.cookies?.admin_session;

    if (!sessionToken) {
      return res.status(401).json({ error: 'Admin authentication required' });
    }

    // Verify JWT token
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);

    if (!decoded || !decoded.adminId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Verify admin still exists in DB (optional)
    const result = await db.query(
      'SELECT id, is_active FROM admin_users WHERE id = $1',
      [decoded.adminId]
    );

    if (result.rows.length === 0 || !result.rows[0].is_active) {
      return res.status(401).json({ error: 'Admin user not found or deactivated' });
    }

    req.admin = { id: decoded.adminId };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired' });
    }
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
}
