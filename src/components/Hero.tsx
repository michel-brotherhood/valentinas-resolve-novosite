import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ServiceAutocomplete } from "@/components/ServiceAutocomplete";

const searchSchema = z.object({
  query: z.string().trim().min(2, "Digite pelo menos 2 caracteres").max(100, "Pesquisa muito longa"),
});

type HeroTab = "client" | "professional";

const heroContent = {
  client: {
    title: <>Encontre o <span className="text-primary">profissional ideal</span> para o seu <span className="text-primary">serviço</span></>,
    subtitle: "Conectamos você aos melhores profissionais verificados da sua região",
    placeholder: 'Procure "limpeza", "eletricista", "beleza"...',
    buttonText: "Buscar",
    emptyRoute: "/contratar-servico",
    queryRoute: "/contratar-servico",
    queryParam: "servico",
  },
  professional: {
    title: <>Encontre <span className="text-primary">novos clientes</span> e expanda suas <span className="text-primary">oportunidades</span></>,
    subtitle: "Junte-se a centenas de profissionais e receba pedidos todos os dias",
    placeholder: 'Procure "domésticos", "beleza", "saúde"...',
    buttonText: "Começar",
    emptyRoute: "/registro-profissional",
    queryRoute: "/registro-profissional",
    queryParam: "categoria",
  },
};

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<HeroTab>("client");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const content = heroContent[activeTab];

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery === "") {
      navigate(content.emptyRoute);
      return;
    }

    try {
      searchSchema.parse({ query: trimmedQuery });
      const encodedQuery = encodeURIComponent(trimmedQuery);
      navigate(`${content.queryRoute}?${content.queryParam}=${encodedQuery}`);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    const encodedService = encodeURIComponent(serviceName);
    navigate(`${content.queryRoute}?${content.queryParam}=${encodedService}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTabChange = (tab: HeroTab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  return (
    <section className="relative bg-black overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Video Background */}
      <div className="absolute inset-0 opacity-40">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover lg:object-[center_30%]"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-32 md:pb-28 relative z-10 min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="max-w-3xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => handleTabChange("client")}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "client"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm"
              }`}
            >
              Contratar Serviço
            </button>
            <button
              onClick={() => handleTabChange("professional")}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "professional"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm"
              }`}
            >
              Trabalhe Conosco
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-white/90 mb-8">
            {content.subtitle}
          </p>

          {/* Search Bar */}
          <div className="flex gap-2">
            <ServiceAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={handleServiceSelect}
              onKeyPress={handleKeyPress}
              placeholder={content.placeholder}
            />
            <Button 
              size="lg"
              className="h-14 px-6 md:px-8 shadow__btn flex-shrink-0"
              onClick={handleSearch}
            >
              {content.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
