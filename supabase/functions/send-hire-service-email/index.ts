import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent HTML injection
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (char) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escapeMap[char] || char;
  });
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
      from: "Valentina's Resolve <noreply@valentinasresolve.com.br>",
      to: ["atendimentoaocliente@valentinasresolve.com.br"],
      reply_to: data.email,
      subject: `Nova Solicitação de Orçamento - ${data.serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">
            Nova Solicitação de Orçamento
          </h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dados do Cliente</h2>
            <p><strong>Nome Completo:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Telefone/WhatsApp:</strong> ${escapeHtml(data.phone)}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Cidade/Bairro:</strong> ${escapeHtml(data.cityNeighborhood)}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Detalhes do Serviço</h2>
            <p><strong>Tipo de serviço desejado:</strong> ${escapeHtml(data.serviceType)}</p>
            <p><strong>Descrição:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(data.description)}</p>
            <p><strong>Local de execução:</strong> ${escapeHtml(data.location)}</p>
            <p><strong>Urgência:</strong> ${escapeHtml(data.urgency)}${data.scheduledDate ? ` - ${escapeHtml(data.scheduledDate)}` : ''}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Preferências do Cliente</h2>
            <p><strong>Deseja receber contato por:</strong> ${escapeHtml(data.contactPreference)}</p>
            <p><strong>Orçamento desejado:</strong> ${escapeHtml(data.budgetType)}</p>
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
