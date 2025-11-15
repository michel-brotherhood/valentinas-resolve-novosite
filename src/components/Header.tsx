import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/valentinas-logo.webp";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-black to-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Valentina's Resolve" className="h-10 w-auto transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden md:block">
                Valentina's Resolve
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
              onClick={() => window.location.href = '/'}
            >
              Início
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
              onClick={() => window.location.href = '/sobre'}
            >
              Sobre
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
              onClick={() => window.location.href = '/servicos'}
            >
              Serviços
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
              onClick={() => window.location.href = '/contabilidade'}
            >
              Contabilidade Integrada
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
              onClick={() => window.location.href = '/equipe'}
            >
              Equipe
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
              onClick={() => window.location.href = '/trabalhe-conosco'}
            >
              Trabalhe Conosco
            </Button>
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
              onClick={() => window.location.href = '/contato'}
            >
              Contato
            </Button>
            <button 
              className="button-3d ml-2"
              onClick={() => window.location.href = '/contato'}
            >
              <span className="button-3d-top text-sm">
                Contratar Profissional
              </span>
              <span className="button-3d-bottom"></span>
              <span className="button-3d-base"></span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-2 pb-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/';
              }}
            >
              Início
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/sobre';
              }}
            >
              Sobre
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/servicos';
              }}
            >
              Serviços
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/contabilidade';
              }}
            >
              Contabilidade Integrada
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/equipe';
              }}
            >
              Equipe
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/trabalhe-conosco';
              }}
            >
              Trabalhe Conosco
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/contato';
              }}
            >
              Contato
            </Button>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/contato';
              }}
            >
              Contratar Profissional
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
