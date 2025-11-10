import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import andressa from "@/assets/team/andressa.jpg";
import daiane from "@/assets/team/daiane.jpg";
import janaina from "@/assets/team/janaina.jpg";
import kellen from "@/assets/team/kellen.jpg";

const teamMembers = [
  {
    name: "Andressa Mello",
    role: "Contadora Responsável",
    credential: "CRC 12345/O",
    image: andressa,
    bio: "Especialista em planejamento tributário e conformidade fiscal com mais de 15 anos de experiência.",
    specialties: ["Planejamento Tributário", "Consultoria Fiscal", "Gestão Financeira"],
  },
  {
    name: "Daiane Silva",
    role: "Coordenadora de Serviços",
    credential: "",
    image: daiane,
    bio: "Responsável pela coordenação e qualidade de todos os serviços prestados pela plataforma.",
    specialties: ["Gestão de Qualidade", "Treinamento", "Atendimento"],
  },
  {
    name: "Janaína Costa",
    role: "Gerente de Operações",
    credential: "",
    image: janaina,
    bio: "Lidera as operações diárias garantindo eficiência e excelência no atendimento.",
    specialties: ["Operações", "Logística", "Processos"],
  },
  {
    name: "Kellen Rodrigues",
    role: "Diretora de Relacionamento",
    credential: "",
    image: kellen,
    bio: "Especialista em relacionamento com cliente e desenvolvimento de parcerias estratégicas.",
    specialties: ["Relacionamento", "Parcerias", "Desenvolvimento"],
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
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-48 h-48 rounded-full object-cover mb-6"
                      />
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-lg text-primary font-semibold mb-1">
                        {member.role}
                      </p>
                      {member.credential && (
                        <p className="text-sm text-muted-foreground mb-4">
                          {member.credential}
                        </p>
                      )}
                      <p className="text-muted-foreground mb-6">
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
