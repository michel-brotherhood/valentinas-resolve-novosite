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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Mail } from "lucide-react";
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Solicitar Orçamento
            </h1>
            <p className="text-lg text-muted-foreground">
              Preencha o formulário e encontre o profissional ideal para você
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados do Cliente */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Dados do Cliente</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Seu nome completo"
                    />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: maskPhone(e.target.value)})}
                      placeholder="+55 (11) 99999-9999"
                      maxLength={19}
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cityNeighborhood">Cidade de Residência *</Label>
                    <Input
                      id="cityNeighborhood"
                      value={formData.cityNeighborhood}
                      onChange={(e) => setFormData({...formData, cityNeighborhood: e.target.value})}
                      placeholder="Cidade/Bairro"
                    />
                    {errors.cityNeighborhood && <p className="text-sm text-destructive mt-1">{errors.cityNeighborhood}</p>}
                  </div>
                </div>
              </div>

              {/* Detalhes do Serviço */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Detalhes do Serviço</h2>
                
                <div>
                  <Label htmlFor="serviceType">Tipo de serviço desejado *</Label>
                  <Input
                    id="serviceType"
                    type="text"
                    placeholder="Ex: Limpeza, Encanamento, Elétrica"
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value })
                    }
                    className={errors.serviceType ? "border-destructive" : ""}
                  />
                  {errors.serviceType && <p className="text-sm text-destructive mt-1">{errors.serviceType}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Descrição do que precisa ser feito * (mínimo 20 caracteres)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva em detalhes o serviço que você precisa..."
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">{formData.description.length} caracteres</p>
                  {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label htmlFor="location">Local de execução (endereço aproximado ou bairro) *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Endereço ou bairro"
                  />
                  {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
                </div>

                <div>
                  <Label>Urgência do serviço *</Label>
                  <RadioGroup value={formData.urgency} onValueChange={(value: any) => setFormData({...formData, urgency: value})}>
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
                      className="mt-2"
                    />
                  )}
                </div>
              </div>

              {/* Preferências do Cliente */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Preferências do Cliente</h2>
                
                <div>
                  <Label className="mb-3 block">Deseja receber contato por: *</Label>
                  <div className="space-y-2">
                    {["WhatsApp", "E-mail", "Telefone"].map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.contactPreference.includes(option)}
                          onCheckedChange={() => handleContactPreferenceToggle(option)}
                        />
                        <Label htmlFor={option} className="font-normal cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.contactPreference && <p className="text-sm text-destructive mt-1">{errors.contactPreference}</p>}
                </div>

                <div>
                  <Label>Orçamento desejado *</Label>
                  <RadioGroup value={formData.budgetType} onValueChange={(value: any) => setFormData({...formData, budgetType: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="estimate" id="estimate" />
                      <Label htmlFor="estimate" className="font-normal cursor-pointer">Somente estimativa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="detailed" id="detailed" />
                      <Label htmlFor="detailed" className="font-normal cursor-pointer">Orçamento detalhado com visita técnica</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Condições */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked as boolean})}
                  />
                  <Label htmlFor="acceptTerms" className="font-normal cursor-pointer">
                    Concordo em compartilhar meus dados com profissionais parceiros da plataforma para fins de orçamento.
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-sm text-destructive mt-1">{errors.acceptTerms}</p>}
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold">
                <Mail className="mr-2 h-5 w-5" />
                ENVIAR MENSAGEM
              </Button>

              <p className="text-center text-sm text-muted-foreground">
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
