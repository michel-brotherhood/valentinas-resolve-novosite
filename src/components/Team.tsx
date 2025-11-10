import { Card } from "@/components/ui/card";
import andressaImg from "@/assets/team/andressa.jpg";
import daianeImg from "@/assets/team/daiane.jpg";
import janainaImg from "@/assets/team/janaina.jpg";
import kellenImg from "@/assets/team/kellen.jpg";

const teamMembers = [
  {
    name: "Andressa Mello",
    role: "Contadora",
    description: "Contadora e especialista em contabilidade empresarial e fiscal. Responsável técnica pela Contabilidade Integrada.",
    image: andressaImg,
  },
  {
    name: "Daiane Amaral",
    role: "Co-fundadora",
    description: "Co-fundadora e especialista em gestão de serviços.",
    image: daianeImg,
  },
  {
    name: "Janaína",
    role: "Sócia Fundadora",
    description: "Sócia fundadora.",
    image: janainaImg,
  },
  {
    name: "Kellen Cristina Amaral",
    role: "Co-fundadora",
    description: "Co-fundadora e especialista em operações.",
    image: kellenImg,
  },
];

export const Team = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Nossa Equipe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça as fundadoras que tornaram possível essa plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
