import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { maskPhone } from "@/lib/masks";

const accountingFormSchema = z.object({
  fullName: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  userType: z.enum(
    ["profissional", "autonomo", "empresa", "pessoa_fisica"],
    { required_error: "Selecione uma opção" }
  ),
});

type FormData = z.infer<typeof accountingFormSchema>;

const userTypeOptions = [
  { value: "profissional", label: "Profissional da plataforma" },
  { value: "autonomo", label: "Autônomo" },
  { value: "empresa", label: "Empresa" },
  { value: "pessoa_fisica", label: "Pessoa física" },
];

export default function AccountingForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    userType: "" as any,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      accountingFormSchema.parse(formData);
      setErrors({});

      // Prepare WhatsApp message
      const userTypeLabel = userTypeOptions.find(opt => opt.value === formData.userType)?.label || formData.userType;
      
      const message = `*Solicitação de Proposta - Contabilidade Integrada*

*Nome:* ${formData.fullName}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Você é:* ${userTypeLabel}

Solicitação enviada através do formulário de Contabilidade Integrada Valentinas.`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5569992715000?text=${encodedMessage}`, "_blank");

      toast({
        title: "Solicitação enviada!",
        description: "Em breve nossa equipe entrará em contato com você para apresentar a proposta personalizada.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        userType: "" as any,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Planos Contábeis Personalizados
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Soluções sob medida para cada perfil — profissional, autônomo ou empresa.
            </p>
            <p className="text-lg text-primary font-semibold">
              Clique e descubra o plano ideal para o seu negócio.
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-8 md:p-10 bg-card/50 backdrop-blur border-primary/20 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Formulário Rápido – Contabilidade Integrada Valentinas
              </h2>
              <p className="text-muted-foreground">
                Preencha os dados abaixo e receba uma proposta personalizada
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Básicos */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Dados Básicos
                </h3>

                <div>
                  <Label htmlFor="fullName">
                    Nome completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Digite seu nome completo"
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">
                    E-mail <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="seu@email.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">
                    Telefone / WhatsApp <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: maskPhone(e.target.value) })
                    }
                    placeholder="+55 (11) 99999-9999"
                    maxLength={19}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="userType">
                    Você é: <span className="text-destructive">*</span>
                  </Label>
                  <div className="mt-2 space-y-2">
                    {userTypeOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.userType === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={option.value}
                          checked={formData.userType === option.value}
                          onChange={(e) =>
                            setFormData({ ...formData, userType: e.target.value as any })
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-foreground font-medium">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.userType && (
                    <p className="text-sm text-destructive mt-1">{errors.userType}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-lg py-6 shadow-[0_0_20px_rgba(255,204,0,0.3)] hover:shadow-[0_0_30px_rgba(255,204,0,0.5)] transition-all"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar Proposta"}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Após o envio, nossa equipe retornará com o orçamento personalizado para seu perfil.
              </p>
            </form>
          </Card>

          {/* Info Card */}
          <Card className="mt-8 p-6 bg-secondary/30 border-primary/10">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Importante:</strong> Não exibimos valores diretamente nesta página. 
              Cada solução é personalizada conforme suas necessidades específicas. Nossa equipe analisará seu perfil 
              e apresentará a melhor proposta para você.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
