import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { maskPhone } from "@/lib/masks";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Email inválido" }).max(255, { message: "Email deve ter menos de 255 caracteres" }),
  phone: z.string().trim().min(10, { message: "Telefone inválido" }).max(20, { message: "Telefone deve ter menos de 20 caracteres" }),
  service: z.string().trim().min(1, { message: "Selecione um assunto" }),
  message: z.string().trim().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }).max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

export default function Contact() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      contactSchema.parse(formData);
      setIsSubmitting(true);
      
      // Send email via edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar mensagem');
      
      toast({
        title: "Mensagem enviada!",
        description: "Redirecionando...",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setIsSubmitting(false);
      
      setTimeout(() => {
        navigate("/confirmacao?type=contact");
      }, 1000);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-black to-primary/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Entre em Contato
              </h1>
              <p className="text-xl text-white/90">
                Estamos prontos para atender você. Solicite um orçamento sem compromisso.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-8 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Form */}
              <Card className="p-4 md:p-8 overflow-hidden">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
                  Central de Dúvidas
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="min-w-0">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full ${errors.name ? "border-destructive" : ""}`}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full ${errors.email ? "border-destructive" : ""}`}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                      className={`w-full ${errors.phone ? "border-destructive" : ""}`}
                      maxLength={19}
                      placeholder="+55 (11) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor="service">Assunto *</Label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`flex h-10 w-full max-w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.service ? "border-destructive" : ""}`}
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="duvidas-gerais">Dúvidas Gerais</option>
                      <option value="suporte-cliente">Suporte a Cliente</option>
                      <option value="suporte-profissional">Suporte a Profissional</option>
                      <option value="contabilidade-integrada">Contabilidade Integrada</option>
                      <option value="financeiro">Financeiro</option>
                    </select>
                    {errors.service && (
                      <p className="text-sm text-destructive mt-1">{errors.service}</p>
                    )}
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full ${errors.message ? "border-destructive" : ""}`}
                      rows={5}
                      maxLength={1000}
                      placeholder="Conte-nos mais sobre o que você precisa..."
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.message.length}/1000 caracteres
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                </form>
              </Card>

              {/* Contact Info */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
                    Informações de Contato
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Entre em contato conosco através dos canais abaixo ou preencha o formulário 
                    para receber um orçamento personalizado.
                  </p>
                </div>

                <Card className="p-4 md:p-6 overflow-hidden">
                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Atendimento ao Cliente</h3>
                      <p className="text-muted-foreground">(69) 99271-5000</p>
                      <p className="text-sm text-muted-foreground">WhatsApp disponível</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Contabilidade Integrada</h3>
                      <p className="text-muted-foreground">+351 961803400</p>
                      <p className="text-sm text-muted-foreground">WhatsApp disponível</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground mb-1">E-mails</h3>
                      <p className="text-muted-foreground text-sm break-words overflow-wrap-anywhere">atendimentoaocliente@valentinasresolve.com.br</p>
                      <p className="text-muted-foreground text-sm break-words overflow-wrap-anywhere mt-1">contabilidadeintegrada@valentinasresolve.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                      <p className="text-muted-foreground text-sm">
                        Rua Osvaldo Cruz, 770<br />
                        Ouro Preto do Oeste - RO, 76.920-000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Horário</h3>
                      <p className="text-muted-foreground text-sm">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 13h
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                    Resposta Rápida
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Respondemos todas as solicitações em até 24 horas úteis.
                  </p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold"
                    onClick={() => window.open('https://wa.me/5569992715000', '_blank')}
                  >
                    Falar no WhatsApp Agora
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
