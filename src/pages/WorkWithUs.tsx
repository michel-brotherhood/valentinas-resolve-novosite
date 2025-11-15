import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/work-with-us-hero.jpg";

export default function WorkWithUs() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Trabalhe Conosco
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Junte-se a centenas de profissionais e expanda seu negócio com a Valentina's Resolve
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-black font-bold"
                onClick={() => navigate('/registro-profissional')}
              >
                Cadastre-se como Profissional
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Por que se cadastrar na nossa plataforma?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Mais Clientes
                  </h3>
                  <p className="text-muted-foreground">
                    Acesso a milhares de clientes potenciais procurando seus serviços
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Mais Renda
                  </h3>
                  <p className="text-muted-foreground">
                    Aumente seus ganhos com um fluxo constante de trabalhos
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Suporte Contínuo
                  </h3>
                  <p className="text-muted-foreground">
                    Equipe dedicada para ajudar você a ter sucesso
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Flexibilidade
                  </h3>
                  <p className="text-muted-foreground">
                    Trabalhe nos seus próprios horários e escolha seus projetos
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Como Funciona
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Cadastro Simples
                    </h3>
                    <p className="text-muted-foreground">
                      Preencha o formulário com suas informações profissionais, 
                      experiência e documentos necessários.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Verificação e Aprovação
                    </h3>
                    <p className="text-muted-foreground">
                      Nossa equipe analisa seu perfil e documentos para garantir 
                      a qualidade dos serviços.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Receba Solicitações
                    </h3>
                    <p className="text-muted-foreground">
                      Comece a receber solicitações de clientes interessados nos 
                      seus serviços.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Trabalhe e Cresça
                    </h3>
                    <p className="text-muted-foreground">
                      Execute os serviços, receba avaliações e construa sua reputação 
                      na plataforma.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Requisitos
              </h2>
              
              <Card className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">
                      Experiência comprovada na área de atuação
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">
                      Documentação regular (CPF, comprovante de residência)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">
                      Disponibilidade para atender clientes na região
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">
                      Compromisso com qualidade e pontualidade
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">
                      Certificações relevantes (quando aplicável)
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para expandir seu negócio?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Cadastre-se agora e comece a receber solicitações de clientes ainda hoje
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-black font-bold"
              onClick={() => navigate('/registro-profissional')}
            >
              Iniciar Cadastro
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
