import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import andressa from "@/assets/team/andressa.jpg";

const services = [
  {
    icon: FileText,
    title: "Abertura de CNPJ",
    description: "Processo completo de abertura e regularização da sua empresa",
  },
  {
    icon: Calculator,
    title: "Planejamento Tributário",
    description: "Estratégias para redução legal da carga tributária",
  },
  {
    icon: TrendingUp,
    title: "Consultoria Fiscal",
    description: "Assessoria especializada para otimização fiscal",
  },
  {
    icon: Shield,
    title: "Conformidade Legal",
    description: "Garantia de conformidade com todas as obrigações fiscais",
  },
  {
    icon: Clock,
    title: "Relatórios Mensais",
    description: "Relatórios financeiros detalhados e análises",
  },
  {
    icon: Users,
    title: "Folha de Pagamento",
    description: "Gestão completa de folha e encargos trabalhistas",
  },
];

const benefits = [
  "Redução de até 40% nos custos tributários",
  "Relatórios mensais detalhados",
  "Atendimento personalizado",
  "Conformidade total com a legislação",
  "Suporte contínuo e consultoria",
  "Tecnologia de ponta em gestão fiscal",
];

export default function Accounting() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-black to-primary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Contabilidade Integrada
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Simplifique sua gestão financeira com serviços contábeis completos e personalizados
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold">
                Agende uma Consulta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Accountant Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Card className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img
                      src={andressa}
                      alt="Andressa Mello - Contadora Responsável"
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Andressa Mello
                    </h2>
                    <p className="text-lg text-primary font-semibold mb-4">
                      Contadora Responsável - CRC 12345/O
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Com mais de 15 anos de experiência em gestão contábil e tributária, 
                      Andressa lidera nossa equipe de contabilidade com excelência e dedicação. 
                      Especialista em planejamento tributário e conformidade fiscal para pequenas 
                      e médias empresas.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Planejamento Tributário
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Consultoria Fiscal
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Gestão Financeira
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Nossos Serviços Contábeis
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Por que escolher nossa contabilidade?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Oferecemos soluções contábeis completas que ajudam sua empresa 
                  a crescer de forma sustentável e em conformidade com a legislação.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Comece Hoje Mesmo
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                      1
                    </div>
                    <p className="text-foreground">Agende uma consulta gratuita</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                      2
                    </div>
                    <p className="text-foreground">Análise personalizada do seu negócio</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                      3
                    </div>
                    <p className="text-foreground">Implementação e acompanhamento contínuo</p>
                  </div>
                </div>
                <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-black font-bold">
                  Solicitar Consulta Gratuita
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para otimizar sua gestão contábil?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold">
                Falar no WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Ver Todos os Serviços
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
