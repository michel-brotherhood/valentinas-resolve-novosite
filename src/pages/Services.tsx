import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategoryIcon } from "@/lib/categoryIcons";

const servicesData = [
  // Domésticos (14)
  { category: "Domésticos", name: "Faxina", description: "Limpeza completa residencial" },
  { category: "Domésticos", name: "Limpeza de janelas e vidros", description: "Limpeza especializada de vidros" },
  { category: "Domésticos", name: "Lavanderia e passadoria", description: "Lavagem e passagem de roupas" },
  { category: "Domésticos", name: "Montagem e desmontagem de móveis", description: "Montagem profissional de móveis" },
  { category: "Domésticos", name: "Jardinagem", description: "Manutenção de jardins e plantas" },
  { category: "Domésticos", name: "Manutenção de piscinas", description: "Limpeza e tratamento de piscinas" },
  { category: "Domésticos", name: "Dedetização e controle de pragas", description: "Controle profissional de pragas" },
  { category: "Domésticos", name: "Limpeza de estofados, tapetes e carpetes", description: "Higienização profunda" },
  { category: "Domésticos", name: "Reparos elétricos", description: "Instalações e reparos elétricos" },
  { category: "Domésticos", name: "Reparos hidráulicos", description: "Encanamento e vazamentos" },
  { category: "Domésticos", name: "Pintura", description: "Pintura residencial e comercial" },
  { category: "Domésticos", name: "Pequenos consertos residenciais", description: "Reparos gerais" },
  { category: "Domésticos", name: "Serviço de chaveiro", description: "Abertura e troca de fechaduras" },
  { category: "Domésticos", name: "Conserto de eletrodomésticos", description: "Manutenção de aparelhos" },

  // Beleza (10)
  { category: "Beleza", name: "Corte de cabelo", description: "Cortes femininos e masculinos" },
  { category: "Beleza", name: "Barba", description: "Design e manutenção de barba" },
  { category: "Beleza", name: "Maquiagem", description: "Maquiagem profissional" },
  { category: "Beleza", name: "Penteado", description: "Penteados para eventos" },
  { category: "Beleza", name: "Manicure e pedicure", description: "Cuidados com unhas" },
  { category: "Beleza", name: "Depilação", description: "Depilação profissional" },
  { category: "Beleza", name: "Design de sobrancelhas", description: "Modelagem de sobrancelhas" },
  { category: "Beleza", name: "Limpeza de pele", description: "Tratamento facial" },
  { category: "Beleza", name: "Massagem relaxante e terapêutica", description: "Massagens profissionais" },
  { category: "Beleza", name: "Tratamentos estéticos", description: "Tratamentos faciais e corporais" },

  // Saúde (7)
  { category: "Saúde", name: "Consulta médica domiciliar", description: "Atendimento médico em casa" },
  { category: "Saúde", name: "Sessão de fisioterapia", description: "Fisioterapia domiciliar" },
  { category: "Saúde", name: "Consulta nutricional", description: "Acompanhamento nutricional" },
  { category: "Saúde", name: "Consulta com psicólogo", description: "Atendimento psicológico" },
  { category: "Saúde", name: "Sessão de acupuntura", description: "Tratamento com acupuntura" },
  { category: "Saúde", name: "Massoterapia", description: "Massagens terapêuticas" },
  { category: "Saúde", name: "Terapias alternativas", description: "Reiki, aromaterapia e outras" },

  // Jurídicos (9)
  { category: "Jurídicos", name: "Advogado cível", description: "Questões cíveis e contratos" },
  { category: "Jurídicos", name: "Advogado criminal", description: "Defesa criminal" },
  { category: "Jurídicos", name: "Advogado trabalhista", description: "Direito do trabalho" },
  { category: "Jurídicos", name: "Advogado tributário", description: "Questões fiscais e tributárias" },
  { category: "Jurídicos", name: "Advogado imobiliário", description: "Transações imobiliárias" },
  { category: "Jurídicos", name: "Advogado de família", description: "Divórcios e inventários" },
  { category: "Jurídicos", name: "Advogado previdenciário", description: "Benefícios previdenciários" },
  { category: "Jurídicos", name: "Advogado empresarial", description: "Direito empresarial" },
  { category: "Jurídicos", name: "Elaboração e revisão de contratos", description: "Contratos personalizados" },

  // Consultoria (10)
  { category: "Jurídicos", name: "Consultoria contábil", description: "Gestão contábil empresarial" },
  { category: "Jurídicos", name: "Consultoria financeira", description: "Planejamento financeiro" },
  { category: "Jurídicos", name: "Consultoria tributária", description: "Otimização tributária" },
  { category: "Jurídicos", name: "Consultoria em investimentos", description: "Assessoria de investimentos" },
  { category: "Jurídicos", name: "Consultoria agrícola e pecuária", description: "Gestão rural" },
  { category: "Jurídicos", name: "Auditoria de processos", description: "Análise e otimização" },
  { category: "Jurídicos", name: "Consultoria em recursos humanos", description: "Gestão de pessoas" },
  { category: "Jurídicos", name: "Consultoria em marketing", description: "Estratégias de marketing" },
  { category: "Jurídicos", name: "Coaching profissional", description: "Desenvolvimento de carreira" },
  { category: "Jurídicos", name: "Coaching pessoal", description: "Desenvolvimento pessoal" },

  // Educação (9)
  { category: "Educação", name: "Reforço escolar", description: "Aulas particulares" },
  { category: "Educação", name: "Aulas de idiomas", description: "Inglês, espanhol, francês" },
  { category: "Educação", name: "Aulas de música", description: "Violão, piano, canto" },
  { category: "Educação", name: "Aulas de informática", description: "Informática básica e avançada" },
  { category: "Educação", name: "Treinamento em softwares", description: "Excel, Word, AutoCAD" },
  { category: "Educação", name: "Aulas de fotografia", description: "Fotografia profissional" },
  { category: "Educação", name: "Aulas de artes", description: "Desenho e pintura" },
  { category: "Educação", name: "Aulas de culinária", description: "Técnicas culinárias" },
  { category: "Educação", name: "Orientação educacional", description: "Orientação vocacional" },

  // Automotivos (10)
  { category: "Automotivos", name: "Lavagem de veículos", description: "Lavagem completa" },
  { category: "Automotivos", name: "Higienização interna", description: "Limpeza interna profunda" },
  { category: "Automotivos", name: "Polimento e pintura", description: "Estética automotiva" },
  { category: "Automotivos", name: "Troca de óleo e filtros", description: "Manutenção preventiva" },
  { category: "Automotivos", name: "Alinhamento e balanceamento", description: "Serviços de suspensão" },
  { category: "Automotivos", name: "Revisão mecânica", description: "Check-up completo" },
  { category: "Automotivos", name: "Funilaria", description: "Reparos de lataria" },
  { category: "Automotivos", name: "Instalação de som", description: "Som e acessórios" },
  { category: "Automotivos", name: "Chaveiro automotivo", description: "Cópias e programação" },
  { category: "Automotivos", name: "Guincho 24 horas", description: "Reboque e socorro" },

  // Pets (7)
  { category: "Pets", name: "Banho e tosa", description: "Estética pet" },
  { category: "Pets", name: "Consulta veterinária", description: "Atendimento veterinário" },
  { category: "Pets", name: "Vacinas e medicamentos", description: "Imunização e tratamentos" },
  { category: "Pets", name: "Passeio de cães", description: "Dog walker profissional" },
  { category: "Pets", name: "Adestramento", description: "Treinamento canino" },
  { category: "Pets", name: "Pet sitter", description: "Cuidador de pets" },
  { category: "Pets", name: "Transporte de pets", description: "Transporte seguro" },

  // Eventos (11)
  { category: "Eventos", name: "Fotografia de eventos", description: "Fotografia profissional" },
  { category: "Eventos", name: "Filmagem de eventos", description: "Vídeo profissional" },
  { category: "Eventos", name: "Decoração de festas", description: "Decoração temática" },
  { category: "Eventos", name: "Buffet e catering", description: "Serviço de alimentação" },
  { category: "Eventos", name: "Bartender", description: "Drinks profissionais" },
  { category: "Eventos", name: "Locação de mesas e cadeiras", description: "Mobiliário para eventos" },
  { category: "Eventos", name: "Locação de som", description: "Equipamentos de áudio" },
  { category: "Eventos", name: "DJ", description: "Animação musical" },
  { category: "Eventos", name: "Músicos ao vivo", description: "Apresentações musicais" },
  { category: "Eventos", name: "Recreação infantil", description: "Animação para crianças" },
  { category: "Eventos", name: "Organização de eventos", description: "Planejamento completo" },

  // Criativos (11)
  { category: "Criativos", name: "Design gráfico", description: "Identidade visual" },
  { category: "Criativos", name: "Criação de logos", description: "Logotipos profissionais" },
  { category: "Criativos", name: "Redação de artigos", description: "Conteúdo para blogs" },
  { category: "Criativos", name: "Edição de fotos", description: "Tratamento de imagens" },
  { category: "Criativos", name: "Edição de vídeos", description: "Produção audiovisual" },
  { category: "Criativos", name: "Vídeos promocionais", description: "Marketing em vídeo" },
  { category: "Criativos", name: "Ilustração personalizada", description: "Ilustrações sob medida" },
  { category: "Criativos", name: "Desenvolvimento de sites", description: "Sites profissionais" },
  { category: "Criativos", name: "Marketing digital", description: "Estratégias digitais" },
  { category: "Criativos", name: "Gestão de redes sociais", description: "Social media" },
  { category: "Criativos", name: "Criação de conteúdo", description: "Conteúdo para redes" },

  // Construção (11)
  { category: "Construção", name: "Projeto arquitetônico", description: "Projetos residenciais" },
  { category: "Construção", name: "Design de interiores", description: "Decoração e ambientação" },
  { category: "Construção", name: "Reforma residencial", description: "Reformas completas" },
  { category: "Construção", name: "Reforma comercial", description: "Reformas empresariais" },
  { category: "Construção", name: "Pintura profissional", description: "Pintura residencial/comercial" },
  { category: "Construção", name: "Instalação elétrica", description: "Serviços elétricos" },
  { category: "Construção", name: "Instalação hidráulica", description: "Encanamento e hidráulica" },
  { category: "Construção", name: "Pisos e revestimentos", description: "Instalação de pisos" },
  { category: "Construção", name: "Marcenaria", description: "Móveis sob medida" },
  { category: "Construção", name: "Serralheria", description: "Estruturas metálicas" },
  { category: "Construção", name: "Vidraçaria", description: "Vidros e esquadrias" },

  // Transporte (8)
  { category: "Transporte", name: "Motorista particular", description: "Motorista executivo" },
  { category: "Transporte", name: "Transporte escolar", description: "Van escolar" },
  { category: "Transporte", name: "Frete e carretos", description: "Mudanças e fretes" },
  { category: "Transporte", name: "Serviço de motoboy", description: "Entregas rápidas" },
  { category: "Transporte", name: "Transporte de cargas", description: "Cargas leves e médias" },
  { category: "Transporte", name: "Transporte fluvial", description: "Transporte por rio" },
  { category: "Transporte", name: "Transporte de cargas fluvial", description: "Cargas por via fluvial" },
  { category: "Transporte", name: "Guincho", description: "Reboque de veículos" },

  // Agricultura (7)
  { category: "Agricultura", name: "Consultoria agrícola", description: "Manejo agrícola" },
  { category: "Agricultura", name: "Consultoria pecuária", description: "Gestão de rebanhos" },
  { category: "Agricultura", name: "Projetos rurais", description: "Elaboração de projetos" },
  { category: "Agricultura", name: "Serviço de tratorista", description: "Operação de tratores" },
  { category: "Agricultura", name: "Colheita e plantio", description: "Serviços de plantio" },
  { category: "Agricultura", name: "Transporte de animais", description: "Transporte rural" },
  { category: "Agricultura", name: "Manutenção de pastagens", description: "Cuidado com pastagens" },

  // Personalizados (6)
  { category: "Personalizados", name: "Personal shopper", description: "Consultoria de compras" },
  { category: "Personalizados", name: "Organização de ambientes", description: "Organização profissional" },
  { category: "Personalizados", name: "Consultoria de imagem", description: "Estilo pessoal" },
  { category: "Personalizados", name: "Assistência virtual", description: "Secretariado remoto" },
  { category: "Personalizados", name: "Pesquisa genealógica", description: "História familiar" },
  { category: "Personalizados", name: "Coaching de metas", description: "Desenvolvimento pessoal" },

  // Turismo (6)
  { category: "Turismo", name: "Guia turístico", description: "Tours regionais" },
  { category: "Turismo", name: "Passeios fluviais", description: "Passeios de barco" },
  { category: "Turismo", name: "Aluguel de barcos", description: "Locação de embarcações" },
  { category: "Turismo", name: "Trilhas ecológicas", description: "Ecoturismo" },
  { category: "Turismo", name: "Pesca esportiva", description: "Turismo de pesca" },
  { category: "Turismo", name: "Turismo rural", description: "Experiências rurais" },

  // Esportes (12)
  { category: "Esportes", name: "Treinador de Padel", description: "Aulas de padel" },
  { category: "Esportes", name: "Treinador de Futebol", description: "Treinos de futebol" },
  { category: "Esportes", name: "Treinador de Goleiros", description: "Especialização em goleiros" },
  { category: "Esportes", name: "Treinador de Atletismo", description: "Corrida e atletismo" },
  { category: "Esportes", name: "Instrutor de Canoagem", description: "Aulas de canoagem" },
  { category: "Esportes", name: "Treinamento Funcional", description: "Treinos funcionais" },
  { category: "Esportes", name: "Treinador de Tênis", description: "Aulas de tênis" },
  { category: "Esportes", name: "Treinador de Natação", description: "Aulas de natação" },
  { category: "Esportes", name: "Treinador de Ciclismo", description: "Treinos de bike" },
  { category: "Esportes", name: "Instrutor de Dança", description: "Aulas de dança" },
  { category: "Esportes", name: "Personal trainer", description: "Treinos personalizados" },
  { category: "Esportes", name: "Personal Fight", description: "Treinos de luta" },
];

const categories = [
  "Todos",
  "Domésticos",
  "Beleza",
  "Saúde",
  "Jurídicos",
  "Educação",
  "Automotivos",
  "Pets",
  "Eventos",
  "Criativos",
  "Construção",
  "Transporte",
  "Agricultura",
  "Personalizados",
  "Turismo",
  "Esportes",
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleRequestQuote = (serviceName: string) => {
    window.location.href = `/contratar-profissional?servico=${encodeURIComponent(serviceName)}`;
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      "Domésticos": "from-blue-500/20 to-blue-600/20",
      "Beleza": "from-pink-500/20 to-purple-600/20",
      "Saúde": "from-green-500/20 to-emerald-600/20",
      "Jurídicos": "from-gray-500/20 to-slate-600/20",
      "Educação": "from-amber-500/20 to-orange-600/20",
      "Automotivos": "from-red-500/20 to-rose-600/20",
      "Pets": "from-yellow-500/20 to-amber-600/20",
      "Eventos": "from-purple-500/20 to-fuchsia-600/20",
      "Criativos": "from-cyan-500/20 to-blue-600/20",
      "Construção": "from-orange-500/20 to-red-600/20",
      "Transporte": "from-indigo-500/20 to-blue-600/20",
      "Agricultura": "from-lime-500/20 to-green-600/20",
      "Personalizados": "from-teal-500/20 to-cyan-600/20",
      "Turismo": "from-sky-500/20 to-blue-600/20",
      "Esportes": "from-emerald-500/20 to-teal-600/20",
    };
    return gradients[category] || "from-gray-500/20 to-slate-600/20";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <FloatingChat />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Catálogo de Serviços
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Encontre entre 148+ serviços especializados em 15 categorias
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="p-4 md:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar serviços..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="lg:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredServices.length} serviço(s) encontrado(s)
            </div>
          </Card>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredServices.map((service, index) => {
                const CategoryIcon = getCategoryIcon(service.category);
                return (
                  <Card
                    key={index}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary/50 cursor-pointer"
                  >
                    {/* Image with gradient overlay */}
                    <div className={`h-32 bg-gradient-to-br ${getCategoryGradient(service.category)} relative overflow-hidden flex items-center justify-center`}>
                      <CategoryIcon className="h-16 w-16 text-foreground/20 group-hover:text-primary/30 transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-2 left-4">
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6">
                      <h3 className="font-bold text-base md:text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      <Button
                        onClick={() => handleRequestQuote(service.name)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm md:text-base"
                        size="sm"
                      >
                        Solicitar Orçamento
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Nenhum serviço encontrado com os filtros selecionados.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Todos");
                }}
                variant="outline"
                className="mt-4"
              >
                Limpar Filtros
              </Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
