import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import andressa from "@/assets/team/andressa.jpg";
import daiane from "@/assets/team/daiane.jpg";
import kellen from "@/assets/team/kellen.jpg";

const teamMembers = [
  {
    name: "Daiane Amaral",
    role: "Fundadora & CEO",
    credential: "",
    image: daiane,
    bio: `Fundadora e CEO da Valentina's Resolve, Daiane Amaral lidera o desenvolvimento estratégico da plataforma, unindo visão empreendedora, inovação e foco em excelência. Com experiência internacional na Espanha, Bélgica e Portugal, construiu uma trajetória sólida nas áreas de Gestão da Qualidade, liderança e eficiência operacional.

Formada em Sistema de Gestão da Qualidade e atualmente cursando Direito, atuou por mais de 10 anos em uma empresa de inspeção veicular acreditada pelo INMETRO, desenvolvendo expertise em processos, conformidade, melhoria contínua e gestão de equipes.

Além da liderança na Valentina's Resolve, Daiane é também proprietária da Amaral Serviços, empresa sediada em Portugal que atua nos segmentos de limpeza, manutenção e gestão operacional, reforçando sua experiência empresarial em ambientes multiculturais e sua capacidade de coordenar equipes e processos com alta performance.

Daiane aplica sua visão estratégica, experiência multicultural e forte capacidade analítica para fortalecer a Valentina's Resolve e criar conexões eficientes entre profissionais e clientes, impulsionando o crescimento sustentável da plataforma.`,
    specialties: ["Gestão da Qualidade", "Liderança Internacional", "Eficiência Operacional", "Desenvolvimento Estratégico"],
  },
  {
    name: "Andressa Melo",
    role: "Cofundadora, CFO & Líder da Contabilidade Integrada",
    credential: "CRC: RO-010414/O-5",
    image: andressa,
    bio: `Cofundadora e CFO da Valentina's Resolve, Andressa Melo atua na estruturação estratégica e financeira da plataforma, unindo conhecimento contábil, visão analítica e foco em eficiência operacional. Formada em Ciências Contábeis e atuante na área desde 2017, desenvolveu expertise sólida em gestão financeira, contabilidade empresarial, planejamento tributário e suporte a empresas de diversos portes e segmentos.

Empreendedora desde 2020, fundou seu próprio escritório contábil, consolidando experiência em soluções orientadas ao crescimento sustentável e à organização financeira. Na Valentina's Resolve, além de liderar o setor financeiro, é também responsável pela área de Contabilidade Integrada, conectando profissionais e empresas com processos precisos, compliance e inteligência contábil aplicada.

Comprometida com transparência, eficiência e excelência, Andressa fortalece a operação e a visão de longo prazo da plataforma, contribuindo diretamente para a expansão e consolidação do ecossistema Valentina's.`,
    specialties: ["Gestão Financeira", "Planejamento Tributário", "Contabilidade Empresarial", "Compliance"],
  },
  {
    name: "Kellen Amaral",
    role: "Cofundadora & COO",
    credential: "",
    image: kellen,
    bio: `Cofundadora e COO da Valentina's Resolve, Kellen Amaral atua na gestão operacional da plataforma, garantindo eficiência, qualidade e excelência no atendimento. Com experiência em liderança de equipes, hotelaria e serviços, desenvolveu sólida competência em organização, processos, gestão de pessoas e execução estratégica.

Iniciou sua trajetória profissional aos 17 anos em empreendimentos familiares, construindo uma base consistente em responsabilidade, gestão e tomada de decisão. Formada como cuidadora de idosos, com cursos na área de saúde e experiência internacional em Portugal, aprimorou sua capacidade de coordenar equipes com empatia, clareza e alto padrão de entrega.

Além da atuação na Valentina's Resolve, é sócia da Amaral Serviços, empresa de limpeza e manutenção em Portugal, onde reforçou sua expertise em operações, supervisão de equipes e relacionamento com clientes.

Na Valentina's Resolve, Kellen é responsável por alinhar processos, padronizar operações e garantir que a experiência de profissionais e clientes seja ágil, segura e eficiente, contribuindo diretamente para o crescimento e consolidação do ecossistema da plataforma.`,
    specialties: ["Gestão de Operações", "Liderança de Equipes", "Processos e Qualidade", "Experiência Internacional"],
  },
];

export default function TeamPage() {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative bg-black overflow-hidden min-h-[400px] md:min-h-[450px] flex items-center">
          {/* Video Background */}
          <div className="absolute inset-0 opacity-40">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/team-hero.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          
          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Nossa Equipe
              </h1>
              <p className="text-xl md:text-2xl text-white/90 animate-fade-in">
                Conheça as fundadoras da Valentina's Resolve
              </p>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div 
              ref={elementRef}
              className={`grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden mb-6 border-4 border-primary/20 shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 text-center">
                      {member.name}
                    </h3>
                    <p className="text-base md:text-lg text-primary font-semibold mb-1 text-center">
                      {member.role}
                    </p>
                    {member.credential && (
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        {member.credential}
                      </p>
                    )}
                    <p className="text-sm md:text-base text-muted-foreground mb-6 text-left whitespace-pre-line leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
