import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Maria Silva",
    service: "Contabilidade Integrada",
    rating: 5,
    date: "Há 2 semanas",
    comment: "A Contabilidade Integrada da Valentina's Resolve transformou a gestão do meu negócio. Atendimento impecável da Andressa e equipe. Tudo 100% digital e sem complicação!",
    avatar: "M"
  },
  {
    name: "João Santos",
    service: "Limpeza Residencial",
    rating: 5,
    date: "Há 1 mês",
    comment: "Serviço de limpeza excepcional! A equipe foi pontual, atenciosa e deixou minha casa impecável. Preços justos e profissionais qualificados. Super recomendo!",
    avatar: "J"
  },
  {
    name: "Ana Costa",
    service: "Consultoria Jurídica",
    rating: 5,
    date: "Há 3 semanas",
    comment: "Excelente consultoria jurídica! Profissionais competentes que resolveram minha questão trabalhista com rapidez e eficiência. Plataforma muito prática de usar.",
    avatar: "A"
  },
  {
    name: "Pedro Oliveira",
    service: "Reformas e Construção",
    rating: 5,
    date: "Há 1 semana",
    comment: "Contratei serviço de pintura e pequenos reparos. Ficou perfeito! A instalação foi rápida e muito bem feita. Equipe profissional e atenciosa.",
    avatar: "P"
  },
  {
    name: "Carla Mendes",
    service: "Serviços de Beleza",
    rating: 5,
    date: "Há 4 dias",
    comment: "Adorei o serviço de manicure e design de sobrancelhas! Profissional super qualificada que foi até minha casa. Comodidade e qualidade garantidas!",
    avatar: "C"
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            O Que Nossos <span className="text-primary">Clientes Dizem</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Avaliações reais de clientes satisfeitos com nossos serviços
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-6xl mx-auto mb-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {testimonial.service}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Statistics */}
        <Card className="max-w-md mx-auto p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                4.9/5.0
              </div>
              <p className="text-sm text-muted-foreground">
                Média de avaliações
              </p>
            </div>
            <div className="w-px h-16 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                500+
              </div>
              <p className="text-sm text-muted-foreground">
                Avaliações verificadas
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
