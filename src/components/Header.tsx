import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import logo from "@/assets/valentinas-logo.webp";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    if (swipeDistance < -50) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
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
              className="md:hidden text-white z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Drawer */}
          <div 
            ref={menuRef}
            className={`fixed top-0 right-0 h-full w-[280px] bg-gradient-to-b from-black to-black/95 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <nav className="flex flex-col gap-1 pt-20 px-4 pb-6 h-full overflow-y-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base py-6"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/';
                }}
              >
                Início
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base py-6"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/sobre';
                }}
              >
                Sobre
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base py-6"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/servicos';
                }}
              >
                Serviços
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base py-6"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/contabilidade';
                }}
              >
                Contabilidade Integrada
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base py-6"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/equipe';
                }}
              >
                Equipe
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base py-6"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/trabalhe-conosco';
                }}
              >
                Trabalhe Conosco
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base py-6"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/contato';
                }}
              >
                Contato
              </Button>
              <div className="mt-4 px-2">
                <button 
                  className="button-3d w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/contato';
                  }}
                >
                  <span className="button-3d-top text-sm">
                    Contratar Profissional
                  </span>
                  <span className="button-3d-bottom"></span>
                  <span className="button-3d-base"></span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
