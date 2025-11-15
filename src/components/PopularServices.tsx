import { Card } from "@/components/ui/card";
import cleaningImg from "@/assets/service-cleaning.jpg";
import accountingImg from "@/assets/service-accounting.jpg";
import gardeningImg from "@/assets/service-gardening.jpg";
import beautyImg from "@/assets/service-beauty.jpg";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Limpeza e Manutenção",
    image: cleaningImg,
  },
  {
    title: "Contabilidade Integrada",
    image: accountingImg,
  },
  {
    title: "Jardinagem",
    image: gardeningImg,
  },
  {
    title: "Beleza e Estética",
    image: beautyImg,
  },
];

export const PopularServices = () => {
  const navigate = useNavigate();
  
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
              onClick={() => navigate('/servicos')}
              className="group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-4 bg-card group-hover:bg-accent/5 transition-colors duration-500">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/servicos')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-300"
          >
            Ver todos os serviços
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
