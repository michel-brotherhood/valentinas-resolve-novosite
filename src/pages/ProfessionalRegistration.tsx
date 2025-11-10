import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Upload, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const serviceCategories = [
  "Domésticos", "Beleza", "Saúde", "Jurídicos", "Educação",
  "Automotivos", "Pets", "Eventos", "Criativos", "Construção",
  "Transporte", "Agricultura", "Personalizados", "Turismo", "Esportes"
];

// Step 1 Schema
const personalInfoSchema = z.object({
  fullName: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(20, "Telefone inválido"),
  cpf: z.string().trim().min(11, "CPF inválido").max(14, "CPF inválido"),
  address: z.string().trim().min(5, "Endereço muito curto").max(200, "Endereço muito longo"),
  city: z.string().trim().min(2, "Cidade inválida").max(100, "Cidade muito longa"),
});

// Step 2 Schema
const qualificationsSchema = z.object({
  experience: z.string().trim().min(10, "Descreva sua experiência").max(1000, "Descrição muito longa"),
  education: z.string().trim().min(5, "Informe sua formação").max(500, "Descrição muito longa"),
  certifications: z.string().max(500, "Descrição muito longa").optional(),
});

// Step 3 Schema
const servicesSchema = z.object({
  categories: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
  description: z.string().trim().min(20, "Descrição muito curta").max(1000, "Descrição muito longa"),
  hourlyRate: z.string().trim().min(1, "Informe seu valor"),
});

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type Qualifications = z.infer<typeof qualificationsSchema>;
type Services = z.infer<typeof servicesSchema>;

const ProfessionalRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
  });

  const qualificationsForm = useForm<Qualifications>({
    resolver: zodResolver(qualificationsSchema),
    mode: "onChange",
  });

  const servicesForm = useForm<Services>({
    resolver: zodResolver(servicesSchema),
    mode: "onChange",
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + portfolioFiles.length > 10) {
        toast({
          title: "Limite excedido",
          description: "Você pode enviar no máximo 10 arquivos",
          variant: "destructive",
        });
        return;
      }
      setPortfolioFiles(prev => [...prev, ...files]);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + documentFiles.length > 5) {
        toast({
          title: "Limite excedido",
          description: "Você pode enviar no máximo 5 documentos",
          variant: "destructive",
        });
        return;
      }
      setDocumentFiles(prev => [...prev, ...files]);
    }
  };

  const onSubmitStep1 = personalForm.handleSubmit(() => {
    setCurrentStep(2);
  });

  const onSubmitStep2 = qualificationsForm.handleSubmit(() => {
    setCurrentStep(3);
  });

  const onSubmitStep3 = servicesForm.handleSubmit(() => {
    if (selectedCategories.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma categoria de serviço",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(4);
  });

  const onSubmitFinal = () => {
    if (documentFiles.length === 0) {
      toast({
        title: "Documentos obrigatórios",
        description: "Por favor, envie pelo menos um documento de identificação",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Cadastro enviado!",
      description: "Seu cadastro será analisado em até 48 horas. Você receberá um email com as próximas etapas.",
    });
    
    // Here you would submit to backend
    console.log("Form submitted:", {
      personal: personalForm.getValues(),
      qualifications: qualificationsForm.getValues(),
      services: servicesForm.getValues(),
      categories: selectedCategories,
      portfolio: portfolioFiles,
      documents: documentFiles,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Cadastro de Profissional
            </h1>
            <p className="text-lg text-muted-foreground">
              Preencha as informações para começar a receber pedidos
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[
              { num: 1, label: "Dados Pessoais" },
              { num: 2, label: "Qualificações" },
              { num: 3, label: "Serviços" },
              { num: 4, label: "Documentos" },
            ].map((step) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.num ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center hidden md:block">
                    {step.label}
                  </span>
                </div>
                {step.num < 4 && (
                  <div
                    className={`h-1 flex-1 ${
                      currentStep > step.num ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="p-6 md:p-8">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <form onSubmit={onSubmitStep1} className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Informações Pessoais
                </h2>
                
                <div>
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <Input
                    id="fullName"
                    {...personalForm.register("fullName")}
                    placeholder="Seu nome completo"
                  />
                  {personalForm.formState.errors.fullName && (
                    <p className="text-sm text-destructive mt-1">
                      {personalForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...personalForm.register("email")}
                      placeholder="seu@email.com"
                    />
                    {personalForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {personalForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      {...personalForm.register("phone")}
                      placeholder="(00) 00000-0000"
                    />
                    {personalForm.formState.errors.phone && (
                      <p className="text-sm text-destructive mt-1">
                        {personalForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    {...personalForm.register("cpf")}
                    placeholder="000.000.000-00"
                  />
                  {personalForm.formState.errors.cpf && (
                    <p className="text-sm text-destructive mt-1">
                      {personalForm.formState.errors.cpf.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Endereço Completo *</Label>
                  <Input
                    id="address"
                    {...personalForm.register("address")}
                    placeholder="Rua, número, complemento"
                  />
                  {personalForm.formState.errors.address && (
                    <p className="text-sm text-destructive mt-1">
                      {personalForm.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    {...personalForm.register("city")}
                    placeholder="Sua cidade"
                  />
                  {personalForm.formState.errors.city && (
                    <p className="text-sm text-destructive mt-1">
                      {personalForm.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-foreground hover:bg-foreground/90 text-background">
                    Próximo <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* Step 2: Qualifications */}
            {currentStep === 2 && (
              <form onSubmit={onSubmitStep2} className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Qualificações
                </h2>

                <div>
                  <Label htmlFor="experience">Experiência Profissional *</Label>
                  <Textarea
                    id="experience"
                    {...qualificationsForm.register("experience")}
                    placeholder="Descreva sua experiência profissional..."
                    rows={5}
                  />
                  {qualificationsForm.formState.errors.experience && (
                    <p className="text-sm text-destructive mt-1">
                      {qualificationsForm.formState.errors.experience.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="education">Formação Acadêmica *</Label>
                  <Textarea
                    id="education"
                    {...qualificationsForm.register("education")}
                    placeholder="Informe sua formação acadêmica..."
                    rows={3}
                  />
                  {qualificationsForm.formState.errors.education && (
                    <p className="text-sm text-destructive mt-1">
                      {qualificationsForm.formState.errors.education.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="certifications">Certificações e Cursos</Label>
                  <Textarea
                    id="certifications"
                    {...qualificationsForm.register("certifications")}
                    placeholder="Liste suas certificações e cursos (opcional)"
                    rows={3}
                  />
                  {qualificationsForm.formState.errors.certifications && (
                    <p className="text-sm text-destructive mt-1">
                      {qualificationsForm.formState.errors.certifications.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                  <Button type="submit" className="bg-foreground hover:bg-foreground/90 text-background">
                    Próximo <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Services */}
            {currentStep === 3 && (
              <form onSubmit={onSubmitStep3} className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Categorias de Serviços
                </h2>

                <div>
                  <Label className="mb-4 block">
                    Selecione as categorias em que você atua *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedCategories.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selecione pelo menos uma categoria
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Descrição dos Serviços *</Label>
                  <Textarea
                    id="description"
                    {...servicesForm.register("description")}
                    placeholder="Descreva os serviços que você oferece..."
                    rows={5}
                  />
                  {servicesForm.formState.errors.description && (
                    <p className="text-sm text-destructive mt-1">
                      {servicesForm.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="hourlyRate">Valor por Hora (R$) *</Label>
                  <Input
                    id="hourlyRate"
                    {...servicesForm.register("hourlyRate")}
                    placeholder="Ex: 80,00"
                  />
                  {servicesForm.formState.errors.hourlyRate && (
                    <p className="text-sm text-destructive mt-1">
                      {servicesForm.formState.errors.hourlyRate.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                  <Button type="submit" className="bg-foreground hover:bg-foreground/90 text-background">
                    Próximo <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Portfólio e Documentos
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="portfolio">Portfólio (Opcional)</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Envie fotos de trabalhos realizados (máximo 10 arquivos)
                    </p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <Input
                        id="portfolio"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePortfolioUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("portfolio")?.click()}
                      >
                        Selecionar Arquivos
                      </Button>
                      {portfolioFiles.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-foreground font-medium">
                            {portfolioFiles.length} arquivo(s) selecionado(s)
                          </p>
                          <ul className="text-xs text-muted-foreground mt-2">
                            {portfolioFiles.map((file, idx) => (
                              <li key={idx}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="documents">Documentos de Identificação *</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Envie RG, CNH ou outro documento oficial com foto (máximo 5 arquivos)
                    </p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleDocumentUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("documents")?.click()}
                      >
                        Selecionar Documentos
                      </Button>
                      {documentFiles.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-foreground font-medium">
                            {documentFiles.length} documento(s) selecionado(s)
                          </p>
                          <ul className="text-xs text-muted-foreground mt-2">
                            {documentFiles.map((file, idx) => (
                              <li key={idx}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Importante:</strong> Seus documentos serão verificados pela nossa equipe. 
                    Este processo pode levar até 48 horas. Você receberá um email quando seu cadastro for aprovado.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(3)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={onSubmitFinal}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  >
                    Finalizar Cadastro
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfessionalRegistration;
