import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
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
    name: "Janaína Bessa",
    role: "Sócia e Atendimento ao Cliente",
    credential: "",
    image: janaina,
    bio: `Sou uma profissional dedicada e comprometida com a excelência em tudo o que faço. Com uma trajetória marcada pela busca constante por aprendizado e desenvolvimento, trago para a Valentina's Resolve minha experiência e paixão por ajudar as pessoas.

Como sócia da empresa, trabalho lado a lado com as demais fundadoras para garantir que a plataforma ofereça o melhor serviço possível, tanto para os profissionais quanto para os clientes. Minha dedicação e comprometimento são fundamentais para o sucesso da Valentina's Resolve.

Acredito no poder da colaboração e no potencial de transformação que uma plataforma bem estruturada pode trazer para a vida das pessoas. Meu foco está em criar experiências positivas e duradouras para todos os envolvidos.`,
    specialties: ["Gestão de Operações", "Atendimento ao Cliente", "Desenvolvimento"],
  },
  {
    name: "Kellen Amaral",
    role: "Sócia e Diretora de Operações",
    credential: "",
    image: kellen,
    bio: `Como co-fundadora da Valentina's Resolve, trabalho junto com minha irmã Daiane Amaral, Andressa Melo e Janaína Bessa para criar uma plataforma que conecta profissionais qualificados a clientes que precisam de serviços de qualidade.

Minha experiência e dedicação contribuem para construir algo que vai muito além de um negócio - estamos criando uma comunidade baseada em confiança, excelência e transformação. Nosso compromisso é fazer a diferença na vida das pessoas, oferecendo soluções práticas e eficientes.`,
    specialties: ["Relacionamento com Cliente", "Parcerias Estratégicas", "Desenvolvimento de Negócios"],
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-black to-primary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Nossa Equipe
              </h1>
              <p className="text-xl text-white/90">
                Conheça os profissionais que fazem a Valentina's Resolve acontecer
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col items-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-48 h-48 rounded-full object-cover mb-6"
                      />
                      <h3 className="text-2xl font-bold text-foreground mb-1 text-center">
                        {member.name}
                      </h3>
                      <p className="text-lg text-primary font-semibold mb-1 text-center">
                        {member.role}
                      </p>
                      {member.credential && (
                        <p className="text-sm text-muted-foreground mb-4 text-center">
                          {member.credential}
                        </p>
                      )}
                      <p className="text-muted-foreground mb-6 text-left whitespace-pre-line">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
