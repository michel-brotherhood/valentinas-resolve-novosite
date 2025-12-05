import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

const isValidCPF = (cpf: string): boolean => {
  // Remove non-digits
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Must have 11 or 14 digits (CPF or CNPJ)
  if (cleanCPF.length !== 11 && cleanCPF.length !== 14) {
    return false;
  }
  
  // Check for repeated digits
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return false;
  }
  
  return true;
};

const isValidDate = (dateStr: string): boolean => {
  // Accept formats: YYYY-MM-DD or DD/MM/YYYY
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  const brRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!isoRegex.test(dateStr) && !brRegex.test(dateStr)) {
    return false;
  }
  
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

const isValidString = (str: string, minLen: number, maxLen: number): boolean => {
  return typeof str === 'string' && str.trim().length >= minLen && str.length <= maxLen;
};

const isValidFileAttachment = (file: any): boolean => {
  if (!file || typeof file !== 'object') return false;
  if (!file.filename || typeof file.filename !== 'string') return false;
  if (!file.content || typeof file.content !== 'string') return false;
  if (file.filename.length > 255) return false;
  // Max 5MB in base64 (roughly 6.8MB encoded)
  if (file.content.length > 7 * 1024 * 1024) return false;
  return true;
};

interface ValidationError {
  field: string;
  message: string;
}

interface FileAttachment {
  filename: string;
  content: string;
  type: string;
}

interface ProfessionalEmailRequest {
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
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
}

const validateProfessionalRequest = (data: ProfessionalEmailRequest): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!isValidString(data.fullName, 2, 200)) {
    errors.push({ field: 'fullName', message: 'Nome deve ter entre 2 e 200 caracteres' });
  }

  if (!isValidCPF(data.cpf)) {
    errors.push({ field: 'cpf', message: 'CPF/CNPJ inválido' });
  }

  if (!isValidDate(data.birthDate)) {
    errors.push({ field: 'birthDate', message: 'Data de nascimento inválida' });
  }

  if (!isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX' });
  }

  if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Email inválido' });
  }

  if (!isValidString(data.address, 5, 500)) {
    errors.push({ field: 'address', message: 'Endereço deve ter entre 5 e 500 caracteres' });
  }

  if (!isValidString(data.serviceArea, 2, 200)) {
    errors.push({ field: 'serviceArea', message: 'Área de atuação deve ter entre 2 e 200 caracteres' });
  }

  if (!isValidString(data.experience, 1, 100)) {
    errors.push({ field: 'experience', message: 'Experiência é obrigatória' });
  }

  if (!isValidString(data.availability, 1, 200)) {
    errors.push({ field: 'availability', message: 'Disponibilidade é obrigatória' });
  }

  if (!isValidString(data.homeService, 1, 10)) {
    errors.push({ field: 'homeService', message: 'Atendimento em domicílio é obrigatório' });
  }

  if (!isValidString(data.description, 20, 2000)) {
    errors.push({ field: 'description', message: 'Descrição deve ter entre 20 e 2000 caracteres' });
  }

  if (!isValidString(data.signature, 2, 200)) {
    errors.push({ field: 'signature', message: 'Assinatura é obrigatória' });
  }

  // Validate files
  if (!Array.isArray(data.idDocuments) || data.idDocuments.length === 0) {
    errors.push({ field: 'idDocuments', message: 'Documento de identificação é obrigatório' });
  } else if (data.idDocuments.length > 5) {
    errors.push({ field: 'idDocuments', message: 'Máximo de 5 documentos de identificação' });
  } else {
    for (const doc of data.idDocuments) {
      if (!isValidFileAttachment(doc)) {
        errors.push({ field: 'idDocuments', message: 'Arquivo de identificação inválido' });
        break;
      }
    }
  }

  if (!Array.isArray(data.addressProofs) || data.addressProofs.length === 0) {
    errors.push({ field: 'addressProofs', message: 'Comprovante de endereço é obrigatório' });
  } else if (data.addressProofs.length > 3) {
    errors.push({ field: 'addressProofs', message: 'Máximo de 3 comprovantes de endereço' });
  } else {
    for (const doc of data.addressProofs) {
      if (!isValidFileAttachment(doc)) {
        errors.push({ field: 'addressProofs', message: 'Arquivo de comprovante inválido' });
        break;
      }
    }
  }

  if (data.certificates && Array.isArray(data.certificates)) {
    if (data.certificates.length > 10) {
      errors.push({ field: 'certificates', message: 'Máximo de 10 certificados' });
    } else {
      for (const doc of data.certificates) {
        if (!isValidFileAttachment(doc)) {
          errors.push({ field: 'certificates', message: 'Arquivo de certificado inválido' });
          break;
        }
      }
    }
  }

  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ProfessionalEmailRequest = await req.json();

    // Server-side validation
    const validationErrors = validateProfessionalRequest(data);
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

    console.log("Sending professional registration email:", data.fullName);

    // Rate limiting check - max 3 attempts per email in 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data: attempts, error: rateLimitError } = await supabase
      .from('rate_limit_attempts')
      .select('id')
      .eq('identifier', data.email)
      .eq('attempt_type', 'professional')
      .gte('created_at', fifteenMinutesAgo);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }

    if (attempts && attempts.length >= 3) {
      console.warn("Rate limit exceeded for email:", data.email);
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
      .insert({ identifier: data.email, attempt_type: 'professional' });

    const attachments = [
      ...data.idDocuments.map(file => ({
        filename: file.filename,
        content: file.content,
      })),
      ...data.addressProofs.map(file => ({
        filename: file.filename,
        content: file.content,
      })),
      ...(data.certificates || []).map(file => ({
        filename: file.filename,
        content: file.content,
      })),
    ];

    const emailResponse = await resend.emails.send({
      from: "Valentina's Resolve <noreply@valentinasresolve.com.br>",
      to: ["cadastroprofissionais@valentinasresolve.com.br"],
      reply_to: data.email,
      subject: `Novo Cadastro de Profissional - ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF0080; border-bottom: 2px solid #FF0080; padding-bottom: 10px;">
            Novo Cadastro de Profissional
          </h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dados Pessoais e de Contato</h2>
            <p><strong>Nome Completo:</strong> ${escapeHtml(data.fullName)}</p>
            <p><strong>CPF/CNPJ:</strong> ${escapeHtml(data.cpf)}</p>
            <p><strong>Data de Nascimento:</strong> ${escapeHtml(data.birthDate)}</p>
            <p><strong>Telefone/WhatsApp:</strong> ${escapeHtml(data.phone)}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Endereço:</strong> ${escapeHtml(data.address)}</p>
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
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Cadastro enviado através do formulário de registro de profissionais do site Valentina's Resolve
          </p>
        </div>
      `,
      attachments,
    });

    console.log("Email sent successfully:", emailResponse);

    // Save professional data to database
    try {
      const { data: professionalData, error: professionalError } = await supabase
        .from('professionals')
        .insert({
          full_name: data.fullName,
          cpf: data.cpf,
          birth_date: data.birthDate,
          phone: data.phone,
          email: data.email,
          address: data.address,
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

      if (professionalError) {
        console.error("Error saving professional:", professionalError);
        throw professionalError;
      }

      console.log("Professional saved successfully:", professionalData.id);

      // Save documents to storage and database
      const documentPromises = [];

      for (const doc of data.idDocuments) {
        const fileName = `${professionalData.id}/id/${doc.filename}`;
        const fileData = Uint8Array.from(atob(doc.content.split(',')[1]), c => c.charCodeAt(0));
        
        const { error: storageError } = await supabase.storage
          .from('professional-documents')
          .upload(fileName, fileData, {
            contentType: doc.type,
            upsert: false
          });

        if (storageError) {
          console.error("Error uploading id document:", storageError);
          continue;
        }

        documentPromises.push(
          supabase.from('professional_documents').insert({
            professional_id: professionalData.id,
            document_type: 'id_document',
            file_path: fileName,
            file_name: doc.filename
          })
        );
      }

      for (const doc of data.addressProofs) {
        const fileName = `${professionalData.id}/address/${doc.filename}`;
        const fileData = Uint8Array.from(atob(doc.content.split(',')[1]), c => c.charCodeAt(0));
        
        const { error: storageError } = await supabase.storage
          .from('professional-documents')
          .upload(fileName, fileData, {
            contentType: doc.type,
            upsert: false
          });

        if (storageError) {
          console.error("Error uploading address proof:", storageError);
          continue;
        }

        documentPromises.push(
          supabase.from('professional_documents').insert({
            professional_id: professionalData.id,
            document_type: 'proof_of_address',
            file_path: fileName,
            file_name: doc.filename
          })
        );
      }

      for (const doc of (data.certificates || [])) {
        const fileName = `${professionalData.id}/certificates/${doc.filename}`;
        const fileData = Uint8Array.from(atob(doc.content.split(',')[1]), c => c.charCodeAt(0));
        
        const { error: storageError } = await supabase.storage
          .from('professional-documents')
          .upload(fileName, fileData, {
            contentType: doc.type,
            upsert: false
          });

        if (storageError) {
          console.error("Error uploading certificate:", storageError);
          continue;
        }

        documentPromises.push(
          supabase.from('professional_documents').insert({
            professional_id: professionalData.id,
            document_type: 'certificate',
            file_path: fileName,
            file_name: doc.filename
          })
        );
      }

      await Promise.all(documentPromises);
      console.log("Documents saved successfully");

    } catch (dbError: any) {
      console.error("Error saving to database:", dbError);
      // Continue even if database save fails - email was sent successfully
    }

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