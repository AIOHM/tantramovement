import { Router } from 'express';
import { db } from '../config/database.js';
import { checkAdminAuth } from '../middleware/auth.js';

const router = Router();

// GET all contact messages (admin)
router.get('/messages', checkAdminAuth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// DELETE contact message (admin)
router.delete('/messages/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM contact_messages WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// GET all subscribers (admin)
router.get('/subscribers', checkAdminAuth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 1000'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// DELETE subscriber (admin)
router.delete('/subscribers/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM newsletter_subscribers WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
});

export default router;
