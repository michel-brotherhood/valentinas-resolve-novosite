import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Shield } from "lucide-react";

export const ProfessionalCallout = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🌟 Mais do que vender produtos, o Valentinas Resolve transforma profissionais
            </h2>
          </div>

          {/* Content */}
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                O Valentinas Resolve acredita que todo serviço tem valor — e que quem executa deve ser reconhecido como um verdadeiro profissional.
                Por isso, o nosso e-commerce vai além da venda de produtos e equipamentos: ele faz parte de um projeto maior, de profissionalização e valorização dos prestadores de serviço.
              </p>

              <p>
                Cada produto disponível aqui foi pensado para elevar o padrão do trabalho, proporcionando mais eficiência, segurança e credibilidade para quem atende.
                Queremos que o prestador de serviços veja o seu ofício não apenas como uma tarefa, mas como um negócio próprio, com ferramentas de qualidade, identidade e propósito.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-foreground font-semibold text-lg mb-2">
                  💼 Aqui, cada compra é um investimento na sua carreira.
                </p>
                <p>
                  Seja uma faxineira, um mecânico, um cabeleireiro ou um jardineiro — todos têm um papel essencial e merecem atuar com excelência e reconhecimento.
                </p>
              </div>

              <p className="font-medium text-foreground">
                O Valentinas Resolve nasceu para profissionalizar o mercado de serviços, oferecendo estrutura, apoio e produtos que refletem o compromisso com qualidade, respeito e evolução.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-4 gap-6 mt-12 mb-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Mais Clientes</h3>
                <p className="text-sm text-muted-foreground">Acesso a milhares de clientes</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Mais Renda</h3>
                <p className="text-sm text-muted-foreground">Aumente seus ganhos</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Suporte Contínuo</h3>
                <p className="text-sm text-muted-foreground">Equipe dedicada</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Profissionalismo</h3>
                <p className="text-sm text-muted-foreground">Ferramentas de qualidade</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="shadow__btn"
                onClick={() => navigate('/trabalhe-conosco')}
              >
                Trabalhe Conosco
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
