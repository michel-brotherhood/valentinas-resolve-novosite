import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Upload, CheckCircle2, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { maskPhone, maskCPF } from "@/lib/masks";
import { ServiceAreaAutocomplete } from "@/components/ServiceAreaAutocomplete";
import { getAllServices } from "@/lib/servicesData";

const personalInfoSchema = z.object({
  fullName: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  cpf: z.string().trim().min(11, "CPF/CNPJ inválido").max(18),
  birthDate: z.string().min(1, "Data de nascimento obrigatória"),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  email: z.string().trim().email("Email inválido").max(255),
  address: z.string().trim().min(5, "Endereço obrigatório").max(200),
  wasReferred: z.enum(["yes", "no"], { required_error: "Selecione uma opção" }),
  referredBy: z.string().trim().max(100, "Máximo 100 caracteres").optional(),
});

// Get all valid service names for validation
const validServiceNames = getAllServices().map(s => s.name);

const qualificationsSchema = z.object({
  serviceArea: z.string().trim().min(1, "Selecione um serviço da lista").refine(
    (val) => validServiceNames.includes(val),
    { message: "Selecione um serviço válido da lista" }
  ),
  experience: z.string().trim().min(1, "Tempo de experiência obrigatório").max(50),
  education: z.string().trim().max(500).optional(),
  availability: z.string().trim().min(3, "Disponibilidade obrigatória").max(200),
  homeService: z.enum(["yes", "no"], { required_error: "Selecione uma opção" }),
  description: z.string().trim().min(50, "Descrição deve ter pelo menos 50 caracteres").max(1000),
});

const documentsSchema = z.object({
  idDocument: z.boolean().refine(val => val === true, "Foto do documento obrigatória"),
  proofOfAddress: z.boolean().refine(val => val === true, "Comprovante de residência obrigatório"),
  certificates: z.boolean().optional(),
  truthDeclaration: z.boolean().refine(val => val === true, "Você deve aceitar a declaração"),
  privacyConsent: z.boolean().refine(val => val === true, "Você deve aceitar a política de privacidade"),
  signature: z.string().trim().min(3, "Assinatura obrigatória").max(100),
});

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type Qualifications = z.infer<typeof qualificationsSchema>;
type Documents = z.infer<typeof documentsSchema>;

const ProfessionalRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [idFiles, setIdFiles] = useState<File[]>([]);
  const [addressFiles, setAddressFiles] = useState<File[]>([]);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: `${file.name} - Apenas JPG, PNG e PDF são permitidos.`,
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Arquivo muito grande",
        description: `${file.name} - O tamanho máximo é 5MB.`,
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
  });

  const qualificationsForm = useForm<Qualifications>({
    resolver: zodResolver(qualificationsSchema),
    mode: "onChange",
    defaultValues: { homeService: "yes" },
  });

  const documentsForm = useForm<Documents>({
    resolver: zodResolver(documentsSchema),
    mode: "onChange",
    defaultValues: {
      idDocument: false,
      proofOfAddress: false,
      certificates: false,
      truthDeclaration: false,
      privacyConsent: false,
      signature: "",
    },
  });

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(validateFile);
      
      if (validFiles.length > 0) {
        setIdFiles(prev => [...prev, ...validFiles]);
        documentsForm.setValue("idDocument", true);
        toast({
          title: "Arquivo(s) adicionado(s)",
          description: `${validFiles.length} arquivo(s) de identificação adicionado(s) com sucesso.`,
        });
      }
    }
    e.target.value = '';
  };

  const handleAddressUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(validateFile);
      
      if (validFiles.length > 0) {
        setAddressFiles(prev => [...prev, ...validFiles]);
        documentsForm.setValue("proofOfAddress", true);
        toast({
          title: "Arquivo(s) adicionado(s)",
          description: `${validFiles.length} comprovante(s) adicionado(s) com sucesso.`,
        });
      }
    }
    e.target.value = '';
  };

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(validateFile);
      
      if (validFiles.length > 0) {
        setCertificateFiles(prev => [...prev, ...validFiles]);
        toast({
          title: "Arquivo(s) adicionado(s)",
          description: `${validFiles.length} certificado(s) adicionado(s) com sucesso.`,
        });
      }
    }
    e.target.value = '';
  };

  const removeIdFile = (index: number) => {
    setIdFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (newFiles.length === 0) {
        documentsForm.setValue("idDocument", false);
      }
      return newFiles;
    });
    toast({
      title: "Arquivo removido",
      description: "O arquivo foi removido com sucesso.",
    });
  };

  const removeAddressFile = (index: number) => {
    setAddressFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (newFiles.length === 0) {
        documentsForm.setValue("proofOfAddress", false);
      }
      return newFiles;
    });
    toast({
      title: "Arquivo removido",
      description: "O arquivo foi removido com sucesso.",
    });
  };

  const removeCertificateFile = (index: number) => {
    setCertificateFiles(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Arquivo removido",
      description: "O arquivo foi removido com sucesso.",
    });
  };

  const onSubmitStep1 = (data: PersonalInfo) => setCurrentStep(2);
  const onSubmitStep2 = (data: Qualifications) => setCurrentStep(3);

  const convertFilesToBase64 = async (files: File[]): Promise<Array<{filename: string, content: string, type: string}>> => {
    const promises = files.map(file => {
      return new Promise<{filename: string, content: string, type: string}>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve({
            filename: file.name,
            content: base64,
            type: file.type
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

  const onSubmitStep3 = async (data: Documents) => {
    setIsSubmitting(true);
    
    try {
      const personalData = personalForm.getValues();
      const qualificationsData = qualificationsForm.getValues();

      toast({
        title: "Processando arquivos...",
        description: "Convertendo documentos, por favor aguarde.",
      });

      // Convert files to base64
      const idDocuments = await convertFilesToBase64(idFiles);
      const addressProofs = await convertFilesToBase64(addressFiles);
      const certificates = await convertFilesToBase64(certificateFiles);

      toast({
        title: "Enviando cadastro...",
        description: "Seus dados estão sendo enviados.",
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-professional-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          fullName: personalData.fullName,
          cpf: personalData.cpf,
          birthDate: personalData.birthDate,
          phone: personalData.phone,
          email: personalData.email,
          address: personalData.address,
          wasReferred: personalData.wasReferred === "yes",
          referredBy: personalData.wasReferred === "yes" ? personalData.referredBy : undefined,
          serviceArea: qualificationsData.serviceArea,
          experience: qualificationsData.experience,
          education: qualificationsData.education || "Não informado",
          availability: qualificationsData.availability,
          homeService: qualificationsData.homeService === "yes" ? "Sim" : "Não",
          description: qualificationsData.description,
          signature: data.signature,
          idDocuments,
          addressProofs,
          certificates,
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar cadastro');

      toast({
        title: "Cadastro enviado com sucesso!",
        description: "Redirecionando...",
      });

      personalForm.reset();
      qualificationsForm.reset();
      documentsForm.reset();
      setIdFiles([]);
      setAddressFiles([]);
      setCertificateFiles([]);
      setCurrentStep(1);
      
      setTimeout(() => {
        navigate("/confirmacao?type=professional");
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro ao enviar cadastro",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Cadastro de Profissional</h1>
            <p className="text-lg text-muted-foreground">Complete seu cadastro em 3 etapas</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${currentStep >= 1 ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>Dados Pessoais</span>
              <span className={`text-sm ${currentStep >= 2 ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>Info. Profissionais</span>
              <span className={`text-sm ${currentStep >= 3 ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>Documentação</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(currentStep / 3) * 100}%` }} />
            </div>
          </div>

          <Card className="p-6 md:p-8">
            {currentStep === 1 && (
              <form onSubmit={personalForm.handleSubmit(onSubmitStep1)} className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Dados Pessoais e de Contato</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome completo *</Label>
                  <Input id="fullName" placeholder="Ex: Maria Souza" {...personalForm.register("fullName")} />
                  {personalForm.formState.errors.fullName && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF/CNPJ *</Label>
                  <Input
                    id="cpf"
                    placeholder="Ex: 123.456.789-00"
                    {...personalForm.register("cpf")}
                    onChange={(e) => personalForm.setValue("cpf", maskCPF(e.target.value))}
                  />
                  {personalForm.formState.errors.cpf && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.cpf.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de nascimento *</Label>
                  <Input id="birthDate" type="date" {...personalForm.register("birthDate")} />
                  {personalForm.formState.errors.birthDate && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.birthDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    placeholder="Ex: (11) 98888-7777"
                    {...personalForm.register("phone")}
                    onChange={(e) => personalForm.setValue("phone", maskPhone(e.target.value))}
                  />
                  {personalForm.formState.errors.phone && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" type="email" placeholder="Ex: maria.souza@email.com" {...personalForm.register("email")} />
                  {personalForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço (cidade/bairro) *</Label>
                  <Input id="address" placeholder="Ex: Rio de Janeiro, Copacabana" {...personalForm.register("address")} />
                  {personalForm.formState.errors.address && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Veio por indicação? *</Label>
                  <RadioGroup
                    value={personalForm.watch("wasReferred")}
                    onValueChange={(value) => personalForm.setValue("wasReferred", value as "yes" | "no", { shouldValidate: true })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="referred-yes" />
                      <Label htmlFor="referred-yes" className="cursor-pointer">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="referred-no" />
                      <Label htmlFor="referred-no" className="cursor-pointer">Não</Label>
                    </div>
                  </RadioGroup>
                  {personalForm.formState.errors.wasReferred && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.wasReferred.message}</p>
                  )}
                </div>

                {personalForm.watch("wasReferred") === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="referredBy">Quem indicou?</Label>
                    <Input id="referredBy" placeholder="Ex: Andressa ou Daiane" {...personalForm.register("referredBy")} />
                    {personalForm.formState.errors.referredBy && (
                      <p className="text-sm text-destructive">{personalForm.formState.errors.referredBy.message}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button type="submit" size="lg">Próximo <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={qualificationsForm.handleSubmit(onSubmitStep2)} className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Informações Profissionais</h2>

                <div className="space-y-2">
                  <Label htmlFor="serviceArea">Área de atuação *</Label>
                  <ServiceAreaAutocomplete
                    value={qualificationsForm.watch("serviceArea") || ""}
                    onChange={(value) => {
                      qualificationsForm.setValue("serviceArea", value, { shouldValidate: true });
                    }}
                    error={qualificationsForm.formState.errors.serviceArea?.message}
                    placeholder="Digite para buscar (ex: Eletricista, Limpeza...)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Tempo de experiência *</Label>
                  <Input id="experience" placeholder="Ex: 5 anos" {...qualificationsForm.register("experience")} />
                  {qualificationsForm.formState.errors.experience && (
                    <p className="text-sm text-destructive">{qualificationsForm.formState.errors.experience.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Formação/Certificações (opcional)</Label>
                  <Textarea id="education" placeholder="Liste suas qualificações..." {...qualificationsForm.register("education")} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Disponibilidade *</Label>
                  <Input id="availability" placeholder="Ex: Segunda a sexta" {...qualificationsForm.register("availability")} />
                  {qualificationsForm.formState.errors.availability && (
                    <p className="text-sm text-destructive">{qualificationsForm.formState.errors.availability.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Atende em domicílio? *</Label>
                  <RadioGroup
                    value={qualificationsForm.watch("homeService")}
                    onValueChange={(value) => qualificationsForm.setValue("homeService", value as "yes" | "no")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição breve dos serviços * (mínimo 50 caracteres)</Label>
                  <Textarea id="description" placeholder="Descreva os serviços..." {...qualificationsForm.register("description")} rows={4} />
                  <p className="text-sm text-muted-foreground">{qualificationsForm.watch("description")?.length || 0} caracteres</p>
                  {qualificationsForm.formState.errors.description && (
                    <p className="text-sm text-destructive">{qualificationsForm.formState.errors.description.message}</p>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}><ChevronLeft className="mr-2 h-4 w-4" /> Voltar</Button>
                  <Button type="submit" size="lg">Próximo <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={documentsForm.handleSubmit(onSubmitStep3)} className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Documentação</h2>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    <Label htmlFor="idDocument" className="flex items-center justify-between cursor-pointer">
                      <span className="font-semibold">Foto do documento de identificação *</span>
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </Label>
                    <Input id="idDocument" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleIdUpload} className="mt-2" multiple />
                    <p className="text-sm text-muted-foreground mt-2">Aceita PDF, JPG, PNG - Máximo 5MB por arquivo</p>
                    {idFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {idFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="truncate max-w-[250px]">{file.name}</span>
                              <span className="text-muted-foreground text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeIdFile(index)}
                              className="h-7 w-7 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {documentsForm.formState.errors.idDocument && (
                      <p className="text-sm text-destructive mt-2">{documentsForm.formState.errors.idDocument.message}</p>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    <Label htmlFor="proofOfAddress" className="flex items-center justify-between cursor-pointer">
                      <span className="font-semibold">Comprovante de residência *</span>
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </Label>
                    <Input id="proofOfAddress" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleAddressUpload} className="mt-2" multiple />
                    <p className="text-sm text-muted-foreground mt-2">Aceita PDF, JPG, PNG - Máximo 5MB por arquivo</p>
                    {addressFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {addressFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="truncate max-w-[250px]">{file.name}</span>
                              <span className="text-muted-foreground text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAddressFile(index)}
                              className="h-7 w-7 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {documentsForm.formState.errors.proofOfAddress && (
                      <p className="text-sm text-destructive mt-2">{documentsForm.formState.errors.proofOfAddress.message}</p>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    <Label htmlFor="certificates" className="flex items-center justify-between cursor-pointer">
                      <span className="font-semibold">Certificados (opcional)</span>
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </Label>
                    <Input id="certificates" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleCertificateUpload} className="mt-2" multiple />
                    <p className="text-sm text-muted-foreground mt-2">Aceita PDF, JPG, PNG - Máximo 5MB por arquivo</p>
                    {certificateFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {certificateFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="truncate max-w-[250px]">{file.name}</span>
                              <span className="text-muted-foreground text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertificateFile(index)}
                              className="h-7 w-7 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Condições de Cadastro</h3>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="truthDeclaration"
                      checked={documentsForm.watch("truthDeclaration")}
                      onCheckedChange={(checked) => documentsForm.setValue("truthDeclaration", checked as boolean)}
                    />
                    <Label htmlFor="truthDeclaration" className="cursor-pointer leading-relaxed">
                      Declaro que as informações fornecidas são verdadeiras.
                    </Label>
                  </div>
                  {documentsForm.formState.errors.truthDeclaration && (
                    <p className="text-sm text-destructive ml-7">{documentsForm.formState.errors.truthDeclaration.message}</p>
                  )}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacyConsent"
                      checked={documentsForm.watch("privacyConsent")}
                      onCheckedChange={(checked) => documentsForm.setValue("privacyConsent", checked as boolean)}
                    />
                    <Label htmlFor="privacyConsent" className="cursor-pointer leading-relaxed">
                      Autorizo o uso dos meus dados conforme a política de privacidade da plataforma.
                    </Label>
                  </div>
                  {documentsForm.formState.errors.privacyConsent && (
                    <p className="text-sm text-destructive ml-7">{documentsForm.formState.errors.privacyConsent.message}</p>
                  )}

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="signature">Assinatura (digite seu nome completo) *</Label>
                    <Input id="signature" placeholder="Digite seu nome completo" {...documentsForm.register("signature")} />
                    {documentsForm.formState.errors.signature && (
                      <p className="text-sm text-destructive">{documentsForm.formState.errors.signature.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} disabled={isSubmitting}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Finalizar Cadastro <CheckCircle2 className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalRegistration;
