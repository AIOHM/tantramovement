
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request data
    const contactData: ContactFormData = await req.json();
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      throw new Error("Missing required fields");
    }

    console.log("Sending contact notification email for:", contactData.email);

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Tantra Movement <onboarding@resend.dev>", // Update with your verified domain when available
      to: ["contact@tantramovement.com"], // The recipient email
      subject: `New Contact Form: ${contactData.subject || 'Contact Inquiry'}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Subject:</strong> ${contactData.subject || 'No subject provided'}</p>
        <h2>Message:</h2>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This message was sent from the contact form on your website.</small></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error sending email notification:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
