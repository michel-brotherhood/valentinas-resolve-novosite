import { useState, useEffect } from "react";
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
import { ServiceSelect } from "@/components/ServiceSelect";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Mail, Check } from "lucide-react";
import { maskPhone } from "@/lib/masks";

const hireServiceSchema = z.object({
  fullName: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  email: z.string().trim().email("Email inválido").max(255),
  cityNeighborhood: z.string().trim().min(3, "Cidade/Bairro obrigatório").max(100),
  serviceType: z.string().min(1, "Digite o tipo de serviço"),
  description: z.string().trim().min(20, "Descrição deve ter pelo menos 20 caracteres").max(1000),
  location: z.string().trim().min(5, "Local de execução obrigatório").max(200),
  urgency: z.enum(["immediate", "days", "scheduled"]),
  scheduledDate: z.string().optional(),
  contactPreference: z.array(z.string()).min(1, "Selecione pelo menos uma opção"),
  budgetType: z.enum(["estimate", "detailed"]),
  acceptTerms: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
});


export default function HireService() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get service from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const preSelectedService = urlParams.get('servico') || "";
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cityNeighborhood: "",
    serviceType: preSelectedService,
    description: "",
    location: "",
    urgency: "days" as "immediate" | "days" | "scheduled",
    scheduledDate: "",
    contactPreference: [] as string[],
    budgetType: "estimate" as "estimate" | "detailed",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Progress tracking
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const completed: number[] = [];
    
    // Step 1: Dados do Cliente
    if (formData.fullName && formData.email && formData.phone && formData.cityNeighborhood) {
      completed.push(1);
    }
    
    // Step 2: Detalhes do Serviço
    if (formData.serviceType && formData.description.length >= 20 && formData.location) {
      completed.push(2);
    }
    
    // Step 3: Preferências
    if (formData.contactPreference.length > 0 && formData.acceptTerms) {
      completed.push(3);
    }
    
    setCompletedSteps(completed);
  }, [formData]);

  const handleContactPreferenceToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      contactPreference: prev.contactPreference.includes(value)
        ? prev.contactPreference.filter(v => v !== value)
        : [...prev.contactPreference, value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      hireServiceSchema.parse(formData);
      setErrors({});

      // Send email via edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-hire-service-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          cityNeighborhood: formData.cityNeighborhood,
          serviceType: formData.serviceType,
          description: formData.description,
          location: formData.location,
          urgency: formData.urgency === "immediate" ? "Imediato" : formData.urgency === "days" ? "Próximos dias" : "Agendado",
          scheduledDate: formData.scheduledDate,
          contactPreference: formData.contactPreference.join(", "),
          budgetType: formData.budgetType === "estimate" ? "Estimativa" : "Detalhado com visita",
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar solicitação');

      toast({
        title: "Solicitação enviada!",
        description: "Redirecionando...",
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        cityNeighborhood: "",
        serviceType: "",
        description: "",
        location: "",
        urgency: "days",
        scheduledDate: "",
        contactPreference: [],
        budgetType: "estimate",
        acceptTerms: false,
      });
      
      setTimeout(() => {
        navigate("/confirmacao?type=hire");
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl w-full">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 break-words">
              Solicitar Orçamento
            </h1>
            <p className="text-base md:text-lg text-muted-foreground break-words px-2">
              Preencha o formulário e encontre o profissional ideal para você
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  completedSteps.includes(1) 
                    ? 'bg-primary text-black' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {completedSteps.includes(1) ? (
                    <Check className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <span className="font-bold">1</span>
                  )}
                </div>
                <span className="text-xs md:text-sm mt-2 text-center font-medium">
                  Dados do Cliente
                </span>
              </div>

              {/* Connector 1-2 */}
              <div className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                completedSteps.includes(1) ? 'bg-primary' : 'bg-muted'
              }`} />

              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  completedSteps.includes(2) 
                    ? 'bg-primary text-black' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {completedSteps.includes(2) ? (
                    <Check className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <span className="font-bold">2</span>
                  )}
                </div>
                <span className="text-xs md:text-sm mt-2 text-center font-medium">
                  Serviço
                </span>
              </div>

              {/* Connector 2-3 */}
              <div className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                completedSteps.includes(2) ? 'bg-primary' : 'bg-muted'
              }`} />

              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  completedSteps.includes(3) 
                    ? 'bg-primary text-black' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {completedSteps.includes(3) ? (
                    <Check className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <span className="font-bold">3</span>
                  )}
                </div>
                <span className="text-xs md:text-sm mt-2 text-center font-medium">
                  Preferências
                </span>
              </div>
            </div>
          </div>

          <Card className="p-4 md:p-6 lg:p-8 w-full overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {/* Dados do Cliente */}
              <div className="space-y-4 w-full">
                <h2 className="text-xl md:text-2xl font-bold text-foreground break-words">Dados do Cliente</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Seu nome completo"
                      className="w-full"
                      maxLength={100}
                    />
                    {errors.fullName && <p className="text-sm text-destructive mt-1 break-words">{errors.fullName}</p>}
                  </div>

                  <div className="w-full">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                      className="w-full"
                      maxLength={255}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1 break-words">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: maskPhone(e.target.value)})}
                      placeholder="(69) 99999-9999"
                      maxLength={19}
                      className="w-full"
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1 break-words">{errors.phone}</p>}
                  </div>

                  <div className="w-full">
                    <Label htmlFor="cityNeighborhood">Cidade de Residência *</Label>
                    <Input
                      id="cityNeighborhood"
                      value={formData.cityNeighborhood}
                      onChange={(e) => setFormData({...formData, cityNeighborhood: e.target.value})}
                      placeholder="Cidade/Bairro"
                      className="w-full"
                      maxLength={100}
                    />
                    {errors.cityNeighborhood && <p className="text-sm text-destructive mt-1 break-words">{errors.cityNeighborhood}</p>}
                  </div>
                </div>
              </div>

              {/* Detalhes do Serviço */}
              <div className="space-y-4 w-full">
                <h2 className="text-xl md:text-2xl font-bold text-foreground break-words">Detalhes do Serviço</h2>
                
                <div className="w-full">
                  <Label htmlFor="serviceType">Tipo de serviço desejado *</Label>
                  <ServiceSelect
                    value={formData.serviceType}
                    onChange={(value) => setFormData({ ...formData, serviceType: value })}
                    placeholder="Selecione o serviço desejado"
                  />
                  {errors.serviceType && <p className="text-sm text-destructive mt-1 break-words">{errors.serviceType}</p>}
                </div>

                <div className="w-full">
                  <Label htmlFor="description">Descrição do que precisa ser feito * (mínimo 20 caracteres)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva em detalhes o serviço que você precisa..."
                    rows={4}
                    className="w-full"
                    maxLength={1000}
                  />
                  <p className="text-sm text-muted-foreground">{formData.description.length}/1000 caracteres</p>
                  {errors.description && <p className="text-sm text-destructive mt-1 break-words">{errors.description}</p>}
                </div>

                <div className="w-full">
                  <Label htmlFor="location">Local de execução (endereço aproximado ou bairro) *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Endereço ou bairro"
                    className="w-full"
                    maxLength={200}
                  />
                  {errors.location && <p className="text-sm text-destructive mt-1 break-words">{errors.location}</p>}
                </div>

                <div className="w-full">
                  <Label className="mb-2 block">Urgência do serviço *</Label>
                  <RadioGroup value={formData.urgency} onValueChange={(value: any) => setFormData({...formData, urgency: value})} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediate" id="immediate" />
                      <Label htmlFor="immediate" className="font-normal cursor-pointer">Imediato</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="days" id="days" />
                      <Label htmlFor="days" className="font-normal cursor-pointer">Nos próximos dias</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled" className="font-normal cursor-pointer">Agendado</Label>
                    </div>
                  </RadioGroup>
                  {formData.urgency === "scheduled" && (
                    <Input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                      className="mt-2 w-full"
                    />
                  )}
                </div>
              </div>

              {/* Preferências do Cliente */}
              <div className="space-y-4 w-full">
                <h2 className="text-xl md:text-2xl font-bold text-foreground break-words">Preferências do Cliente</h2>
                
                <div className="w-full">
                  <Label className="mb-3 block">Deseja receber contato por: *</Label>
                  <div className="space-y-2">
                    {["WhatsApp", "E-mail", "Telefone"].map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.contactPreference.includes(option)}
                          onCheckedChange={() => handleContactPreferenceToggle(option)}
                        />
                        <Label htmlFor={option} className="font-normal cursor-pointer break-words">{option}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.contactPreference && <p className="text-sm text-destructive mt-1 break-words">{errors.contactPreference}</p>}
                </div>

                <div className="w-full">
                  <Label className="mb-2 block">Orçamento desejado *</Label>
                  <RadioGroup value={formData.budgetType} onValueChange={(value: any) => setFormData({...formData, budgetType: value})} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="estimate" id="estimate" />
                      <Label htmlFor="estimate" className="font-normal cursor-pointer break-words">Somente estimativa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="detailed" id="detailed" />
                      <Label htmlFor="detailed" className="font-normal cursor-pointer break-words">Orçamento detalhado com visita técnica</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Condições */}
              <div className="space-y-4 w-full">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked as boolean})}
                    className="mt-1 flex-shrink-0"
                  />
                  <Label htmlFor="acceptTerms" className="font-normal cursor-pointer break-words">
                    Concordo em compartilhar meus dados com profissionais parceiros da plataforma para fins de orçamento.
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-sm text-destructive mt-1 break-words">{errors.acceptTerms}</p>}
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-sm md:text-base">
                <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                ENVIAR SOLICITAÇÃO
              </Button>

              <p className="text-center text-xs md:text-sm text-muted-foreground break-words px-2">
                Após o envio, um especialista entrará em contato via WhatsApp ou e-mail.
              </p>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
