import { Router } from 'express';
import { db } from '../config/database.js';

const router = Router();

// Track page view
router.post('/pageview', async (req, res) => {
  try {
    const { page_path, referrer, user_agent, session_id } = req.body;

    if (!page_path) {
      return res.status(400).json({ error: 'page_path is required' });
    }

    await db.query(
      'INSERT INTO analytics_page_views (page_path, referrer, user_agent, session_id) VALUES ($1, $2, $3, $4)',
      [page_path, referrer || null, user_agent || null, session_id || null]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Analytics page view error:', error);
    // Don't fail silently to not disrupt UX
    res.status(200).json({ success: true });
  }
});

// Track click event
router.post('/click', async (req, res) => {
  try {
    const { event_name, event_data, page_path, session_id } = req.body;

    if (!event_name || !page_path) {
      return res.status(400).json({ error: 'event_name and page_path are required' });
    }

    await db.query(
      'INSERT INTO analytics_events (event_name, event_data, page_path, session_id) VALUES ($1, $2, $3, $4)',
      [event_name, event_data ? JSON.stringify(event_data) : null, page_path, session_id || null]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Analytics event error:', error);
    res.status(200).json({ success: true });
  }
});

// Track time spent
router.post('/time', async (req, res) => {
  try {
    const { page_path, time_spent, session_id } = req.body;

    if (!page_path || !time_spent) {
      return res.status(400).json({ error: 'page_path and time_spent are required' });
    }

    if (time_spent < 1) {
      return res.status(200).json({ success: true }); // Skip very short visits
    }

    await db.query(
      'INSERT INTO analytics_time_spent (page_path, time_spent, session_id) VALUES ($1, $2, $3)',
      [page_path, time_spent, session_id || null]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Analytics time spent error:', error);
    res.status(200).json({ success: true });
  }
});

// GET analytics data (admin)
router.get('/dashboard', async (req, res) => {
  try {
    // Page views summary
    const pageViewsResult = await db.query(`
      SELECT page_path, COUNT(*) as views
      FROM analytics_page_views
      WHERE created_at > NOW() - INTERVAL 30 DAY
      GROUP BY page_path
      ORDER BY views DESC
      LIMIT 20
    `);

    // Events summary
    const eventsResult = await db.query(`
      SELECT event_name, COUNT(*) as count
      FROM analytics_events
      WHERE created_at > NOW() - INTERVAL 30 DAY
      GROUP BY event_name
      ORDER BY count DESC
    `);

    // Recent page views
    const recentViewsResult = await db.query(`
      SELECT page_path, referrer, user_agent, created_at
      FROM analytics_page_views
      ORDER BY created_at DESC
      LIMIT 50
    `);

    res.json({
      pageViews: pageViewsResult.rows,
      events: eventsResult.rows,
      recentViews: recentViewsResult.rows,
    });
  } catch (error) {
    console.error('Analytics dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
