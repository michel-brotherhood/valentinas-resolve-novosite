import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import logoVR from "@/assets/logo-renovado.svg";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Maria Silva",
    service: "Contabilidade Integrada",
    rating: 5,
    date: "Há 2 semanas",
    comment: "A Contabilidade Integrada da Valentina's Resolve transformou a gestão do meu negócio. Atendimento impecável da Andressa e equipe. Tudo 100% digital e sem complicação!",
    useImage: true
  },
  {
    name: "João Santos",
    service: "Limpeza Residencial",
    rating: 5,
    date: "Há 1 mês",
    comment: "Serviço de limpeza excepcional! A equipe foi pontual, atenciosa e deixou minha casa impecável. Preços justos e profissionais qualificados. Super recomendo!",
    useImage: true
  },
  {
    name: "Ana Costa",
    service: "Consultoria Jurídica",
    rating: 5,
    date: "Há 3 semanas",
    comment: "Excelente consultoria jurídica! Profissionais competentes que resolveram minha questão trabalhista com rapidez e eficiência. Plataforma muito prática de usar.",
    useImage: true
  },
  {
    name: "Pedro Oliveira",
    service: "Reformas e Construção",
    rating: 5,
    date: "Há 1 semana",
    comment: "Contratei serviço de pintura e pequenos reparos. Ficou perfeito! A instalação foi rápida e muito bem feita. Equipe profissional e atenciosa.",
    useImage: true
  },
  {
    name: "Carla Mendes",
    service: "Serviços de Beleza",
    rating: 5,
    date: "Há 4 dias",
    comment: "Adorei o serviço de manicure e design de sobrancelhas! Profissional super qualificada que foi até minha casa. Comodidade e qualidade garantidas!",
    useImage: true
  },
  {
    name: "Roberto Lima",
    service: "Jardinagem",
    rating: 5,
    date: "Há 2 dias",
    comment: "Contratei serviço de jardinagem e fiquei impressionado com o resultado. Meu jardim nunca esteve tão bonito! Profissionais experientes e dedicados.",
    useImage: true
  },
  {
    name: "Juliana Costa",
    service: "Eletricista",
    rating: 5,
    date: "Há 1 semana",
    comment: "Precisava de um eletricista com urgência e encontrei através da plataforma. Resolveu o problema rapidamente e com preço justo. Recomendo!",
    useImage: true
  },
  {
    name: "Fernando Alves",
    service: "Encanador",
    rating: 5,
    date: "Há 3 dias",
    comment: "Excelente profissional! Vazamento resolvido em minutos. Atendimento rápido, eficiente e preço honesto. Com certeza voltarei a contratar.",
    useImage: true
  },
  {
    name: "Patrícia Rocha",
    service: "Abertura de Empresas",
    rating: 5,
    date: "Há 5 dias",
    comment: "Abri minha MEI com total suporte da equipe. Processo rápido e sem burocracia. Já estou operando e muito satisfeita com o atendimento!",
    useImage: true
  },
  {
    name: "Lucas Ferreira",
    service: "Consultoria Empresarial",
    rating: 5,
    date: "Há 1 semana",
    comment: "A consultoria me ajudou a organizar processos e melhorar a gestão da empresa. Resultados visíveis em pouco tempo. Investimento que valeu muito a pena!",
    useImage: true
  },
  {
    name: "Beatriz Souza",
    service: "Arquitetura",
    rating: 5,
    date: "Há 2 semanas",
    comment: "Projeto arquitetônico incrível para minha casa! A profissional entendeu exatamente o que eu queria. Ficou lindo e funcional. Recomendo muito!",
    useImage: true
  },
  {
    name: "Ricardo Martins",
    service: "Manutenção Predial",
    rating: 5,
    date: "Há 6 dias",
    comment: "Serviço completo de manutenção no meu prédio. Equipe organizada, pontual e muito eficiente. Preço justo e trabalho de qualidade!",
    useImage: true
  },
  {
    name: "Camila Rodrigues",
    service: "Personal Trainer",
    rating: 5,
    date: "Há 3 dias",
    comment: "Encontrei um personal excelente através da plataforma! Treinos personalizados e resultados incríveis. Muito profissionalismo e dedicação!",
    useImage: true
  },
  {
    name: "André Oliveira",
    service: "Motorista Particular",
    rating: 5,
    date: "Há 1 dia",
    comment: "Precisava de um motorista confiável para viagem e encontrei profissional ótimo. Pontual, educado e dirigiu com muita segurança. Excelente!",
    useImage: true
  },
  {
    name: "Gabriela Santos",
    service: "Fotografia",
    rating: 5,
    date: "Há 4 dias",
    comment: "Contratei fotógrafo para evento e as fotos ficaram maravilhosas! Profissional criativo e atencioso. Capturou cada momento perfeitamente!",
    useImage: true
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
            plugins={[
              Autoplay({
                delay: 3000,
              })
            ]}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/3">
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {testimonial.useImage ? (
                          <img 
                            src={logoVR} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-bold text-primary">
                            {testimonial.name[0]}
                          </span>
                        )}
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
