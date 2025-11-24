import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import andressaImg from "@/assets/team/andressa.jpg";
import daianeImg from "@/assets/team/daiane.jpg";
import kellenImg from "@/assets/team/kellen.jpg";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Daiane Amaral",
    role: "Fundadora & CEO – Valentina's Resolve",
    shortDescription: "Líder estratégica com experiência internacional e foco em excelência",
    fullDescription: "Fundadora e CEO da Valentina's Resolve, Daiane Amaral lidera o desenvolvimento estratégico da plataforma, unindo visão empreendedora, inovação e foco em excelência. Com experiência internacional na Espanha, Bélgica e Portugal, construiu uma trajetória sólida nas áreas de Gestão da Qualidade, liderança e eficiência operacional. Formada em Sistema de Gestão da Qualidade e atualmente cursando Direito, atuou por mais de 10 anos em uma empresa de inspeção veicular acreditada pelo INMETRO, desenvolvendo expertise em processos, conformidade, melhoria contínua e gestão de equipes. Além da liderança na Valentina's Resolve, Daiane é também proprietária da Amaral Serviços, empresa sediada em Portugal que atua nos segmentos de limpeza, manutenção e gestão operacional, reforçando sua experiência empresarial em ambientes multiculturais e sua capacidade de coordenar equipes e processos com alta performance. Daiane aplica sua visão estratégica, experiência multicultural e forte capacidade analítica para fortalecer a Valentina's Resolve e criar conexões eficientes entre profissionais e clientes, impulsionando o crescimento sustentável da plataforma.",
    image: daianeImg,
    specialties: ["Gestão da Qualidade", "Liderança Internacional", "Eficiência Operacional", "Desenvolvimento Estratégico"],
  },
  {
    name: "Kellen Amaral",
    role: "Cofundadora & COO – Valentina's Resolve",
    shortDescription: "Gestora operacional com expertise em processos e excelência",
    fullDescription: "Cofundadora e COO da Valentina's Resolve, Kellen Amaral atua na gestão operacional da plataforma, garantindo eficiência, qualidade e excelência no atendimento. Com experiência em liderança de equipes, hotelaria e serviços, desenvolveu sólida competência em organização, processos, gestão de pessoas e execução estratégica. Iniciou sua trajetória profissional aos 17 anos em empreendimentos familiares, construindo uma base consistente em responsabilidade, gestão e tomada de decisão. Formada como cuidadora de idosos, com cursos na área de saúde e experiência internacional em Portugal, aprimorou sua capacidade de coordenar equipes com empatia, clareza e alto padrão de entrega. Além da atuação na Valentina's Resolve, é sócia da Amaral Serviços, empresa de limpeza e manutenção em Portugal, onde reforçou sua expertise em operações, supervisão de equipes e relacionamento com clientes. Na Valentina's Resolve, Kellen é responsável por alinhar processos, padronizar operações e garantir que a experiência de profissionais e clientes seja ágil, segura e eficiente, contribuindo diretamente para o crescimento e consolidação do ecossistema da plataforma.",
    image: kellenImg,
    specialties: ["Gestão de Operações", "Liderança de Equipes", "Processos e Qualidade", "Experiência Internacional"],
  },
  {
    name: "Andressa Melo",
    role: "Cofundadora, CFO & Líder da Contabilidade Integrada – Valentina's Resolve",
    shortDescription: "Especialista em gestão financeira e contabilidade empresarial",
    fullDescription: "Cofundadora e CFO da Valentina's Resolve, Andressa Melo atua na estruturação estratégica e financeira da plataforma, unindo conhecimento contábil, visão analítica e foco em eficiência operacional. Formada em Ciências Contábeis e atuante na área desde 2017, desenvolveu expertise sólida em gestão financeira, contabilidade empresarial, planejamento tributário e suporte a empresas de diversos portes e segmentos. Empreendedora desde 2020, fundou seu próprio escritório contábil, consolidando experiência em soluções orientadas ao crescimento sustentável e à organização financeira. Na Valentina's Resolve, além de liderar o setor financeiro, é também responsável pela área de Contabilidade Integrada, conectando profissionais e empresas com processos precisos, compliance e inteligência contábil aplicada. Comprometida com transparência, eficiência e excelência, Andressa fortalece a operação e a visão de longo prazo da plataforma, contribuindo diretamente para a expansão e consolidação do ecossistema Valentina's.",
    image: andressaImg,
    specialties: ["Gestão Financeira", "Planejamento Tributário", "Contabilidade Empresarial", "Compliance"],
  },
];

export const Team = () => {
  return (
    <section className="py-16 bg-secondary/20" id="equipe">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossa Equipe Fundadora
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça as profissionais que idealizaram e construíram a Valentina's Resolve
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {teamMembers.map((member, index) => (
              <AccordionItem key={member.name} value={`member-${index}`} className="border-none">
                <Card className="overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-primary">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-primary font-semibold text-sm">
                          {member.role}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {member.shortDescription}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pt-4 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {member.fullDescription}
                      </p>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Especialidades:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <a
                        href={`/equipe#${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium mt-4"
                      >
                        Ver perfil completo na página da equipe
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Interessado em fazer parte da nossa equipe?
          </p>
          <Link
            to="/registro-profissional"
            className="text-primary font-semibold hover:underline"
          >
            Cadastre-se como profissional →
          </Link>
        </div>
      </div>
    </section>
  );
};
