import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import {
  buildCorsHeaders,
  getClientIp,
  validateAntiBot,
  validateTurnstile,
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

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  _hp?: string;
  _t?: number;
  _cf?: string;
}

const validate = (data: ContactEmailRequest): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];
  if (!isValidString(data.name, 2, 100)) errors.push({ field: 'name', message: 'Nome deve ter entre 2 e 100 caracteres' });
  if (!sanitizeEmailHeader(data.email)) errors.push({ field: 'email', message: 'Email inválido' });
  if (!isValidPhone(data.phone)) errors.push({ field: 'phone', message: 'Telefone inválido' });
  if (!isValidString(data.service, 1, 200)) errors.push({ field: 'service', message: 'Assunto inválido' });
  if (!isValidString(data.message, 10, 2000)) errors.push({ field: 'message', message: 'Mensagem deve ter entre 10 e 2000 caracteres' });
  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const data: ContactEmailRequest = await req.json();

    // Anti-bot
    const bot = validateAntiBot({ honeypot: data._hp, renderedAt: data._t });
    if (!bot.ok) {
      console.warn("anti-bot reject", { reason: bot.reason });
      return jsonResponse({ error: "Requisição inválida." }, 400, corsHeaders);
    }

    const ip = getClientIp(req);

    // Cloudflare Turnstile (CAPTCHA)
    const cf = await validateTurnstile(data._cf, ip);
    if (!cf.ok) {
      console.warn("captcha reject", { reason: cf.reason });
      return jsonResponse({ error: "Verificação anti-spam falhou. Atualize a página e tente novamente." }, 403, corsHeaders);
    }

    const errors = validate(data);
    if (errors.length > 0) {
      return jsonResponse({ error: "Dados inválidos", details: errors }, 400, corsHeaders);
    }

    const safeEmail = sanitizeEmailHeader(data.email)!;

    const rl = await checkRateLimit(supabase, { email: safeEmail, ip, type: "contact" });
    if (!rl.ok) {
      console.warn("rate limit", { reason: rl.reason, masked: maskEmail(safeEmail) });
      return jsonResponse({ error: "Muitas tentativas. Aguarde 15 minutos." }, 429, corsHeaders);
    }

    console.log("contact submission ok", { masked: maskEmail(safeEmail) });

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <noreply@valentinasresolve.com.br>",
      to: ["atendimentoaocliente@valentinasresolve.com.br"],
      reply_to: safeEmail,
      subject: `Nova Solicitação de Orçamento - ${escapeHtml(data.service).slice(0, 100)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">Nova Solicitação de Orçamento</h1>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informações do Cliente</h2>
            <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
            <p><strong>Telefone:</strong> ${escapeHtml(data.phone)}</p>
            <p><strong>Serviço:</strong> ${escapeHtml(data.service)}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Mensagem:</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
        </div>
      `,
    });

    return jsonResponse(emailResponse, 200, corsHeaders);
  } catch (error: any) {
    console.error("send-contact-email error:", error?.message ?? "unknown");
    return jsonResponse({ error: "Erro interno. Tente novamente mais tarde." }, 500, corsHeaders);
  }
};

serve(handler);
