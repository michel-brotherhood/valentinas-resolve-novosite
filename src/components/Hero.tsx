import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ServiceAutocomplete } from "@/components/ServiceAutocomplete";

const searchSchema = z.object({
  query: z.string().trim().min(2, "Digite pelo menos 2 caracteres").max(100, "Pesquisa muito longa"),
});

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"hire" | "register">("hire");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    
    // Allow empty search
    if (trimmedQuery === "") {
      if (activeTab === "register") {
        navigate('/registro-profissional');
      } else {
        navigate('/servicos');
      }
      return;
    }

    // Validate search query
    try {
      searchSchema.parse({ query: trimmedQuery });
      
      const encodedQuery = encodeURIComponent(trimmedQuery);
      
      if (activeTab === "register") {
        navigate(`/registro-profissional?categoria=${encodedQuery}`);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      } else {
        // Navega para o formulário com o serviço pré-selecionado
        navigate(`/contratar-servico?servico=${encodedQuery}`);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
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
    // Quando um serviço é selecionado, já navega direto
    const encodedService = encodeURIComponent(serviceName);
    if (activeTab === "register") {
      navigate(`/registro-profissional?categoria=${encodedService}`);
    } else {
      navigate(`/contratar-servico?servico=${encodedService}`);
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("hire")}
              className={`pb-2 px-1 font-medium text-lg transition-colors relative ${
                activeTab === "hire"
                  ? "text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Contratar profissionais
              {activeTab === "hire" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`pb-2 px-1 font-medium text-lg transition-colors relative ${
                activeTab === "register"
                  ? "text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Registar como profissional
              {activeTab === "register" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {activeTab === "hire" ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Encontre o profissional ideal para o seu projeto
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Negócios que conectam, resultados que transformam
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Encontre novos clientes e expanda o seu negócio
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Junte-se a centenas de profissionais e receba pedidos todos os dias
              </p>
            </>
          )}

          {/* Search Bar */}
          <div className="flex gap-2">
            <ServiceAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={handleServiceSelect}
              onKeyPress={handleKeyPress}
              placeholder={
                activeTab === "hire" 
                  ? 'Procure "contabilidade", "limpeza", "consultoria"...'
                  : 'Procure "domésticos", "beleza", "saúde"...'
              }
            />
            <Button 
              size="lg"
              className="h-14 px-6 md:px-8 shadow__btn flex-shrink-0"
              onClick={handleSearch}
            >
              {activeTab === "hire" ? "Buscar" : "Começar"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
