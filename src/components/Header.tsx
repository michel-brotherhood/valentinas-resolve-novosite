import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/valentinas-logo.webp";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaY = touchStartY.current - touchEndY.current;
    const deltaX = touchStartX.current - touchEndX.current;
    // Close on swipe down or any horizontal swipe
    if (deltaY < -50 || Math.abs(deltaX) > 50) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-b from-black to-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3 group">
                <img src={logo} alt="Valentina's Resolve" className="h-10 w-auto transition-transform group-hover:scale-105" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden md:block">
                  Valentina's Resolve
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
                >
                  Início
                </Button>
              </Link>
              <Link to="/sobre">
                <Button 
                  variant="ghost" 
                  className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
                >
                  Sobre
                </Button>
              </Link>
              <Link to="/servicos">
                <Button 
                  variant="ghost" 
                  className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
                >
                  Serviços
                </Button>
              </Link>
              <Link to="/contabilidade">
                <Button 
                  variant="ghost" 
                  className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
                >
                  Contabilidade Integrada
                </Button>
              </Link>
              <Link to="/equipe">
                <Button 
                  variant="ghost" 
                  className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
                >
                  Equipe
                </Button>
              </Link>
              <Link to="/trabalhe-conosco">
                <Button 
                  variant="ghost" 
                  className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
                >
                  Trabalhe Conosco
                </Button>
              </Link>
              <Link to="/contato">
                <Button 
                  variant="ghost" 
                  className="text-white/90 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-sm"
                >
                  Contato
                </Button>
              </Link>
              <button 
                className="button-3d ml-2"
                onClick={() => {
                  navigate('/contratar-servico');
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                }}
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

      {/* Mobile Menu Overlay & Drawer */}
      {mobileMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed inset-0 bg-gradient-to-b from-black to-black/95 backdrop-blur-md z-50 md:hidden animate-fade-in overflow-y-auto"
          style={{ width: '100%', overflowX: 'hidden' }}
        >
          {/* Logo */}
          <div className="absolute top-6 left-6 z-50">
            <img src={logo} alt="Valentina's Resolve" className="h-8 w-auto" />
          </div>

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar Menu"
          >
            <span className="w-7 h-0.5 bg-white rotate-45 translate-y-0.5"></span>
            <span className="w-7 h-0.5 bg-white -rotate-45 -translate-y-0.5"></span>
          </button>

          <nav className="flex flex-col gap-2 pt-24 px-8 pb-6 h-full overflow-y-auto">
            <button
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg py-7 text-left px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => navigate('/'), 100);
              }}
            >
              Início
            </button>
            <button
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg py-7 text-left px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => navigate('/sobre'), 100);
              }}
            >
              Sobre
            </button>
            <button
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg py-7 text-left px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => navigate('/servicos'), 100);
              }}
            >
              Serviços
            </button>
            <button
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg py-7 text-left px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => navigate('/contabilidade'), 100);
              }}
            >
              Contabilidade Integrada
            </button>
            <button
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg py-7 text-left px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => navigate('/equipe'), 100);
              }}
            >
              Equipe
            </button>
            <button
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg py-7 text-left px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => navigate('/trabalhe-conosco'), 100);
              }}
            >
              Trabalhe Conosco
            </button>
            <button
              className="w-full justify-start text-white hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg py-7 text-left px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
                setTimeout(() => navigate('/contato'), 100);
              }}
            >
              Contato
            </button>
            <div className="mt-6">
              <button 
                className="button-3d w-full"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    navigate('/contratar-servico');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }, 100);
                }}
              >
                <span className="button-3d-top text-base">
                  Contratar Profissional
                </span>
                <span className="button-3d-bottom"></span>
                <span className="button-3d-base"></span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
