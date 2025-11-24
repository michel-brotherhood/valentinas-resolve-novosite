import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
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
  Globe,
  Phone
} from "lucide-react";
import andressa from "@/assets/team/andressa.jpg";
import heroBg from "@/assets/accounting-hero-bg.jpg";
import differentialsBg from "@/assets/accounting-differentials-bg.jpg";
import differentialsParallaxBg from "@/assets/accounting-differentials-parallax.jpg";
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
    description: "Equipe liderada por Andressa Melo"
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
  const navigate = useNavigate();
  const section1 = useScrollReveal();
  const section2 = useScrollReveal();
  const section3 = useScrollReveal();
  const section4 = useScrollReveal();
  const section5 = useScrollReveal();
  const section6 = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FloatingChat whatsappNumber="351961803400" />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative py-16 md:py-24 overflow-hidden parallax-section" style={{ backgroundImage: 'url(/videos/accounting-hero.mp4)' }}>
          <div className="absolute inset-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/accounting-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Contact Info - Phone Icon Only */}
              <div className="flex items-center justify-center gap-2 mb-6 text-white/90">
                <a 
                  href="https://wa.me/351961803400?text=Olá! Gostaria de falar com a contadora responsável sobre a Contabilidade Integrada Valentinas." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  aria-label="Entrar em contato via WhatsApp"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
                Transforme sua contabilidade em uma vantagem competitiva.
              </h1>
              <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                Contabilidade Integrada Valentinas — tecnologia, estratégia e precisão para quem pensa grande.
              </p>
              <button 
                className="glow-button text-sm md:text-base px-6 md:px-8"
                onClick={() => {
                  navigate('/formulario-contabilidade');
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                }}
              >
                <span className="hidden md:inline">Quero minha contabilidade integrada</span>
                <span className="md:hidden">Quero minha<br />contabilidade integrada</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bloco 1 - Para Profissionais */}
        <section id="professionals" className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/20">
          <div ref={section1.elementRef} className={`scroll-reveal ${section1.isVisible ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 px-4">
                  Contabilidade Integrada para Profissionais
                </h2>
                <p className="text-lg md:text-xl text-primary font-semibold mb-3 md:mb-4 px-4">
                  Você foca no serviço. Nós cuidamos de impostos, notas e conformidade.
                </p>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                  Organizamos sua rotina fiscal do zero: enquadramento, notas, guias e relatórios simples que mostram o que entra, o que sai e quanto você precisa recolher — sem fricção.
                </p>
              </div>

              <Card className="p-4 md:p-8 mb-6 md:mb-8 bg-card/50 backdrop-blur border-primary/20">
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  {professionalServices.map((service, index) => (
                    <div key={index} className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base text-foreground">{service}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 shadow__btn text-sm md:text-base"
                  onClick={() => {
                    navigate('/formulario-contabilidade');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                >
                  <span className="hidden md:inline">Fale com a Andressa</span>
                  <span className="md:hidden">Fale com<br />a Andressa</span>
                </Button>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Bloco 2 - Para Empresas e Pessoas Físicas */}
        <section id="business" className="py-12 md:py-20 bg-secondary/30">
          <div ref={section2.elementRef} className={`scroll-reveal ${section2.isVisible ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 px-4">
                  Para Empresas e Pessoas Físicas
                </h2>
                <p className="text-xl text-primary font-semibold mb-4">
                  Contabilidade que antecipa riscos e transforma dados em decisão.
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                  Da escrituração à estratégia, entregamos compliance total e gestão contábil contínua para empresas, e atendimento completo para pessoas físicas, com foco em organização patrimonial, planejamento tributário e regularização fiscal — tudo dentro do ecossistema Valentinas.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Para Empresas e MEIs */}
                <Card className="p-4 md:p-6 bg-card/50 backdrop-blur card-3d border-primary/10 hover:border-primary/30">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    <h3 className="text-base md:text-xl font-bold text-foreground">Para Empresas e MEIs</h3>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {businessServices.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs md:text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Para Autônomos */}
                <Card className="p-4 md:p-6 bg-card/50 backdrop-blur card-3d border-primary/10 hover:border-primary/30">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Calculator className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    <h3 className="text-base md:text-xl font-bold text-foreground">Para Autônomos</h3>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {autonomousServices.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs md:text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Para Pessoas Físicas */}
                <Card className="p-4 md:p-6 bg-card/50 backdrop-blur card-3d border-primary/10 hover:border-primary/30">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <UserCheck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    <h3 className="text-base md:text-xl font-bold text-foreground">Para Pessoas Físicas</h3>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {individualServices.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs md:text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 shadow__btn text-sm md:text-base"
                  onClick={() => {
                    navigate('/formulario-contabilidade');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                >
                  <span className="hidden md:inline">Contratar agora</span>
                  <span className="md:hidden">Contratar<br />agora</span>
                </Button>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Bloco 3 - Diferenciais */}
        <section id="differentials" className="py-12 md:py-16 relative bg-cover bg-center bg-fixed parallax-section" style={{ backgroundImage: `url(${differentialsParallaxBg})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/80" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-3 md:mb-4 px-4">
                Diferenciais que aceleram resultados
              </h2>
              <div className="h-1 w-24 bg-primary mx-auto mb-6 md:mb-10" />
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-10">
                {differentials.map((differential, index) => (
                  <Card 
                    key={index} 
                    className="p-4 md:p-6 bg-card/95 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-3 md:mb-4 transition-all">
                      <differential.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2">
                      {differential.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {differential.description}
                    </p>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 shadow__btn text-sm md:text-base"
                  onClick={() => {
                    navigate('/formulario-contabilidade');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                >
                  <span className="hidden md:inline">Solicitar Orçamento</span>
                  <span className="md:hidden">Solicitar<br />Orçamento</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 4 - Depoimentos */}
        <section id="testimonials" className="py-12 md:py-20 bg-secondary/20">
          <div ref={section4.elementRef} className={`scroll-reveal ${section4.isVisible ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-8 md:mb-12 px-4">
                O que nossos clientes dizem
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-4 md:p-6 bg-card/50 backdrop-blur card-3d border-primary/10 hover:border-primary/30">
                    <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="border-t border-border pt-3 md:pt-4">
                      <p className="text-sm md:text-base font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-xs md:text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Bloco 4.5 - FAQ */}
        <section id="faq" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
          <div ref={section5.elementRef} className={`scroll-reveal ${section5.isVisible ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-12">
                Perguntas Frequentes
              </h2>
              
              <div className="space-y-4">
                <Card className="p-6 bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 card-3d">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    Como funciona a contabilidade para MEI?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Para MEIs, cuidamos de toda a parte fiscal: emissão de notas fiscais, guias DAS mensais, 
                    relatórios de receitas e despesas, e a declaração anual (DASN-SIMEI). Mantemos seu 
                    enquadramento sempre regular e enviamos alertas de vencimentos.
                  </p>
                </Card>

                <Card className="p-6 bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 card-3d">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    O que está incluído na Declaração de IRPF?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Realizamos a apuração completa do Imposto de Renda Pessoa Física, incluindo rendimentos, 
                    despesas dedutíveis, bens e direitos, dívidas e ônus reais. Identificamos oportunidades 
                    de dedução legal e garantimos conformidade total com a Receita Federal.
                  </p>
                </Card>

                <Card className="p-6 bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 card-3d">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    Como funciona a folha de pagamento e eSocial?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Processamos a folha de pagamento completa (admissões, rescisões, férias, 13º salário) 
                    e enviamos todos os eventos ao eSocial dentro dos prazos legais. Geramos guias de FGTS, 
                    INSS e garantimos conformidade total com a legislação trabalhista.
                  </p>
                </Card>

                <Card className="p-6 bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 card-3d">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    Qual a diferença entre MEI, EI e LTDA?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    MEI é para faturamento até R$ 81 mil/ano com tributação simplificada. EI (Empresário Individual) 
                    não tem limite de faturamento mas responde com bens pessoais. LTDA tem sócios e patrimônio 
                    separado da pessoa física. Analisamos seu caso e indicamos o melhor enquadramento.
                  </p>
                </Card>

                <Card className="p-6 bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 card-3d">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    Como funciona o Carnê-Leão para autônomos?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Autônomos que recebem de pessoas físicas devem recolher o imposto mensalmente via Carnê-Leão. 
                    Calculamos o valor devido, emitimos as DARFs, controlamos receitas e despesas profissionais, 
                    e mantemos tudo organizado para a declaração anual.
                  </p>
                </Card>

                <Card className="p-6 bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 card-3d">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    Quanto tempo leva para abrir uma empresa?
                  </h3>
                  <p className="text-muted-foreground pl-7">
                    Com nosso processo otimizado, a abertura de MEI leva de 1 a 3 dias úteis. Para EI e LTDA, 
                    o prazo médio é de 7 a 15 dias úteis, dependendo da cidade e atividade. Cuidamos de todo 
                    o processo: registro, alvarás, inscrições e configuração fiscal.
                  </p>
                </Card>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Contadora Responsável */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div ref={section6.elementRef} className={`scroll-reveal ${section6.isVisible ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 card-3d">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/20">
                    <img
                      src={andressa}
                      alt="Andressa Melo - Contadora Responsável"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Andressa Melo
                    </h3>
                    <p className="text-primary font-semibold mb-3">
                      CRC RO-010414/O-5
                    </p>
                    <p className="text-muted-foreground mb-4">
                      9 anos de experiência em contabilidade empresarial e fiscal. 
                      Andressa lidera nossa equipe oferecendo atendimento personalizado e soluções sob medida.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          </div>
        </section>

        {/* Bloco 5 - CTA Final */}
        <section id="cta" className="py-16 md:py-24 relative overflow-hidden parallax-section" style={{ backgroundImage: `url(${ctaBg})` }}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
                Conte com a Contabilidade Integrada Valentinas e eleve seu negócio a outro nível.
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 px-4">
                A Contabilidade Integrada Valentinas é uma marca de excelência contábil 100% brasileira, criada para gerar autonomia e crescimento real aos clientes, profissionais e empresas conectadas ao ecossistema Valentinas Resolve.
              </p>
              <Button 
                size="lg"
                className="h-12 md:h-14 px-6 md:px-8 shadow__btn text-sm md:text-base"
                onClick={() => {
                  navigate('/formulario-contabilidade');
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                }}
              >
                <span className="hidden md:inline">Quero saber mais</span>
                <span className="md:hidden">Quero<br />saber mais</span>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
