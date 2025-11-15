import { Card } from "@/components/ui/card";
import accountingImg from "@/assets/service-accounting.jpg";
import legalImg from "@/assets/service-legal.jpg";
import cleaningImg from "@/assets/service-cleaning.jpg";
import consultingImg from "@/assets/service-consulting.jpg";
import { ChevronRight } from "lucide-react";

const services = [
  {
    title: "Contabilidade Integrada",
    image: accountingImg,
  },
  {
    title: "Serviços Jurídicos",
    image: legalImg,
  },
  {
    title: "Limpeza e Manutenção",
    image: cleaningImg,
  },
  {
    title: "Consultoria Empresarial",
    image: consultingImg,
  },
];

export const PopularServices = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Serviços mais procurados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
            Ver todos os serviços
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
