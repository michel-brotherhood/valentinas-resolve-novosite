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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ProfessionalEmailRequest = await req.json();

    console.log("Sending professional registration email:", data.fullName);

    const attachments = [
      ...data.idDocuments.map(file => ({
        filename: file.filename,
        content: file.content,
      })),
      ...data.addressProofs.map(file => ({
        filename: file.filename,
        content: file.content,
      })),
      ...data.certificates.map(file => ({
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
            <p><strong>Certificados:</strong> ${data.certificates.length} arquivo(s) anexado(s)</p>
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

      for (const doc of data.certificates) {
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
