import { Router } from 'express';
import { db } from '../config/database.js';

const router = Router();

// GET all workshops (public)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, title, description, date, end_date, time, location, capacity, price, category, image_url, facilitator, highlights, created_at, updated_at
      FROM workshops
      ORDER BY date ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    res.status(500).json({ error: 'Failed to fetch workshops' });
  }
});

// GET single workshop by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM workshops WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching workshop:', error);
    res.status(500).json({ error: 'Failed to fetch workshop' });
  }
});

// CREATE workshop (admin only)
router.post('/', async (req, res) => {
  try {
    const {
      title, description, date, end_date, time, location,
      capacity, price, category, image_url, facilitator, highlights
    } = req.body;

    const result = await db.query(`
      INSERT INTO workshops (
        title, description, date, end_date, time, location,
        capacity, price, category, image_url, facilitator, highlights
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [title, description, date, end_date, time, location, capacity, price, category, image_url, facilitator, highlights]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating workshop:', error);
    res.status(500).json({ error: 'Failed to create workshop' });
  }
});

// UPDATE workshop (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, description, date, end_date, time, location,
      capacity, price, category, image_url, facilitator, highlights
    } = req.body;

    const result = await db.query(`
      UPDATE workshops
      SET title = $1, description = $2, date = $3, end_date = $4, time = $5,
          location = $6, capacity = $7, price = $8, category = $9,
          image_url = $10, facilitator = $11, highlights = $12
      WHERE id = $13
      RETURNING *
    `, [title, description, date, end_date, time, location, capacity, price, category, image_url, facilitator, highlights, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating workshop:', error);
    res.status(500).json({ error: 'Failed to update workshop' });
  }
});

// DELETE workshop (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM workshops WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error deleting workshop:', error);
    res.status(500).json({ error: 'Failed to delete workshop' });
  }
});

export default router;
