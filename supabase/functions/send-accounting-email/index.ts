import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

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

// Validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const isValidPhone = (phone: string): boolean => {
  // Brazilian phone format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone) || phone.replace(/\D/g, '').length >= 10;
};

const isValidString = (str: string, minLen: number, maxLen: number): boolean => {
  return typeof str === 'string' && str.trim().length >= minLen && str.length <= maxLen;
};

const VALID_USER_TYPES = ['profissional', 'autonomo', 'empresa', 'pessoa_fisica'];

interface ValidationError {
  field: string;
  message: string;
}

interface AccountingEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  userType: string;
}

const validateAccountingRequest = (data: AccountingEmailRequest): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!isValidString(data.fullName, 2, 200)) {
    errors.push({ field: 'fullName', message: 'Nome deve ter entre 2 e 200 caracteres' });
  }

  if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Email inválido' });
  }

  if (!isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX' });
  }

  if (!VALID_USER_TYPES.includes(data.userType)) {
    errors.push({ field: 'userType', message: 'Tipo de usuário inválido' });
  }

  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: AccountingEmailRequest = await req.json();

    // Server-side validation
    const validationErrors = validateAccountingRequest(data);
    if (validationErrors.length > 0) {
      console.warn("Validation errors:", validationErrors);
      return new Response(
        JSON.stringify({ error: "Dados inválidos", details: validationErrors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { fullName, email, phone, userType } = data;

    console.log("Sending accounting email:", { fullName, email, phone, userType });

    // Rate limiting check - max 3 attempts per email in 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data: attempts, error: rateLimitError } = await supabase
      .from('rate_limit_attempts')
      .select('id')
      .eq('identifier', email)
      .eq('attempt_type', 'accounting')
      .gte('created_at', fifteenMinutesAgo);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }

    if (attempts && attempts.length >= 3) {
      console.warn("Rate limit exceeded for email:", email);
      return new Response(
        JSON.stringify({ error: "Muitas tentativas. Por favor, aguarde 15 minutos antes de tentar novamente." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Record this attempt
    await supabase
      .from('rate_limit_attempts')
      .insert({ identifier: email, attempt_type: 'accounting' });

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
            <p><strong>Nome Completo:</strong> ${escapeHtml(fullName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Tipo:</strong> ${escapeHtml(userTypeLabels[userType] || userType)}</p>
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