import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, FileCheck, Briefcase, TrendingUp, Search, ClipboardList, MessageSquare, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type TabType = "client" | "professional";

const clientSteps = [
  {
    icon: Search,
    title: "1. Escolha o serviço",
    description: "Navegue pelo catálogo com mais de 200 serviços em 20 categorias.",
  },
  {
    icon: ClipboardList,
    title: "2. Descreva sua necessidade",
    description: "Preencha os detalhes do que precisa e sua localização.",
  },
  {
    icon: MessageSquare,
    title: "3. Receba orçamentos",
    description: "Profissionais verificados enviam propostas para seu pedido.",
  },
  {
    icon: ShieldCheck,
    title: "4. Contrate com segurança",
    description: "Escolha o melhor profissional e acompanhe o serviço.",
  },
];

const professionalSteps = [
  {
    icon: UserPlus,
    title: "1. Cadastre-se",
    description: "Complete seu perfil profissional e envie seus documentos.",
  },
  {
    icon: FileCheck,
    title: "2. Seja aprovado",
    description: "Nossa equipe verifica e aprova seu cadastro em até 48h.",
  },
  {
    icon: Briefcase,
    title: "3. Receba solicitações",
    description: "Conecte-se com clientes que precisam do seu serviço.",
  },
  {
    icon: TrendingUp,
    title: "4. Cresça suas oportunidades",
    description: "Aumente sua renda com clientes qualificados.",
  },
];

export const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("client");

  const steps = activeTab === "client" ? clientSteps : professionalSteps;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Como funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Veja como é simples usar a plataforma
          </p>

          {/* Tabs */}
          <div className="inline-flex gap-2 bg-muted p-1 rounded-full">
            <button
              onClick={() => setActiveTab("client")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "client"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Para Clientes
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "professional"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Para Profissionais
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card
              key={`${activeTab}-${index}`}
              className="p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          {activeTab === "client" ? (
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold px-8"
              onClick={() => {
                navigate('/contratar-servico');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              Contratar um Serviço
            </Button>
          ) : (
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold px-8"
              onClick={() => {
                navigate('/registro-profissional');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              Cadastrar-me como Profissional
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
