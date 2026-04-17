import { Router } from 'express';
import { Resend } from 'resend';
import { db } from '../config/database.js';

const router = Router();

// Initialize Resend only if API key is provided
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn('RESEND_API_KEY not set - email notifications will be disabled');
}

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Save to database
    await db.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject || null, message]
    );

    // Send notification email if configured
    if (resend) {
      try {
        await resend.emails.send({
          from: `Tantra Movement <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: [process.env.ADMIN_EMAIL || 'contact@tantramovement.com'],
          subject: `New Contact Form: ${subject || 'Contact Inquiry'}`,
          html: `
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
            <h2>Message:</h2>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr>
            <p><small>This message was sent from the contact form on your website.</small></p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Newsletter subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Upsert (insert or ignore if exists)
    try {
      await db.query(
        'INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE email = email',
        [email]
      );
    } catch (dbError) {
      console.error('DB error (might be duplicate):', dbError.message);
    }

    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Get all contact messages (admin)
router.get('/messages', async (req, res) => {
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

// Delete contact message (admin)
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM contact_messages WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Get all subscribers (admin)
router.get('/subscribers', async (req, res) => {
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

// Delete subscriber (admin)
router.delete('/subscribers/:id', async (req, res) => {
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
