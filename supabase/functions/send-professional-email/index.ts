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
  isValidCpfOrCnpj,
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

const isValidDate = (dateStr: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

const isValidString = (str: string, minLen: number, maxLen: number): boolean => {
  return typeof str === 'string' && str.trim().length >= minLen && str.length <= maxLen;
};

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const;

const sanitizeFilename = (name: string): string => {
  const sanitized = name
    .replace(/[\\/]/g, '_')
    .replace(/\.\.+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return sanitized.slice(0, 120) || 'arquivo';
};

const isValidFileAttachment = (file: any): boolean => {
  if (!file || typeof file !== 'object') return false;
  if (!file.filename || typeof file.filename !== 'string') return false;
  if (!file.content || typeof file.content !== 'string') return false;
  if (!file.type || typeof file.type !== 'string') return false;
  if (file.filename.length > 255) return false;
  if (!ALLOWED_FILE_TYPES.includes(file.type as (typeof ALLOWED_FILE_TYPES)[number])) return false;
  if (file.content.length > 7 * 1024 * 1024) return false;
  return true;
};

interface FileAttachment { filename: string; content: string; type: string; }

interface ProfessionalEmailRequest {
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  wasReferred?: boolean;
  referredBy?: string;
  serviceArea: string;
  experience: string;
  education?: string;
  availability: string;
  homeService: string;
  description: string;
  signature: string;
  idDocuments: FileAttachment[];
  addressProofs: FileAttachment[];
  certificates: FileAttachment[];
  _hp?: string;
  _t?: number;
  _cf?: string;
}

const validate = (data: ProfessionalEmailRequest): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];
  if (!isValidString(data.fullName, 2, 200)) errors.push({ field: 'fullName', message: 'Nome inválido' });
  if (!isValidCpfOrCnpj(data.cpf)) errors.push({ field: 'cpf', message: 'CPF/CNPJ inválido' });
  if (!isValidDate(data.birthDate)) errors.push({ field: 'birthDate', message: 'Data inválida' });
  if (!isValidPhone(data.phone)) errors.push({ field: 'phone', message: 'Telefone inválido' });
  if (!sanitizeEmailHeader(data.email)) errors.push({ field: 'email', message: 'Email inválido' });
  if (!isValidString(data.address, 5, 500)) errors.push({ field: 'address', message: 'Endereço inválido' });
  if (data.wasReferred && data.referredBy && data.referredBy.length > 100) {
    errors.push({ field: 'referredBy', message: 'Indicação muito longa' });
  }
  if (!isValidString(data.serviceArea, 2, 200)) errors.push({ field: 'serviceArea', message: 'Área inválida' });
  if (!isValidString(data.experience, 1, 100)) errors.push({ field: 'experience', message: 'Experiência obrigatória' });
  if (!isValidString(data.availability, 1, 200)) errors.push({ field: 'availability', message: 'Disponibilidade obrigatória' });
  if (!isValidString(data.homeService, 1, 10)) errors.push({ field: 'homeService', message: 'Atendimento obrigatório' });
  if (!isValidString(data.description, 20, 2000)) errors.push({ field: 'description', message: 'Descrição inválida' });
  if (!isValidString(data.signature, 2, 200)) errors.push({ field: 'signature', message: 'Assinatura obrigatória' });

  if (!Array.isArray(data.idDocuments) || data.idDocuments.length === 0) {
    errors.push({ field: 'idDocuments', message: 'Documento obrigatório' });
  } else if (data.idDocuments.length > 5) {
    errors.push({ field: 'idDocuments', message: 'Máximo de 5 documentos' });
  } else if (!data.idDocuments.every(isValidFileAttachment)) {
    errors.push({ field: 'idDocuments', message: 'Arquivo de identificação inválido' });
  }

  if (!Array.isArray(data.addressProofs) || data.addressProofs.length === 0) {
    errors.push({ field: 'addressProofs', message: 'Comprovante obrigatório' });
  } else if (data.addressProofs.length > 3) {
    errors.push({ field: 'addressProofs', message: 'Máximo de 3 comprovantes' });
  } else if (!data.addressProofs.every(isValidFileAttachment)) {
    errors.push({ field: 'addressProofs', message: 'Arquivo de comprovante inválido' });
  }

  if (data.certificates && Array.isArray(data.certificates)) {
    if (data.certificates.length > 10) {
      errors.push({ field: 'certificates', message: 'Máximo de 10 certificados' });
    } else if (!data.certificates.every(isValidFileAttachment)) {
      errors.push({ field: 'certificates', message: 'Certificado inválido' });
    }
  }
  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const data: ProfessionalEmailRequest = await req.json();

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

    const rl = await checkRateLimit(supabase, { email: safeEmail, ip, type: "professional" });
    if (!rl.ok) {
      return jsonResponse({ error: "Muitas tentativas. Aguarde 15 minutos." }, 429, corsHeaders);
    }

    console.log("professional submission ok", { masked: maskEmail(safeEmail) });

    const attachments = [
      ...data.idDocuments.map(f => ({ filename: f.filename, content: f.content })),
      ...data.addressProofs.map(f => ({ filename: f.filename, content: f.content })),
      ...(data.certificates || []).map(f => ({ filename: f.filename, content: f.content })),
    ];

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <noreply@valentinasresolve.com.br>",
      to: ["cadastroprofissionais@valentinasresolve.com.br"],
      reply_to: safeEmail,
      subject: `Novo Cadastro de Profissional - ${escapeHtml(data.fullName).slice(0, 100)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">Novo Cadastro de Profissional</h1>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dados Pessoais e de Contato</h2>
            <p><strong>Nome Completo:</strong> ${escapeHtml(data.fullName)}</p>
            <p><strong>CPF/CNPJ:</strong> ${escapeHtml(data.cpf)}</p>
            <p><strong>Data de Nascimento:</strong> ${escapeHtml(data.birthDate)}</p>
            <p><strong>Telefone/WhatsApp:</strong> ${escapeHtml(data.phone)}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(safeEmail)}</p>
            <p><strong>Endereço:</strong> ${escapeHtml(data.address)}</p>
            <p><strong>Veio por Indicação:</strong> ${data.wasReferred ? 'Sim' : 'Não'}</p>
            ${data.wasReferred && data.referredBy ? `<p><strong>Indicado por:</strong> ${escapeHtml(data.referredBy)}</p>` : ''}
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informações Profissionais</h2>
            <p><strong>Área de Atuação:</strong> ${escapeHtml(data.serviceArea)}</p>
            <p><strong>Tempo de Experiência:</strong> ${escapeHtml(data.experience)}</p>
            <p><strong>Formação/Certificações:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(data.education || 'Não informado')}</p>
            <p><strong>Disponibilidade:</strong> ${escapeHtml(data.availability)}</p>
            <p><strong>Atende em Domicílio:</strong> ${escapeHtml(data.homeService)}</p>
            <p><strong>Descrição dos Serviços:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(data.description)}</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Documentação</h2>
            <p><strong>Documento de Identificação:</strong> ${data.idDocuments.length} arquivo(s) anexado(s)</p>
            <p><strong>Comprovante de Residência:</strong> ${data.addressProofs.length} arquivo(s) anexado(s)</p>
            <p><strong>Certificados:</strong> ${(data.certificates || []).length} arquivo(s) anexado(s)</p>
            <p><strong>Assinatura:</strong> ${escapeHtml(data.signature)}</p>
          </div>
        </div>
      `,
      attachments,
    });

    // Save professional + documents to database via service role (bypasses RLS)
    try {
      const { data: professionalData, error: professionalError } = await supabase
        .from('professionals')
        .insert({
          full_name: data.fullName,
          cpf: data.cpf,
          birth_date: data.birthDate,
          phone: data.phone,
          email: safeEmail,
          address: data.address,
          was_referred: data.wasReferred || false,
          referred_by: data.referredBy || null,
          service_area: data.serviceArea,
          experience: data.experience,
          education: data.education,
          availability: data.availability,
          home_service: data.homeService === 'Sim',
          description: data.description,
          signature: data.signature,
          status: 'pending'
        })
        .select()
        .single();

      if (professionalError) throw professionalError;

      const documentPromises = [];
      const uploadAndRecord = async (doc: FileAttachment, type: 'id_document'|'proof_of_address'|'certificate', folder: string) => {
        const safeFilename = sanitizeFilename(doc.filename);
        const fileName = `${professionalData.id}/${folder}/${safeFilename}`;
        const fileData = Uint8Array.from(atob(doc.content.split(',').pop()!), c => c.charCodeAt(0));
        const { error: storageError } = await supabase.storage
          .from('professional-documents')
          .upload(fileName, fileData, { contentType: doc.type, upsert: false });
        if (storageError) {
          console.error("storage upload err:", storageError.message);
          return;
        }
        documentPromises.push(
          supabase.from('professional_documents').insert({
            professional_id: professionalData.id,
            document_type: type,
            file_path: fileName,
            file_name: safeFilename
          })
        );
      };

      for (const doc of data.idDocuments) await uploadAndRecord(doc, 'id_document', 'id');
      for (const doc of data.addressProofs) await uploadAndRecord(doc, 'proof_of_address', 'address');
      for (const doc of (data.certificates || [])) await uploadAndRecord(doc, 'certificate', 'certificates');

      await Promise.all(documentPromises);
    } catch (dbError: any) {
      console.error("DB error:", dbError?.message ?? "unknown");
    }

    return jsonResponse(emailResponse, 200, corsHeaders);
  } catch (error: any) {
    console.error("send-professional-email error:", error?.message ?? "unknown");
    return jsonResponse({ error: "Erro interno. Tente novamente mais tarde." }, 500, corsHeaders);
  }
};

serve(handler);
