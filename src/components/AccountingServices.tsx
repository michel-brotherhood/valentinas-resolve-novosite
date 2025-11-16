import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Calculator,
  Receipt,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Abertura de CNPJ",
    description: "Processo completo para abrir sua empresa com total suporte e acompanhamento.",
  },
  {
    icon: Calculator,
    title: "Planejamento Tributário",
    description: "Escolha o regime ideal e pague menos impostos de forma legal e estratégica.",
  },
  {
    icon: Receipt,
    title: "Emissão de Notas Fiscais",
    description: "Gestão completa da emissão, organização e controle das suas notas fiscais.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Mensais",
    description: "Acesso em tempo real à situação fiscal e tributária do seu negócio.",
  },
];

const benefits = [
  "100% digital e sem burocracia",
  "Atendimento direto com a contadora responsável",
  "Integração automática com a plataforma",
  "Alertas de vencimentos e obrigações",
  "Planejamento tributário personalizado",
  "Suporte constante via WhatsApp",
];

export const AccountingServices = () => {
  const navigate = useNavigate();
  
  return (
    <section id="contabilidade-integrada" className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contabilidade Integrada
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O jeito inteligente de cuidar do seu negócio. Gestão contábil moderna, 100% digital e com suporte personalizado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Por que escolher nossa contabilidade?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Como funciona?
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-foreground">Escolha o serviço</p>
                  <p className="text-sm text-muted-foreground">
                    Selecione o tipo de enquadramento e serviço necessário
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-foreground">Envie os documentos</p>
                  <p className="text-sm text-muted-foreground">
                    Upload online dos dados e documentos solicitados
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-foreground">Acompanhe em tempo real</p>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas e acompanhe tudo pelo painel digital
                  </p>
                </div>
              </div>
            </div>
            <Button 
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold"
              onClick={() => navigate('/contabilidade')}
            >
              Solicitar Orçamento <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Pronto para simplificar sua contabilidade?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Entre em contato com nossa equipe e descubra como a Contabilidade Integrada 
            pode transformar a gestão do seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="shadow__btn"
              onClick={() => {
                navigate('/formulario-contabilidade');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              Quero saber mais
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/servicos')}
            >
              Ver Todos os Serviços
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
