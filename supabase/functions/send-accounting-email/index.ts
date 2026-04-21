import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import {
  buildCorsHeaders,
  getClientIp,
  validateAntiBot,
  checkRateLimit,
  sanitizeEmailHeader,
  maskEmail,
  jsonResponse,
} from "../_shared/security.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c] || c));
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone) || phone.replace(/\D/g, '').length >= 10;
};

const isValidString = (str: string, minLen: number, maxLen: number): boolean => {
  return typeof str === 'string' && str.trim().length >= minLen && str.length <= maxLen;
};

const VALID_USER_TYPES = ['profissional', 'autonomo', 'empresa', 'pessoa_fisica'];

interface AccountingEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  userType: string;
  _hp?: string;
  _t?: number;
}

const validate = (data: AccountingEmailRequest): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];
  if (!isValidString(data.fullName, 2, 200)) errors.push({ field: 'fullName', message: 'Nome inválido' });
  if (!sanitizeEmailHeader(data.email)) errors.push({ field: 'email', message: 'Email inválido' });
  if (!isValidPhone(data.phone)) errors.push({ field: 'phone', message: 'Telefone inválido' });
  if (!VALID_USER_TYPES.includes(data.userType)) errors.push({ field: 'userType', message: 'Tipo inválido' });
  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const data: AccountingEmailRequest = await req.json();

    const bot = validateAntiBot({ honeypot: data._hp, renderedAt: data._t });
    if (!bot.ok) {
      console.warn("anti-bot reject", { reason: bot.reason });
      return jsonResponse({ error: "Requisição inválida." }, 400, corsHeaders);
    }

    const errors = validate(data);
    if (errors.length > 0) {
      return jsonResponse({ error: "Dados inválidos", details: errors }, 400, corsHeaders);
    }

    const safeEmail = sanitizeEmailHeader(data.email)!;
    const ip = getClientIp(req);

    const rl = await checkRateLimit(supabase, { email: safeEmail, ip, type: "accounting" });
    if (!rl.ok) {
      return jsonResponse({ error: "Muitas tentativas. Aguarde 15 minutos." }, 429, corsHeaders);
    }

    console.log("accounting submission ok", { masked: maskEmail(safeEmail) });

    const userTypeLabels: Record<string, string> = {
      "profissional": "Profissional da plataforma",
      "autonomo": "Autônomo",
      "empresa": "Empresa",
      "pessoa_fisica": "Pessoa física"
    };

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <noreply@valentinasresolve.com.br>",
      to: ["contabilidadeintegrada@valentinasresolve.com.br"],
      reply_to: safeEmail,
      subject: `Nova Solicitação - Contabilidade Integrada`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">Solicitação de Proposta - Contabilidade Integrada</h1>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informações do Solicitante</h2>
            <p><strong>Nome Completo:</strong> ${escapeHtml(data.fullName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
            <p><strong>Telefone:</strong> ${escapeHtml(data.phone)}</p>
            <p><strong>Tipo:</strong> ${escapeHtml(userTypeLabels[data.userType] || data.userType)}</p>
          </div>
        </div>
      `,
    });

    return jsonResponse(emailResponse, 200, corsHeaders);
  } catch (error: any) {
    console.error("send-accounting-email error:", error?.message ?? "unknown");
    return jsonResponse({ error: "Erro interno. Tente novamente mais tarde." }, 500, corsHeaders);
  }
};

serve(handler);
