import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import andressa from "@/assets/team/andressa.jpg";
import daiane from "@/assets/team/daiane.jpg";
import janaina from "@/assets/team/janaina.jpg";
import kellen from "@/assets/team/kellen.jpg";

const teamMembers = [
  {
    name: "Daiane Amaral",
    role: "Fundadora e Diretora de Serviços",
    credential: "",
    image: daiane,
    bio: `Desde jovem, sempre busquei novas oportunidades e o aprendizado de diferentes culturas. Aos 18 anos, decidi emigrar para a Espanha, onde vivi por três anos e meio. Essa experiência foi um marco no meu crescimento pessoal e profissional.

Ao retornar ao Brasil, me formei em Sistema de Gestão da Qualidade. Durante mais de 10 anos, trabalhei em um grupo de inspeção veicular acreditado pelo INMETRO, iniciando como recepcionista e me apaixonando pela área de gestão da qualidade. Atuei em diferentes estados do Brasil, compreendendo profundamente como processos bem estruturados podem transformar organizações.

Em 2018, fui para a Bélgica por dois anos e meio. Hoje, moro em Portugal, onde trabalho na área de hotelaria como Housekeeping Lead e curso Direito. Junto com minha irmã Kellen Amaral e Andressa Melo, fundamos a Valentina's Resolve, uma plataforma que conecta clientes e profissionais de maneira simples e eficiente.

Com 37 anos, estou comprometida em impactar positivamente a vida das pessoas, criando soluções com excelência, resiliência e transformação. Como fundadora, tenho a oportunidade de unir minha paixão por ajudar as pessoas com a visão de criar uma comunidade baseada em confiança e excelência.`,
    specialties: ["Gestão de Qualidade", "Liderança", "Processos"],
  },
  {
    name: "Andressa Ferreira Melo",
    role: "Sócia e Contadora Responsável Técnica",
    credential: "Contadora desde 2018",
    image: andressa,
    bio: `Tenho 33 anos e sou natural de Cacoal, Rondônia. Sou formada em Ciências Contábeis desde 2018 e atuo na área contábil desde 2017. Desde o início de minha trajetória profissional, sempre me identifiquei com o ramo contábil, com um interesse genuíno em entender e solucionar questões que envolvem o comércio e a gestão das empresas.

Em 2020, tomei a decisão de empreender na área contábil, iniciando meu próprio escritório. Desde então, tenho dedicado minha carreira ao apoio a empresas de diversos portes e segmentos, oferecendo soluções financeiras de qualidade e sempre com foco no crescimento e na sustentabilidade dos negócios.

A oportunidade de integrar a equipe da Valentina's Resolve surgiu como uma extensão natural do meu desejo de impactar o mercado com soluções inovadoras. Juntamente com minhas sócias Kellen Amaral, Daiane Amaral e Janaína Bessa, estamos comprometidas em transformar a forma de intermediação de serviços entre profissionais e clientes.

Acredito no potencial da Valentina's e no alcance dos nossos objetivos. Estamos motivadas com a jornada que estamos trilhando e com a missão de entregar aos nossos clientes um serviço de excelência, baseado na transparência, eficiência e comprometimento.`,
    specialties: ["Planejamento Tributário", "Consultoria Fiscal", "Gestão Financeira"],
  },
  {
    name: "Janaína Pimenta",
    role: "Sócia e Atendimento ao Cliente",
    credential: "",
    image: janaina,
    bio: `Meu nome é Janaína Pimenta, tenho 32 anos e resido em Cacoal, Rondônia. Concluí o ensino médio e iniciei a graduação em Marketing, área pela qual me interesso e que contribui para ampliar minha visão estratégica e empreendedora.

Minha trajetória profissional passou por diferentes experiências. Atuei como freelancer na Contável Contabilidade, o que me proporcionou aprendizado e abriu portas para novos projetos. Atualmente, sou sócia do Valentinas Resolve, empresa que administro em parceria com Andressa Mello, Daiane Amaral e Kellen Amaral, oferecendo soluções práticas e confiáveis para diferentes demandas.

Paralelamente, colaboro no negócio da minha família, junto ao meu pai, e também apoio as atividades de transporte rodoviário realizadas pelo meu esposo, que atua com caminhão próprio.

Sou uma pessoa dedicada, organizada e comprometida, que valoriza a família e alia responsabilidade, profissionalismo e espírito empreendedor em cada etapa da vida.`,
    specialties: ["Gestão de Operações", "Atendimento ao Cliente", "Desenvolvimento"],
  },
  {
    name: "Kellen Amaral",
    role: "Sócia e Diretora de Operações",
    credential: "",
    image: kellen,
    bio: `Kellen Amaral é uma empreendedora dedicada, determinada e movida pelo propósito de transformar desafios em oportunidades. Desde os 17 anos, iniciou sua trajetória profissional ao lado da família, participando de diferentes empreendimentos e desenvolvendo, desde cedo, um forte senso de responsabilidade, gestão e liderança.

Motivada pelo desejo de cuidar de pessoas, formou-se como cuidadora de idosos, concluiu o curso de atendente de farmácia e iniciou sua formação em Técnico em Enfermagem. Em 2021, decidiu se mudar para Portugal, em busca de novas experiências e crescimento pessoal e profissional. No país, iniciou sua atuação na área de hotelaria e serviços de limpeza, onde se destacou pela dedicação, organização e pela capacidade de liderar equipes com empatia e excelência.

Com o olhar voltado ao empreendedorismo, Kellen tornou-se sócia da irmã, Daiane Amaral, na Amaral Serviços, empresa sediada em Portugal que oferece soluções de limpeza e manutenção com foco em qualidade, confiança e atendimento humanizado. Essa parceria fortaleceu não apenas sua atuação internacional, mas também sua experiência em gestão de equipes e desenvolvimento de negócios.

A partir dessa trajetória e da vivência com clientes e profissionais, Kellen identificou uma demanda crescente por serviços confiáveis e especializados em áreas essenciais, como cuidadores, babás e manicures. Unindo novamente sua visão à da irmã, passou a integrar também o Valentinas Resolve, empresa criada por Daiane Amaral com o propósito de conectar clientes e profissionais de forma segura, prática e humana. Assim, Kellen tornou-se sócia nas duas frentes — Amaral Serviços e Valentinas Resolve —, contribuindo para o crescimento e consolidação dos negócios tanto em Portugal quanto no Brasil.`,
    specialties: ["Gestão de Operações", "Logística", "Liderança", "Empreendedorismo"],
  },
];

export default function TeamPage() {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative bg-black overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
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
