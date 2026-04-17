import { Router } from 'express';
import { db } from '../config/database.js';
import { checkAdminAuth } from '../middleware/auth.js';

const router = Router();

// GET all blog posts (admin view)
router.get('/', checkAdminAuth, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM blog_posts
      ORDER BY date DESC NULLS LAST, created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts (admin):', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

export default router;
