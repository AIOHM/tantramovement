import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationData {
  name: string;
  email: string;
  phone?: string;
  timezone: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ConsultationData = await req.json();
    
    if (!data.name || !data.email) {
      throw new Error("Missing required fields");
    }

    console.log("Sending consultation notification for:", data.email);

    const emailResponse = await resend.emails.send({
      from: "Tantra Movement <onboarding@resend.dev>",
      to: ["contact@tantramovement.com"],
      subject: `🗓️ New Discovery Call Request: ${data.name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #722F37; border-bottom: 2px solid #D4A574; padding-bottom: 10px;">
            New Discovery Call Request
          </h1>
          
          <div style="background: #FDF8F3; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #4A3728; margin-top: 0;">Applicant Details</h2>
            
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #722F37;">${data.email}</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #722F37;">${data.phone}</a></p>` : ''}
            <p><strong>Timezone:</strong> ${data.timezone}</p>
          </div>
          
          ${data.message ? `
          <div style="background: #fff; border-left: 4px solid #D4A574; padding: 15px; margin: 20px 0;">
            <h3 style="color: #4A3728; margin-top: 0;">Their Message</h3>
            <p style="white-space: pre-wrap; color: #555;">${data.message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <a href="https://tantramovement.com/admin/consultations" 
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

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to send notification" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
