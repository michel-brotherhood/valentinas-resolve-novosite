import { Card } from "@/components/ui/card";
import { Search, FileText, UserCheck, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Descreva o seu pedido",
    description: "Diga-nos que tipo de serviço precisa e onde.",
  },
  {
    icon: FileText,
    title: "2. Compare propostas",
    description: "Receba orçamentos de profissionais qualificados.",
  },
  {
    icon: UserCheck,
    title: "3. Escolha o profissional",
    description: "Veja avaliações e escolha o melhor para si.",
  },
  {
    icon: Star,
    title: "4. Avalie o serviço",
    description: "Partilhe a sua experiência com a comunidade.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Como funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontrar o profissional certo nunca foi tão fácil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
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
      </div>
    </section>
  );
};
