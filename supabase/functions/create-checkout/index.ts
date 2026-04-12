
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequestParams {
  workshopId: number;
  customerName: string;
  customerEmail: string;
  supabaseUrl: string;
  supabaseKey: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authorization
    const authHeader = req.headers.get('authorization');
    const apiKey = req.headers.get('apikey');
    
    if (!authHeader && !apiKey) {
      console.error("Missing authorization header and apikey");
      return new Response(
        JSON.stringify({ error: "Missing authorization header and apikey" }),
        { 
          status: 401, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    console.log("Auth header present:", !!authHeader);
    console.log("API key present:", !!apiKey);

    // Parse request body
    const requestData = await req.json();
    const { 
      workshopId, 
      customerName, 
      customerEmail,
      supabaseUrl,
      supabaseKey
    }: CheckoutRequestParams = requestData;

    // Validate request params
    if (!workshopId || !customerName || !customerEmail) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields. Please provide workshopId, customerName, and customerEmail." 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    if (!supabaseUrl || !supabaseKey) {
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

    // Fetch workshop details from Supabase
    const { data: workshop, error: workshopError } = await supabase
      .from("workshops")
      .select("*")
      .eq("id", workshopId)
      .single();

    if (workshopError || !workshop) {
      console.error("Workshop fetch error:", workshopError);
      return new Response(
        JSON.stringify({ error: "Workshop not found", details: workshopError }),
        { 
          status: 404, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    console.log("Workshop found:", workshop);

    // Parse the price string to get the amount in cents
    let amount = 0;
    if (workshop.price_in_cents) {
      amount = workshop.price_in_cents;
    } else {
      // Parse the price string (e.g. "$99.99" or "99.99")
      const priceString = workshop.price.replace(/^\$/, '');
      const priceValue = parseFloat(priceString);
      if (isNaN(priceValue)) {
        return new Response(
          JSON.stringify({ error: "Invalid price format" }),
          { 
            status: 400, 
            headers: { "Content-Type": "application/json", ...corsHeaders } 
          }
        );
      }
      amount = Math.round(priceValue * 100); // Convert to cents
    }

    if (amount <= 0) {
      // Use a small amount for testing
      amount = 100; // $1.00 for testing
    }

    console.log("Price amount in cents:", amount);

    // Create an order record in the database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        workshop_id: workshopId,
        customer_name: customerName,
        customer_email: customerEmail,
        amount: amount,
        status: "pending",
        currency: "usd"
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return new Response(
        JSON.stringify({ error: "Failed to create order", details: orderError }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    console.log("Order created:", order);

    const origin = new URL(req.url).origin;
    const baseUrl = "https://eobsgylnshhmahtfxchc.supabase.co"; // Use actual host from request
    
    // Create Stripe Checkout Session with 3D Secure explicitly required
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      payment_method_options: {
        card: {
          // This explicitly requires 3D Secure for testing
          request_three_d_secure: 'any'
        }
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: workshop.title,
              description: workshop.description || "Workshop registration"
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/workshops?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/workshops?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
      customer_email: customerEmail,
      metadata: {
        order_id: order.id,
        workshop_id: workshopId
      }
    });

    console.log("Stripe session created:", session.id);
    console.log("Checkout URL:", session.url);

    // Update order with payment_intent_id
    if (session.payment_intent) {
      await supabase
        .from("orders")
        .update({ payment_intent_id: session.payment_intent.toString() })
        .eq("id", order.id);
      
      console.log("Order updated with payment intent ID:", session.payment_intent.toString());
    }

    if (!session.url) {
      console.error("No checkout URL returned from Stripe");
      return new Response(
        JSON.stringify({ error: "Failed to create checkout URL" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
});
