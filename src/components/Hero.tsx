import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"hire" | "register">("hire");

  return (
    <section className="relative bg-gradient-to-b from-hero-start to-hero-end overflow-hidden">
      <div className="absolute inset-0 opacity-20">
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
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("hire")}
              className={`pb-2 px-1 font-medium text-lg transition-colors relative ${
                activeTab === "hire"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contratar profissionais
              {activeTab === "hire" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`pb-2 px-1 font-medium text-lg transition-colors relative ${
                activeTab === "register"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Registar como profissional
              {activeTab === "register" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </button>
          </div>

          {activeTab === "hire" ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Encontre o profissional ideal para o seu projeto
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Negócios que conectam, resultados que transformam
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Encontre novos clientes e expanda o seu negócio
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Junte-se a centenas de profissionais e receba pedidos todos os dias
              </p>
            </>
          )}

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder='Procure "contabilidade", "limpeza", "consultoria"...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-4 pr-12 text-base bg-card border-border"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button 
              size="lg"
              className="h-14 px-8 bg-foreground hover:bg-foreground/90 text-background font-bold"
              onClick={() => {
                if (activeTab === "register") {
                  window.location.href = '/registro-profissional';
                }
              }}
            >
              Começar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
