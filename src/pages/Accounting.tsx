import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Calculator, 
  TrendingUp, 
  Shield, 
  CheckCircle2,
  Users,
  Zap,
  Target,
  Lock,
  Clock,
  UserCheck,
  Sparkles,
  Globe
} from "lucide-react";
import andressa from "@/assets/team/andressa.jpg";
import heroBg from "@/assets/accounting-hero-bg.jpg";
import differentialsBg from "@/assets/accounting-differentials-bg.jpg";
import ctaBg from "@/assets/accounting-cta-bg.jpg";

const professionalServices = [
  "Enquadramento fiscal adequado",
  "Emissão de notas fiscais",
  "Guias de recolhimento (DAS, GPS, DARF)",
  "Relatórios mensais simplificados",
  "Controle de receitas e despesas",
  "Alertas de vencimentos"
];

const businessServices = [
  "Abertura ou regularização de empresa (MEI, EI, LTDA)",
  "Contabilidade mensal completa",
  "Folha de pagamento e eSocial",
  "Consultoria contábil e planejamento tributário",
  "Regularização fiscal / emissão de CNDs",
  "Relatórios financeiros e acompanhamento de resultados"
];

const autonomousServices = [
  "Cadastro e regularização como contribuinte autônomo (INSS / Carnê-Leão)",
  "Apuração mensal e emissão de DARF (Carnê-Leão)",
  "Controle de receitas e despesas profissionais",
  "Declaração de Imposto de Renda (pessoa física com atividade autônoma)",
  "Orientação tributária e previdenciária individual"
];

const individualServices = [
  "Declaração de Imposto de Renda Pessoa Física (IRPF)",
  "Regularização de CPF e pendências na Receita Federal",
  "Consultoria patrimonial e planejamento financeiro pessoal"
];

const differentials = [
  {
    icon: Zap,
    title: "Tecnologia",
    description: "Integrações e automação de rotinas"
  },
  {
    icon: Target,
    title: "Precisão",
    description: "Processos auditáveis e conferências em 2 etapas"
  },
  {
    icon: TrendingUp,
    title: "Estratégia",
    description: "Relatórios que viram ação, não só números"
  },
  {
    icon: Shield,
    title: "Compliance Total",
    description: "eSocial, Reinf e FGTS Digital em dia"
  },
  {
    icon: Users,
    title: "Atendimento Humano",
    description: "Equipe liderada por Andressa Mello"
  },
  {
    icon: Clock,
    title: "Onboarding Rápido",
    description: "Checklist simples e kick-off guiado"
  },
  {
    icon: UserCheck,
    title: "Transparência",
    description: "Linha do tempo de entregas e prazos"
  },
  {
    icon: Globe,
    title: "Brasil Inteiro",
    description: "Operação 100% digital e segura"
  }
];

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Profissional Autônomo",
    text: "A Contabilidade Integrada Valentinas transformou a forma como gerencio minhas obrigações fiscais. Agora tenho mais tempo para focar no meu trabalho."
  },
  {
    name: "Mariana Silva",
    role: "Empresária",
    text: "Compliance total e relatórios que realmente ajudam a tomar decisões estratégicas. Equipe extremamente competente e atenciosa."
  },
  {
    name: "Rafael Oliveira",
    role: "MEI",
    text: "Processo de abertura foi rápido e sem complicações. O suporte contínuo faz toda a diferença no dia a dia."
  }
];

export default function Accounting() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Transforme sua contabilidade em uma vantagem competitiva.
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Contabilidade Integrada Valentinas — tecnologia, estratégia e precisão para quem pensa grande.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-8 py-6 h-auto shadow-[0_0_30px_rgba(255,204,0,0.3)] hover:shadow-[0_0_40px_rgba(255,204,0,0.5)] transition-all"
                onClick={() => window.location.href = '/formulario-contabilidade'}
              >
                Quero minha contabilidade integrada
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Bloco 1 - Para Profissionais */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Contabilidade Integrada para Profissionais
                </h2>
                <p className="text-xl text-primary font-semibold mb-4">
                  Você foca no serviço. Nós cuidamos de impostos, notas e conformidade.
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Organizamos sua rotina fiscal do zero: enquadramento, notas, guias e relatórios simples que mostram o que entra, o que sai e quanto você precisa recolher — sem fricção.
                </p>
              </div>

              <Card className="p-8 mb-8 bg-card/50 backdrop-blur border-primary/20">
                <div className="grid md:grid-cols-2 gap-4">
                  {professionalServices.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-foreground">{service}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-black font-bold"
                  onClick={() => window.location.href = '/formulario-contabilidade'}
                >
                  Assinar agora
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 2 - Para Empresas e Pessoas Físicas */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Para Empresas e Pessoas Físicas
                </h2>
                <p className="text-xl text-primary font-semibold mb-4">
                  Contabilidade que antecipa riscos e transforma dados em decisão.
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                  Da escrituração à estratégia, entregamos compliance total e gestão contábil contínua para empresas, e atendimento completo para pessoas físicas, com foco em organização patrimonial, planejamento tributário e regularização fiscal — tudo dentro do ecossistema Valentinas.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Para Empresas e MEIs */}
                <Card className="p-6 bg-card/50 backdrop-blur hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Para Empresas e MEIs</h3>
                  </div>
                  <ul className="space-y-3">
                    {businessServices.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Para Autônomos */}
                <Card className="p-6 bg-card/50 backdrop-blur hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Para Autônomos</h3>
                  </div>
                  <ul className="space-y-3">
                    {autonomousServices.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Para Pessoas Físicas */}
                <Card className="p-6 bg-card/50 backdrop-blur hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <UserCheck className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Para Pessoas Físicas</h3>
                  </div>
                  <ul className="space-y-3">
                    {individualServices.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-black font-bold"
                  onClick={() => window.location.href = '/formulario-contabilidade'}
                >
                  Contratar plano
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 3 - Diferenciais */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={differentialsBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/75" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-12">
                Diferenciais que aceleram resultados
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {differentials.map((differential, index) => (
                  <Card 
                    key={index} 
                    className="p-6 bg-card/30 backdrop-blur border-primary/10 hover:border-primary/30 hover:bg-card/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <differential.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {differential.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {differential.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 4 - Depoimentos */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-12">
                O que nossos clientes dizem
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 bg-card/50 backdrop-blur">
                    <p className="text-muted-foreground mb-4 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contadora Responsável */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/20">
                    <img
                      src={andressa}
                      alt="Andressa Mello - Contadora Responsável"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Andressa Mello
                    </h3>
                    <p className="text-primary font-semibold mb-3">
                      Contadora Responsável - CRC 12345/O
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Especialista em contabilidade empresarial e fiscal, com mais de 15 anos de experiência. 
                      Andressa lidera nossa equipe oferecendo atendimento personalizado e soluções sob medida.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Bloco 5 - CTA Final */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={ctaBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Conte com a Contabilidade Integrada Valentinas e eleve seu negócio a outro nível.
              </h2>
              <p className="text-lg text-white/90 mb-8">
                A Contabilidade Integrada Valentinas é uma marca de excelência contábil 100% brasileira, criada para gerar autonomia e crescimento real aos clientes, profissionais e empresas conectadas ao ecossistema Valentinas Resolve.
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-8 py-6 h-auto shadow-[0_0_30px_rgba(255,204,0,0.3)] hover:shadow-[0_0_40px_rgba(255,204,0,0.5)] transition-all"
                onClick={() => window.open('https://wa.me/5500000000000?text=Olá! Gostaria de falar com a contadora responsável sobre a Contabilidade Integrada Valentinas.', '_blank')}
              >
                Falar com a contadora responsável
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
