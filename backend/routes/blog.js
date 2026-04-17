import { Router } from 'express';
import { db } from '../config/database.js';

const router = Router();

// GET all blog posts (public)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, title, content, image_url, author, date, excerpt, created_at
      FROM blog_posts
      ORDER BY date DESC NULLS LAST, created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET single blog post by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM blog_posts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// CREATE blog post (admin only) - will be protected by middleware
router.post('/', async (req, res) => {
  try {
    const { title, content, image_url, author, date, excerpt } = req.body;

    const result = await db.query(`
      INSERT INTO blog_posts (title, content, image_url, author, date, excerpt)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [title, content, image_url, author, date, excerpt]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// UPDATE blog post (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url, author, date, excerpt } = req.body;

    const result = await db.query(`
      UPDATE blog_posts
      SET title = $1, content = $2, image_url = $3, author = $4, date = $5, excerpt = $6
      WHERE id = $7
      RETURNING *
    `, [title, content, image_url, author, date, excerpt, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// DELETE blog post (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

export default router;
