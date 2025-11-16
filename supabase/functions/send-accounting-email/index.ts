import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AccountingEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  userType: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, userType }: AccountingEmailRequest = await req.json();

    console.log("Sending accounting email:", { fullName, email, phone, userType });

    const userTypeLabels: Record<string, string> = {
      "profissional": "Profissional da plataforma",
      "autonomo": "Autônomo",
      "empresa": "Empresa",
      "pessoa_fisica": "Pessoa física"
    };

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <noreply@valentinasresolve.com.br>",
      to: ["contabilidadeintegrada@valentinasresolve.com.br"],
      reply_to: email,
      subject: `Nova Solicitação - Contabilidade Integrada`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">
            Solicitação de Proposta - Contabilidade Integrada
          </h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informações do Solicitante</h2>
            <p><strong>Nome Completo:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Tipo:</strong> ${userTypeLabels[userType] || userType}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Solicitação enviada através do formulário de Contabilidade Integrada do site Valentina's Resolve
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
    console.error("Error in send-accounting-email function:", error);
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
