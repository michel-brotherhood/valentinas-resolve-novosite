import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/valentinas-logo.webp";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3">
              <img src={logo} alt="Valentina's Resolve" className="h-12 w-auto" />
              <span className="text-xl font-bold text-foreground hidden md:block">
                Valentina's Resolve
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => {
                const element = document.getElementById('contabilidade-integrada');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contabilidade Integrada
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Registo Cliente
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Entrar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.location.href = '/registro-profissional'}
            >
              Registo Profissional
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
              className="w-full justify-start"
              onClick={() => {
                setMobileMenuOpen(false);
                const element = document.getElementById('contabilidade-integrada');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contabilidade Integrada
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Registo Cliente
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Entrar
            </Button>
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => window.location.href = '/registro-profissional'}
            >
              Registo Profissional
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
