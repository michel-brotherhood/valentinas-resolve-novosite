import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import andressaImg from "@/assets/team/andressa.jpg";
import daianeImg from "@/assets/team/daiane.jpg";
import janainaImg from "@/assets/team/janaina.jpg";
import kellenImg from "@/assets/team/kellen.jpg";

const teamMembers = [
  {
    name: "Daiane Amaral",
    role: "Fundadora e Diretora de Serviços",
    shortDescription: "Especialista em gestão de serviços e operações",
    fullDescription: "Fundadora do Valentina's Resolve com expertise em gestão de serviços, coordenação de equipes e desenvolvimento de processos operacionais. Responsável por garantir a qualidade e excelência na prestação de todos os serviços oferecidos pela plataforma.",
    image: daianeImg,
    specialties: ["Gestão de Serviços", "Coordenação de Equipes", "Processos Operacionais", "Qualidade"],
  },
  {
    name: "Andressa Mello",
    role: "Sócia e Contadora Responsável Técnica",
    shortDescription: "Especialista em contabilidade empresarial e fiscal",
    fullDescription: "Sócia e Contadora Responsável Técnica do Valentina's Resolve, especialista em contabilidade empresarial e fiscal, com vasta experiência em planejamento tributário, gestão fiscal e contabilidade integrada. Oferece atendimento direto e personalizado para simplificar a gestão contábil dos clientes.",
    image: andressaImg,
    specialties: ["Contabilidade Empresarial", "Planejamento Tributário", "Gestão Fiscal", "Assessoria Contábil"],
  },
  {
    name: "Janaína",
    role: "Sócia e Atendimento ao Cliente",
    shortDescription: "Estratégia e desenvolvimento de negócios",
    fullDescription: "Sócia do Valentina's Resolve, com foco em atendimento ao cliente e desenvolvimento de negócios. Atua na expansão da plataforma e no estabelecimento de parcerias estratégicas para ampliar a oferta de serviços.",
    image: janainaImg,
    specialties: ["Estratégia Empresarial", "Desenvolvimento de Negócios", "Parcerias Estratégicas"],
  },
  {
    name: "Kellen Cristina Amaral",
    role: "Sócia e Diretora de Operações",
    shortDescription: "Especialista em operações e logística",
    fullDescription: "Sócia e Diretora de Operações do Valentina's Resolve com especialização em operações, logística e gestão de processos. Responsável por coordenar toda a estrutura operacional da plataforma, garantindo eficiência na conexão entre profissionais e clientes.",
    image: kellenImg,
    specialties: ["Gestão de Operações", "Logística", "Processos", "Eficiência Operacional"],
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
          <a
            href="/registro-profissional"
            className="text-primary font-semibold hover:underline"
          >
            Cadastre-se como profissional →
          </a>
        </div>
      </div>
    </section>
  );
};
