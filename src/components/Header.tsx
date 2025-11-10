import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/valentinas-logo.webp";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-primary bg-black sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3">
              <img src={logo} alt="Valentina's Resolve" className="h-12 w-auto" />
              <span className="text-xl font-bold text-primary hidden md:block">
                Valentina's Resolve
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary hover:bg-primary/10"
              onClick={() => window.location.href = '/'}
            >
              Início
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary hover:bg-primary/10"
              onClick={() => window.location.href = '/sobre'}
            >
              Sobre
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary hover:bg-primary/10"
              onClick={() => window.location.href = '/servicos'}
            >
              Serviços
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary hover:bg-primary/10"
              onClick={() => window.location.href = '/contabilidade'}
            >
              Contabilidade Integrada
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary hover:bg-primary/10"
              onClick={() => window.location.href = '/equipe'}
            >
              Equipe
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary hover:bg-primary/10"
              onClick={() => window.location.href = '/trabalhe-conosco'}
            >
              Trabalhe Conosco
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary hover:bg-primary/10"
              onClick={() => window.location.href = '/contato'}
            >
              Contato
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-black font-bold ml-2"
              onClick={() => window.location.href = '/contato'}
            >
              Contratar Profissional
            </Button>
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
