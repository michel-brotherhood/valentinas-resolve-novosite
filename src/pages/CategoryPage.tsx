import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

// Importar imagens
import imagemDomesticos from "@/assets/services/domesticos.jpg";
import imagemBeleza from "@/assets/services/beleza.jpg";
import imagemSaude from "@/assets/services/saude.jpg";
import imagemJuridicos from "@/assets/services/juridicos.jpg";
import imagemEducacao from "@/assets/services/educacao.jpg";
import imagemAutomotivos from "@/assets/services/automotivos.jpg";
import imagemPets from "@/assets/services/pets.jpg";
import imagemEventos from "@/assets/services/eventos.jpg";
import imagemCriativos from "@/assets/services/criativos.jpg";
import imagemConstrucao from "@/assets/services/construcao.jpg";
import imagemTransporte from "@/assets/services/transporte.jpg";
import imagemAgricultura from "@/assets/services/agricultura.jpg";
import imagemPersonalizados from "@/assets/services/personalizados.jpg";
import imagemTurismo from "@/assets/services/turismo.jpg";
import imagemEsportes from "@/assets/services/esportes.jpg";

const categoryImages: Record<string, string> = {
  "Domésticos": imagemDomesticos,
  "Beleza": imagemBeleza,
  "Saúde": imagemSaude,
  "Jurídicos": imagemJuridicos,
  "Educação": imagemEducacao,
  "Automotivos": imagemAutomotivos,
  "Pets": imagemPets,
  "Eventos": imagemEventos,
  "Criativos": imagemCriativos,
  "Construção": imagemConstrucao,
  "Transporte": imagemTransporte,
  "Agricultura": imagemAgricultura,
  "Personalizados": imagemPersonalizados,
  "Turismo": imagemTurismo,
  "Esportes": imagemEsportes,
};

const categoryDescriptions: Record<string, string> = {
  "Domésticos": "Serviços especializados para manutenção e cuidado da sua casa, desde limpeza até reparos gerais.",
  "Beleza": "Profissionais qualificados em cuidados estéticos, cabelo, maquiagem e bem-estar.",
  "Saúde": "Serviços de saúde com profissionais capacitados para cuidar do seu bem-estar.",
  "Jurídicos": "Advogados especializados para auxiliar em questões legais e jurídicas.",
  "Educação": "Professores e tutores para reforço escolar e educação continuada.",
  "Automotivos": "Serviços de manutenção e reparos para seu veículo.",
  "Pets": "Cuidados especializados para seu animal de estimação.",
  "Eventos": "Profissionais para planejar e executar eventos memoráveis.",
  "Criativos": "Serviços de design, fotografia e produção criativa.",
  "Construção": "Profissionais para reformas, construções e reparos estruturais.",
  "Transporte": "Serviços de transporte e mudanças com segurança.",
  "Agricultura": "Serviços especializados para o setor agrícola.",
  "Personalizados": "Serviços sob medida para necessidades específicas.",
  "Turismo": "Guias e planejamento de viagens e turismo.",
  "Esportes": "Treinadores e profissionais de educação física.",
};

const featuredServices: Record<string, string[]> = {
  "Domésticos": ["Limpeza Residencial", "Faxina Completa", "Limpeza Pós-Obra", "Jardinagem"],
  "Beleza": ["Corte de Cabelo", "Manicure e Pedicure", "Maquiagem", "Depilação"],
  "Saúde": ["Enfermagem", "Fisioterapia", "Psicologia", "Nutrição"],
  "Jurídicos": ["Consultoria Jurídica", "Contratos", "Direito Trabalhista", "Direito Civil"],
  "Educação": ["Reforço Escolar", "Aulas Particulares", "Idiomas", "Preparatório para Vestibular"],
  "Automotivos": ["Mecânica Geral", "Troca de Óleo", "Funilaria", "Elétrica Automotiva"],
  "Pets": ["Veterinário", "Banho e Tosa", "Adestramento", "Pet Sitting"],
  "Eventos": ["Decoração", "Buffet", "Fotografia", "DJ e Som"],
  "Criativos": ["Design Gráfico", "Fotografia Profissional", "Edição de Vídeo", "Marketing Digital"],
  "Construção": ["Pedreiro", "Pintura", "Elétrica", "Hidráulica"],
  "Transporte": ["Mudanças", "Fretes", "Transporte Executivo", "Motoboy"],
  "Agricultura": ["Plantio", "Irrigação", "Colheita", "Consultoria Agrícola"],
  "Personalizados": ["Costura Sob Medida", "Artesanato", "Serviços Personalizados", "Consultoria"],
  "Turismo": ["Guia Turístico", "Planejamento de Viagens", "Passeios", "Transfer"],
  "Esportes": ["Personal Trainer", "Aulas de Yoga", "Treinamento Funcional", "Musculação"],
};

const CategoryPage = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const navigate = useNavigate();
  const categoryName = decodeURIComponent(categoria || "");
  const Icon = getCategoryIcon(categoryName);
  const image = categoryImages[categoryName];
  const description = categoryDescriptions[categoryName];
  const services = featuredServices[categoryName] || [];
  
  const heroAnimation = useScrollAnimation();
  const imageAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingChat />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div 
            ref={heroAnimation.ref}
            className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
              heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Icon className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Serviços de {categoryName}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {description}
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => {
                navigate('/contratar-servico');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Category Image */}
      {image && (
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div 
              ref={imageAnimation.ref}
              className={`max-w-5xl mx-auto transition-all duration-700 delay-150 ${
                imageAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <img
                src={image}
                alt={`Serviços de ${categoryName}`}
                className="w-full h-[400px] object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Featured Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div 
            ref={servicesAnimation.ref}
            className={`max-w-6xl mx-auto transition-all duration-700 delay-300 ${
              servicesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Serviços em Destaque
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{service}</h3>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => {
                        navigate('/contratar-servico');
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                      }}
                    >
                      Solicitar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Ver Todos Button */}
            <div className="text-center">
              <Link to={`/servicos?categoria=${encodeURIComponent(categoryName)}`}>
                <Button size="lg" variant="outline" className="gap-2">
                  Ver Todos os Serviços de {categoryName}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div 
          ref={ctaAnimation.ref}
          className={`container mx-auto px-4 text-center transition-all duration-700 delay-500 ${
            ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Pronto para Contratar?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Encontre os melhores profissionais de {categoryName} na sua região
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="gap-2"
            onClick={() => {
              navigate('/contratar-servico');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
          >
            Solicitar Orçamento Grátis
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
