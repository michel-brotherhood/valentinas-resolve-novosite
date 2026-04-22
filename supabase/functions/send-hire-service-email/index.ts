import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";
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
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
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
  _hp?: string;
  _t?: number;
  _cf?: string;
}

const validate = (data: HireServiceEmailRequest): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];
  if (!isValidString(data.name, 2, 100)) errors.push({ field: 'name', message: 'Nome inválido' });
  if (!sanitizeEmailHeader(data.email)) errors.push({ field: 'email', message: 'Email inválido' });
  if (!isValidPhone(data.phone)) errors.push({ field: 'phone', message: 'Telefone inválido' });
  if (!isValidString(data.cityNeighborhood, 2, 200)) errors.push({ field: 'cityNeighborhood', message: 'Cidade/Bairro inválido' });
  if (!isValidString(data.serviceType, 2, 200)) errors.push({ field: 'serviceType', message: 'Serviço inválido' });
  if (!isValidString(data.description, 10, 2000)) errors.push({ field: 'description', message: 'Descrição inválida' });
  if (!isValidString(data.location, 2, 200)) errors.push({ field: 'location', message: 'Local inválido' });
  if (!isValidString(data.urgency, 1, 100)) errors.push({ field: 'urgency', message: 'Urgência obrigatória' });
  if (!isValidString(data.contactPreference, 1, 200)) errors.push({ field: 'contactPreference', message: 'Preferência inválida' });
  if (!isValidString(data.budgetType, 1, 100)) errors.push({ field: 'budgetType', message: 'Orçamento inválido' });
  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const data: HireServiceEmailRequest = await req.json();

    const bot = validateAntiBot({ honeypot: data._hp, renderedAt: data._t });
    if (!bot.ok) {
      console.warn("anti-bot reject", { reason: bot.reason });
      return jsonResponse({ error: "Requisição inválida." }, 400, corsHeaders);
    }

    const ip = getClientIp(req);

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

    const rl = await checkRateLimit(supabase, { email: safeEmail, ip, type: "hire_service" });
    if (!rl.ok) {
      return jsonResponse({ error: "Muitas tentativas. Aguarde 15 minutos." }, 429, corsHeaders);
    }

    console.log("hire-service submission ok", { masked: maskEmail(safeEmail), service: data.serviceType.slice(0, 40) });

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <noreply@valentinasresolve.com.br>",
      to: ["atendimentoaocliente@valentinasresolve.com.br"],
      reply_to: safeEmail,
      subject: `Nova Solicitação de Orçamento - ${escapeHtml(data.serviceType).slice(0, 100)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">Nova Solicitação de Orçamento</h1>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dados do Cliente</h2>
            <p><strong>Nome Completo:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Telefone/WhatsApp:</strong> ${escapeHtml(data.phone)}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(safeEmail)}</p>
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
        </div>
      `,
    });

    // Save service request to database
    try {
      let urgencyType: 'immediate' | 'days' | 'scheduled' = 'immediate';
      if (data.urgency.includes('dias')) urgencyType = 'days';
      else if (data.urgency.includes('agendado') || data.scheduledDate) urgencyType = 'scheduled';

      const contactPreferences = data.contactPreference.split(',').map(p => p.trim()).filter(Boolean);
      const budgetType = data.budgetType.toLowerCase().includes('detalhado') ? 'detailed' : 'estimate';

      const { error: serviceRequestError } = await supabase
        .from('service_requests')
        .insert({
          client_name: data.name,
          client_phone: data.phone,
          client_email: safeEmail,
          city_neighborhood: data.cityNeighborhood,
          service_type: data.serviceType,
          description: data.description,
          location: data.location,
          urgency: urgencyType,
          scheduled_date: data.scheduledDate || null,
          contact_preference: contactPreferences,
          budget_type: budgetType,
          status: 'pending'
        });

      if (serviceRequestError) console.error("DB insert error:", serviceRequestError.message);
    } catch (dbError: any) {
      console.error("DB error:", dbError?.message ?? "unknown");
    }

    return jsonResponse(emailResponse, 200, corsHeaders);
  } catch (error: any) {
    console.error("send-hire-service-email error:", error?.message ?? "unknown");
    return jsonResponse({ error: "Erro interno. Tente novamente mais tarde." }, 500, corsHeaders);
  }
};

serve(handler);
