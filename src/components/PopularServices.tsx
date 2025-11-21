import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import cleaningImg from "@/assets/service-cleaning.jpg";
import accountingImg from "@/assets/service-accounting.jpg";
import gardeningImg from "@/assets/service-gardening.jpg";
import beautyImg from "@/assets/service-beauty.jpg";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const services = [
  {
    title: "Limpeza e Manutenção",
    image: cleaningImg,
    route: "/servicos",
  },
  {
    title: "Contabilidade Integrada",
    image: accountingImg,
    route: "/contabilidade",
  },
  {
    title: "Jardinagem",
    image: gardeningImg,
    route: "/servicos",
  },
  {
    title: "Beleza e Estética",
    image: beautyImg,
    route: "/servicos",
  },
];

export const PopularServices = () => {
  const navigate = useNavigate();
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Serviços mais procurados
        </h2>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem key={service.title}>
                <div className="p-1">
                  <Card
                    onClick={() => navigate(service.route)}
                    className="group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-primary/50"
                  >
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 bg-card group-hover:bg-accent/5 transition-colors duration-500 text-center">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

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
