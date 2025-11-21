import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import { servicesData, getAllServices } from "@/lib/servicesData";

// Importar imagens de serviços
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
import imagemInstalacoes from "@/assets/services/instalacoes.jpg";
import imagemCuidadoHumano from "@/assets/services/cuidado-humano.jpg";
import imagemArquitetura from "@/assets/services/arquitetura-engenharia.jpg";

const categoryImages: Record<string, string> = {
  "LIMPEZAS": imagemDomesticos,
  "MANUTENÇÃO": imagemDomesticos,
  "REPARO": imagemDomesticos,
  "CONSTRUÇÃO": imagemConstrucao,
  "INSTALAÇÕES": imagemInstalacoes,
  "BELEZA & ESTÉTICA": imagemBeleza,
  "JURÍDICO": imagemJuridicos,
  "CONSULTORIAS": imagemJuridicos,
  "SAÚDE & BEM-ESTAR": imagemSaude,
  "EDUCAÇÃO": imagemEducacao,
  "AUTOMOTIVOS": imagemAutomotivos,
  "PETS": imagemPets,
  "EVENTOS": imagemEventos,
  "CRIATIVOS & DIGITAIS": imagemCriativos,
  "TRANSPORTE": imagemTransporte,
  "AGRICULTURA & PECUÁRIA": imagemAgricultura,
  "LAZER & TURISMO": imagemTurismo,
  "ESPORTIVOS": imagemEsportes,
  "CUIDADO & ACOMPANHAMENTO HUMANO": imagemCuidadoHumano,
  "ARQUITETURA, ENGENHARIA & DESIGN": imagemArquitetura,
};

const categories = ["Todos", ...servicesData.map(cat => cat.name)];

const Services = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCompanyType, setSelectedCompanyType] = useState<string>("Todos");
  const [selectedRegion, setSelectedRegion] = useState<string>("Todas");
  const [viewMode, setViewMode] = useState<"hierarchy" | "list">("hierarchy");

  useEffect(() => {
    const categoria = searchParams.get("categoria");
    if (categoria && categories.includes(categoria)) {
      setSelectedCategory(categoria);
    }
  }, [searchParams]);

  const allServices = useMemo(() => getAllServices(), []);

  const filteredCategories = useMemo(() => {
    if (selectedCategory === "Todos" && !searchQuery && selectedCompanyType === "Todos" && selectedRegion === "Todas") {
      return servicesData;
    }

    return servicesData
      .filter(cat => selectedCategory === "Todos" || cat.name === selectedCategory)
      .map(category => ({
        ...category,
        services: category.services.filter(service => {
          const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCompanyType = selectedCompanyType === "Todos" || 
            !service.companyTypes || 
            service.companyTypes.includes("Todos") ||
            service.companyTypes.includes(selectedCompanyType as any);
          const matchesRegion = selectedRegion === "Todas" ||
            !service.regions ||
            service.regions.includes(selectedRegion);
          return matchesSearch && matchesCompanyType && matchesRegion;
        }),
      }))
      .filter(category => category.services.length > 0);
  }, [searchQuery, selectedCategory, selectedCompanyType, selectedRegion]);

  const filteredServicesList = useMemo(() => {
    return allServices.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || service.category === selectedCategory;
      const matchesCompanyType = selectedCompanyType === "Todos" || 
        !service.companyTypes || 
        service.companyTypes.includes("Todos") ||
        service.companyTypes.includes(selectedCompanyType as any);
      const matchesRegion = selectedRegion === "Todas" ||
        !service.regions ||
        service.regions.includes(selectedRegion);
      return matchesSearch && matchesCategory && matchesCompanyType && matchesRegion;
    });
  }, [searchQuery, selectedCategory, selectedCompanyType, selectedRegion, allServices]);

  const totalServices = viewMode === "hierarchy" 
    ? filteredCategories.reduce((total, cat) => total + cat.services.length, 0)
    : filteredServicesList.length;

  const handleRequestQuote = (serviceName: string) => {
    navigate(`/contratar-servico?servico=${encodeURIComponent(serviceName)}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <FloatingChat />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Catálogo de Serviços
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossos {servicesData.length} nichos de serviços organizados
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="p-4 md:p-6 mb-8">
            <div className="flex flex-col gap-4">
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
                      <SelectValue placeholder="Nicho" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filtros Avançados */}
              <div className="flex flex-col lg:flex-row gap-4 pt-4 border-t border-border">
                <div className="lg:w-64">
                  <Select value={selectedCompanyType} onValueChange={setSelectedCompanyType}>
                    <SelectTrigger className="h-12">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Tipo de Empresa" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="Todos">Todos os tipos</SelectItem>
                      <SelectItem value="MEI">MEI</SelectItem>
                      <SelectItem value="LTDA">LTDA</SelectItem>
                      <SelectItem value="EI">EI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:w-64">
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="h-12">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Região" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="Todas">Todas as regiões</SelectItem>
                      <SelectItem value="Nacional">Nacional</SelectItem>
                      <SelectItem value="Norte">Norte</SelectItem>
                      <SelectItem value="Nordeste">Nordeste</SelectItem>
                      <SelectItem value="Centro-Oeste">Centro-Oeste</SelectItem>
                      <SelectItem value="Sudeste">Sudeste</SelectItem>
                      <SelectItem value="Sul">Sul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(selectedCompanyType !== "Todos" || selectedRegion !== "Todas") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCompanyType("Todos");
                      setSelectedRegion("Todas");
                    }}
                    className="h-12"
                  >
                    Limpar Filtros Avançados
                  </Button>
                )}
              </div>

              {/* View Mode Toggle and Results */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {totalServices} serviço(s) encontrado(s)
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "hierarchy" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("hierarchy")}
                    className="text-xs md:text-sm transition-all duration-300"
                  >
                    Por Nicho
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="text-xs md:text-sm transition-all duration-300"
                  >
                    Lista
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Services Content */}
          <div className="transition-all duration-500">
            {viewMode === "hierarchy" ? (
              // Hierarchical View (Nichos)
              filteredCategories.length > 0 ? (
                <div className="space-y-6">
                  {filteredCategories.map((category) => {
                    const CategoryIcon = getCategoryIcon(category.name);
                    return (
                      <Card key={category.id} className="overflow-hidden animate-scale-in">
                        <div
                          className="h-24 md:h-32 relative overflow-hidden"
                          style={{
                            backgroundImage: `url(${categoryImages[category.name]})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
                          <div className="absolute inset-0 flex items-center px-4 md:px-6">
                            <CategoryIcon className="h-8 md:h-12 w-8 md:w-12 text-white mr-3 md:mr-4" />
                            <div>
                              <h2 className="text-xl md:text-2xl font-bold text-white">
                                {category.name}
                              </h2>
                              <p className="text-white/90 text-xs md:text-sm hidden sm:block">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 md:p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                            {category.services.map((service, serviceIndex) => (
                              <Card
                                key={serviceIndex}
                                className="p-3 md:p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer hover:border-primary/50 animate-scale-in"
                                style={{ animationDelay: `${serviceIndex * 30}ms` }}
                                onClick={() => handleRequestQuote(service.name)}
                              >
                                <h4 className="font-medium text-foreground mb-1 text-sm md:text-base">
                                  {service.name}
                                </h4>
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                  {service.description}
                                </p>
                                <Button size="sm" className="w-full text-xs md:text-sm">
                                  Solicitar Orçamento
                                </Button>
                              </Card>
                            ))}
                          </div>
                          
                          {/* CTA no final de cada nicho */}
                          <div className="pt-4 border-t border-border">
                            <Button 
                              onClick={() => navigate('/contratar-servico')}
                              className="w-full md:w-auto"
                              size="lg"
                            >
                              Solicitar Orçamento para {category.name}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <p className="text-lg text-muted-foreground mb-4">
                      Nenhum serviço encontrado com os filtros selecionados.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("Todos");
                        setSelectedCompanyType("Todos");
                        setSelectedRegion("Todas");
                      }}
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </Card>
              )
            ) : (
              // List View
              filteredServicesList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServicesList.map((service, index) => {
                    const CategoryIcon = getCategoryIcon(service.category);
                    return (
                      <Card
                        key={index}
                        className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer hover:border-primary/50 animate-scale-in"
                        style={{ animationDelay: `${index * 30}ms` }}
                        onClick={() => handleRequestQuote(service.name)}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <CategoryIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Badge variant="secondary" className="text-xs mb-1">
                              {service.category}
                            </Badge>
                            <h4 className="font-medium text-foreground text-sm md:text-base">
                              {service.name}
                            </h4>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <Button size="sm" className="w-full text-xs md:text-sm">
                          Solicitar Orçamento
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <p className="text-lg text-muted-foreground mb-4">
                      Nenhum serviço encontrado com os filtros selecionados.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("Todos");
                        setSelectedCompanyType("Todos");
                        setSelectedRegion("Todas");
                      }}
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </Card>
              )
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
