import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface HireServiceEmailRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  category: string;
  date: string;
  time: string;
  address: string;
  details: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: HireServiceEmailRequest = await req.json();

    console.log("Sending hire service email:", data.service);

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <onboarding@resend.dev>",
      to: ["comercial@valentinasresolve.com.br"],
      reply_to: data.email,
      subject: `Nova Solicitação de Serviço - ${data.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">
            Nova Solicitação de Serviço
          </h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informações do Cliente</h2>
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefone:</strong> ${data.phone}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Detalhes do Serviço</h2>
            <p><strong>Serviço Solicitado:</strong> ${data.service}</p>
            <p><strong>Categoria:</strong> ${data.category}</p>
            <p><strong>Data Preferencial:</strong> ${data.date}</p>
            <p><strong>Horário Preferencial:</strong> ${data.time}</p>
            <p><strong>Endereço:</strong> ${data.address}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Detalhes Adicionais:</h3>
            <p style="white-space: pre-wrap;">${data.details}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Solicitação enviada através do formulário de contratação de serviços do site Valentina's Resolve
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-hire-service-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
