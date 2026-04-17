import { Router } from 'express';
import Stripe from 'stripe';
import { db } from '../config/database.js';
import express from 'express';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Stripe webhook endpoint
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Received webhook event: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);

        if (session.metadata?.order_id) {
          await db.query(
            `UPDATE orders
             SET status = 'completed', payment_intent_id = $1, updated_at = NOW()
             WHERE id = $2`,
            [session.payment_intent, session.metadata.order_id]
          );
          console.log(`Order ${session.metadata.order_id} marked as completed`);
        }
        break;
      }

      case 'payment_intent.requires_action': {
        const paymentIntent = event.data.object;
        console.log(`Payment requires 3D Secure: ${paymentIntent.id}`);

        if (paymentIntent.id) {
          await db.query(
            `UPDATE orders
             SET status = 'requires_authentication', updated_at = NOW()
             WHERE payment_intent_id = $1`,
            [paymentIntent.id]
          );
          console.log(`Updated order status for payment intent ${paymentIntent.id}`);
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`Payment succeeded: ${paymentIntent.id}`);

        if (paymentIntent.id) {
          await db.query(
            `UPDATE orders
             SET status = 'completed', updated_at = NOW()
             WHERE payment_intent_id = $1`,
            [paymentIntent.id]
          );
          console.log(`Updated order status for payment intent ${paymentIntent.id}`);
        }

        // Also update related registration to completed
        if (paymentIntent.metadata?.order_id) {
          await db.query(
            `UPDATE registrations
             SET payment_status = 'completed', status = 'completed'
             WHERE id = (SELECT workshop_id FROM orders WHERE id = $1)`,
            [paymentIntent.metadata.order_id]
          );
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log(`Payment failed: ${paymentIntent.id}`);

        if (paymentIntent.id) {
          await db.query(
            `UPDATE orders
             SET status = 'failed', updated_at = NOW()
             WHERE payment_intent_id = $1`,
            [paymentIntent.id]
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Return 200 to prevent Stripe retries, but log the error
    res.status(200).json({
      received: true,
      warning: 'Error occurred but webhook was acknowledged',
      error: error.message,
    });
  }
});

export default router;
