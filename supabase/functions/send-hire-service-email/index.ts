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
  cityNeighborhood: string;
  serviceType: string;
  description: string;
  location: string;
  urgency: string;
  scheduledDate?: string;
  contactPreference: string;
  budgetType: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: HireServiceEmailRequest = await req.json();

    console.log("Sending hire service email:", data.serviceType);

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <onboarding@resend.dev>",
      to: ["comercial@valentinasresolve.com.br"],
      reply_to: data.email,
      subject: `Nova Solicitação de Orçamento - ${data.serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">
            Nova Solicitação de Orçamento
          </h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dados do Cliente</h2>
            <p><strong>Nome Completo:</strong> ${data.name}</p>
            <p><strong>Telefone/WhatsApp:</strong> ${data.phone}</p>
            <p><strong>E-mail:</strong> ${data.email}</p>
            <p><strong>Cidade/Bairro:</strong> ${data.cityNeighborhood}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Detalhes do Serviço</h2>
            <p><strong>Tipo de serviço desejado:</strong> ${data.serviceType}</p>
            <p><strong>Descrição:</strong></p>
            <p style="white-space: pre-wrap;">${data.description}</p>
            <p><strong>Local de execução:</strong> ${data.location}</p>
            <p><strong>Urgência:</strong> ${data.urgency}${data.scheduledDate ? ` - ${data.scheduledDate}` : ''}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Preferências do Cliente</h2>
            <p><strong>Deseja receber contato por:</strong> ${data.contactPreference}</p>
            <p><strong>Orçamento desejado:</strong> ${data.budgetType}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Solicitação enviada através do formulário de orçamento do site Valentina's Resolve
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
