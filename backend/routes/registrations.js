import { Router } from 'express';
import Stripe from 'stripe';
import { db } from '../config/database.js';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Create checkout session - replaces Supabase edge function
router.post('/create-checkout', async (req, res) => {
  try {
    const { workshopId, customerName, customerEmail, supabaseUrl, supabaseKey } = req.body;

    if (!workshopId || !customerName || !customerEmail) {
      return res.status(400).json({
        error: 'Missing required fields. Please provide workshopId, customerName, and customerEmail.'
      });
    }

    // Fetch workshop from local DB
    const workshopResult = await db.query(
      'SELECT * FROM workshops WHERE id = $1',
      [workshopId]
    );

    if (workshopResult.rows.length === 0) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    const workshop = workshopResult.rows[0];

    // Parse price to get amount in cents
    let amount = 0;
    if (workshop.price_in_cents) {
      amount = workshop.price_in_cents;
    } else {
      const priceString = workshop.price.replace(/^\$/, '');
      const priceValue = parseFloat(priceString);
      if (isNaN(priceValue)) {
        return res.status(400).json({ error: 'Invalid price format' });
      }
      amount = Math.round(priceValue * 100);
    }

    if (amount <= 0) {
      amount = 100; // $1.00 minimum for testing
    }

    // Create order record in local DB
    const orderResult = await db.query(`
      INSERT INTO orders (workshop_id, customer_name, customer_email, amount, currency, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `, [workshopId, customerName, customerEmail, amount, 'usd']);

    const order = orderResult.rows[0];

    // Get frontend base URL for success/cancel redirects
    const baseUrl = process.env.FRONTEND_URL || 'https://ttc.tantramovement.com';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      payment_method_options: {
        card: {
          request_three_d_secure: 'any',
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: workshop.title,
              description: workshop.description || 'Workshop registration',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/workshops?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/workshops?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
      customer_email: customerEmail,
      metadata: {
        order_id: order.id,
        workshop_id: workshopId,
      },
    });

    // Update order with Stripe session ID
    await db.query(
      'UPDATE orders SET stripe_session_id = $1 WHERE id = $2',
      [session.id, order.id]
    );

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
});

// Record a new registration (called after successful payment? or before)
router.post('/', async (req, res) => {
  try {
    const { workshop_id, name, email, phone } = req.body;

    if (!workshop_id || !name || !email) {
      return res.status(400).json({ error: 'Workshop ID, name, and email are required' });
    }

    const result = await db.query(`
      INSERT INTO registrations (workshop_id, name, email, phone, status, payment_status)
      VALUES ($1, $2, $3, $4, 'pending', 'pending')
      RETURNING *
    `, [workshop_id, name, email, phone || null]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ error: 'Failed to create registration' });
  }
});

export default router;
