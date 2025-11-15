import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Target, Award, TrendingUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroBg from "@/assets/hero-bg.jpg";

export default function About() {
  const { elementRef, isVisible } = useScrollReveal();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Parallax Background */}
        <section className="relative bg-black overflow-hidden py-32 md:py-40">
          {/* Parallax Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundAttachment: 'fixed',
              opacity: 0.3
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Sobre a Valentina's Resolve
              </h1>
              <p className="text-xl md:text-2xl text-white/90 animate-fade-in">
                Negócios que conectam. Resultados que transformam.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div 
              ref={elementRef}
              className={`max-w-4xl mx-auto transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Card className="p-6 md:p-12 mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Conheça a Valentina's Resolve
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg">
                    A Valentina's Resolve é uma startup brasileira de tecnologia e intermediação de serviços, 
                    criada com o propósito de conectar pessoas, negócios e soluções em um único ambiente digital.
                  </p>
                  <p className="text-lg">
                    Nossa plataforma reúne mais de 200 tipos de serviços, integrando profissionais qualificados 
                    em diversas áreas — desde o atendimento doméstico até demandas empresariais especializadas.
                  </p>
                  <p className="text-lg">
                    Acreditamos que a tecnologia pode simplificar a forma como pessoas e empresas encontram 
                    as soluções que precisam, criando conexões autênticas e resultados transformadores.
                  </p>
                </div>
              </Card>

              {/* Values Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card className="p-6">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Equipe Especializada
                  </h3>
                  <p className="text-muted-foreground">
                    Profissionais treinados, experientes e comprometidos com a excelência 
                    em cada serviço prestado.
                  </p>
                </Card>

                <Card className="p-6">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Qualidade Garantida
                  </h3>
                  <p className="text-muted-foreground">
                    Satisfação do cliente em primeiro lugar com garantia total em todos 
                    os nossos serviços.
                  </p>
                </Card>

                <Card className="p-6">
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Pontualidade
                  </h3>
                  <p className="text-muted-foreground">
                    Sempre no horário combinado, respeitando seu tempo e sua rotina diária.
                  </p>
                </Card>

                <Card className="p-6">
                  <TrendingUp className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Nossa Missão
                  </h3>
                  <p className="text-muted-foreground">
                    Proporcionar soluções personalizadas que superem expectativas e criem 
                    experiências memoráveis para nossos clientes.
                  </p>
                </Card>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Clientes Satisfeitos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">200+</div>
                  <div className="text-muted-foreground">Tipos de Serviços</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <div className="text-muted-foreground">Profissionais</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Taxa de Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para transformar sua casa ou negócio?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato agora e receba um orçamento personalizado sem compromisso
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-black font-bold"
              onClick={() => navigate('/contratar-servico')}
            >
              Contratar Profissional Agora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
