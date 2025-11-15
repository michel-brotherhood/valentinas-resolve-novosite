import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProfessionalEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  city: string;
  experience: string;
  education: string;
  certifications?: string;
  categories: string[];
  description: string;
  hourlyRate: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ProfessionalEmailRequest = await req.json();

    console.log("Sending professional registration email:", data.fullName);

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <onboarding@resend.dev>",
      to: ["cadastroprofissionais@valentinasresolve.com.br"],
      reply_to: data.email,
      subject: `Novo Cadastro de Profissional - ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">
            Novo Cadastro de Profissional
          </h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informações Pessoais</h2>
            <p><strong>Nome Completo:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefone:</strong> ${data.phone}</p>
            <p><strong>CPF:</strong> ${data.cpf}</p>
            <p><strong>Endereço:</strong> ${data.address}</p>
            <p><strong>Cidade:</strong> ${data.city}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Qualificações</h2>
            <p><strong>Experiência:</strong></p>
            <p style="white-space: pre-wrap;">${data.experience}</p>
            <p><strong>Formação:</strong></p>
            <p style="white-space: pre-wrap;">${data.education}</p>
            ${data.certifications ? `<p><strong>Certificações:</strong></p><p style="white-space: pre-wrap;">${data.certifications}</p>` : ''}
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Serviços Oferecidos</h2>
            <p><strong>Categorias:</strong> ${data.categories.join(', ')}</p>
            <p><strong>Descrição dos Serviços:</strong></p>
            <p style="white-space: pre-wrap;">${data.description}</p>
            <p><strong>Valor por Hora:</strong> ${data.hourlyRate}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Cadastro enviado através do formulário de registro de profissionais do site Valentina's Resolve
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
    console.error("Error in send-professional-email function:", error);
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
