
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
});
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Received webhook request");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body as text for signature verification
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature") || "";
    
    // Parse the payload if it's not already a JS object
    let event;
    let requestData;
    
    try {
      // First verify the webhook signature
      if (endpointSecret) {
        try {
          event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
          console.log(`Webhook signature verified: ${event.id}`);
        } catch (err) {
          console.error(`Webhook signature verification failed: ${err.message}`);
          return new Response(
            JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }),
            { 
              status: 400, 
              headers: { "Content-Type": "application/json", ...corsHeaders } 
            }
          );
        }
      } else {
        // For development without webhook signing (not recommended for production)
        console.warn("⚠️ No webhook secret configured. Skipping signature verification.");
        try {
          event = JSON.parse(payload);
        } catch (err) {
          console.error(`Failed to parse webhook payload: ${err.message}`);
          return new Response(
            JSON.stringify({ error: `Invalid JSON payload: ${err.message}` }),
            { 
              status: 400, 
              headers: { "Content-Type": "application/json", ...corsHeaders } 
            }
          );
        }
      }
      
      // Try to extract Supabase credentials from the payload if it's JSON
      try {
        requestData = JSON.parse(payload);
      } catch (err) {
        // If payload is not valid JSON or already processed as an event, create an empty object
        requestData = {};
      }
    } catch (err) {
      console.error(`Error processing webhook payload: ${err.message}`);
      return new Response(
        JSON.stringify({ error: `Error processing webhook: ${err.message}` }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Get Supabase credentials (either from request data or environment variables)
    const supabaseUrl = requestData.supabaseUrl || Deno.env.get("SUPABASE_URL");
    const supabaseKey = requestData.supabaseKey || Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
      return new Response(
        JSON.stringify({ error: "Missing Supabase credentials" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase client initialized");

    console.log(`Processing webhook event: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log("Checkout session completed:", session.id);
        
        // Update order status to complete
        if (session.metadata?.order_id) {
          const { error } = await supabase
            .from("orders")
            .update({ 
              status: "completed",
              payment_intent_id: session.payment_intent,
              updated_at: new Date().toISOString()
            })
            .eq("id", session.metadata.order_id);
            
          if (error) {
            console.error("Error updating order:", error);
            // Log the error but don't fail the webhook - return success to Stripe
            // so it doesn't retry unnecessarily
          } else {
            console.log(`Order ${session.metadata.order_id} marked as completed`);
          }
        } else {
          console.log("No order_id in metadata, skipping order update");
        }
        break;
      }
      case 'payment_intent.requires_action': {
        // This event occurs when 3D Secure authentication is required
        const paymentIntent = event.data.object;
        console.log(`Payment requires 3D Secure authentication: ${paymentIntent.id}`);
        
        if (!paymentIntent.id) {
          console.log("No payment intent ID found, skipping order update");
          break;
        }
        
        // Update order status to indicate authentication is required
        const { error } = await supabase
          .from("orders")
          .update({ 
            status: "requires_authentication",
            updated_at: new Date().toISOString()
          })
          .eq("payment_intent_id", paymentIntent.id);
        
        if (error) {
          console.error("Error updating order status for 3D Secure:", error);
          // Continue processing - don't fail the webhook
        } else {
          console.log(`Updated order status for payment intent ${paymentIntent.id}`);
        }
        break;
      }
      case 'payment_intent.succeeded': {
        // This event occurs when a payment is successful (including after 3D Secure)
        const paymentIntent = event.data.object;
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        
        if (!paymentIntent.id) {
          console.log("No payment intent ID found, skipping order update");
          break;
        }
        
        // Update order status to completed
        const { error } = await supabase
          .from("orders")
          .update({ 
            status: "completed",
            updated_at: new Date().toISOString()
          })
          .eq("payment_intent_id", paymentIntent.id);
        
        if (error) {
          console.error("Error updating order after successful payment:", error);
          // Continue processing - don't fail the webhook
        } else {
          console.log(`Updated order status for payment intent ${paymentIntent.id}`);
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log(`Payment failed: ${paymentIntent.id}`);
        
        if (!paymentIntent.id) {
          console.log("No payment intent ID found, skipping order update");
          break;
        }
        
        // Update order status to failed
        const { error } = await supabase
          .from("orders")
          .update({ 
            status: "failed",
            updated_at: new Date().toISOString()
          })
          .eq("payment_intent_id", paymentIntent.id);
        
        if (error) {
          console.error("Error updating order:", error);
          // Continue processing - don't fail the webhook
        } else {
          console.log(`Order marked as failed for payment: ${paymentIntent.id}`);
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 success response to acknowledge receipt of the event
    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error handling webhook:", error);
    
    // Always return a 200 response to Stripe to prevent retries
    // We'll log the error but still acknowledge receipt
    return new Response(
      JSON.stringify({ 
        received: true,
        warning: "Error occurred but webhook was acknowledged",
        error: error.message
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
