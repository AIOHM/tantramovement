import { Router } from 'express';
import { db } from '../config/database.js';
import { checkAdminAuth } from '../middleware/auth.js';
import { randomUUID } from 'crypto';

const router = Router();

// GET all settings (public - only one row expected)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM site_settings ORDER BY created_at DESC LIMIT 1');
    if (result.rows.length === 0) {
      return res.json({ settings: {} });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// GET single setting by ID (admin)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM site_settings WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// CREATE or UPDATE settings (upsert) - admin only
router.post('/', checkAdminAuth, async (req, res) => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ error: 'Settings object is required' });
    }

    const existing = await db.query('SELECT id FROM site_settings ORDER BY created_at DESC LIMIT 1');

    if (existing.rows.length > 0) {
      const id = existing.rows[0].id;
      await db.query(
        'UPDATE site_settings SET settings = ?, updated_at = NOW() WHERE id = ?',
        [JSON.stringify(settings), id]
      );
      const result = await db.query('SELECT * FROM site_settings WHERE id = ?', [id]);
      return res.json(result.rows[0]);
    }

    const id = crypto.randomUUID();
    await db.query(
      'INSERT INTO site_settings (id, settings) VALUES (?, ?)',
      [id, JSON.stringify(settings)]
    );
    const result = await db.query('SELECT * FROM site_settings WHERE id = ?', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

// DELETE settings (admin)
router.delete('/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM site_settings WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting settings:', error);
    res.status(500).json({ error: 'Failed to delete settings' });
  }
});

export default router;
