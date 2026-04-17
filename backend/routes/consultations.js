import { Router } from 'express';
import { Resend } from 'resend';
import { db } from '../config/database.js';

const router = Router();

// Initialize Resend only if API key is provided
let resendClient = null;
if (process.env.RESEND_API_KEY) {
  resendClient = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn('RESEND_API_KEY not set - email notifications will be disabled');
}

// Submit consultation request
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, timezone, message } = req.body;

    if (!name || !email || !timezone) {
      return res.status(400).json({ error: 'Name, email, and timezone are required' });
    }

    // Save to database
    const result = await db.query(`
      INSERT INTO consultation_requests (name, email, phone, timezone, message, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `, [name, email, phone || null, timezone, message || null]);

    // Send notification email if configured
    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: `Tantra Movement <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: [process.env.ADMIN_EMAIL || 'contact@tantramovement.com'],
          subject: `🗓️ New Discovery Call Request: ${name}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #722F37; border-bottom: 2px solid #D4A574; padding-bottom: 10px;">
                New Discovery Call Request
              </h1>

              <div style="background: #FDF8F3; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #4A3728; margin-top: 0;">Applicant Details</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #722F37;">${email}</a></p>
                ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #722F37;">${phone}</a></p>` : ''}
                <p><strong>Timezone:</strong> ${timezone}</p>
              </div>

              ${message ? `
              <div style="background: #fff; border-left: 4px solid #D4A574; padding: 15px; margin: 20px 0;">
                <h3 style="color: #4A3728; margin-top: 0;">Their Message</h3>
                <p style="white-space: pre-wrap; color: #555;">${message}</p>
              </div>
              ` : ''}

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <a href="${process.env.FRONTEND_URL || 'https://ttc.tantramovement.com'}/admin/consultations"
                   style="display: inline-block; background: #722F37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                  View in Admin Panel →
                </a>
              </div>

              <p style="color: #888; font-size: 12px; margin-top: 30px;">
                This email was sent from the Tantra Movement website discovery call form.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request
      }
    }

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Consultation submission error:', error);
    res.status(500).json({ error: 'Failed to submit consultation request' });
  }
});

// Get all consultation requests (admin)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM consultation_requests ORDER BY created_at DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});

// Update consultation status (admin)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = await db.query(
      'UPDATE consultation_requests SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({ error: 'Failed to update consultation' });
  }
});

// Delete consultation request (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM consultation_requests WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ error: 'Failed to delete consultation' });
  }
});

export default router;
