import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/valentinas-logo.webp";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info with Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <img src={logo} alt="Valentina's Resolve" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-white/70 mb-3 text-center md:text-left">
              Negócios que conectam, resultados que transformam.
            </p>
            <p className="text-xs text-white/50 mb-4 text-center md:text-left">
              148+ serviços especializados em 15 categorias
            </p>
            <a 
              href="https://www.instagram.com/valentinasresolve.brasil/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors"
              aria-label="Instagram Valentina's Resolve"
            >
              <Instagram className="h-6 w-6" />
              <span className="text-sm">@valentinasresolve.brasil</span>
            </a>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="font-semibold text-white mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <a href="/servicos" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Catálogo de Serviços
                </a>
              </li>
              <li>
                <a href="/contabilidade" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Contabilidade Integrada
                </a>
              </li>
              <li>
                <a href="/sobre" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="/equipe" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Nossa Equipe
                </a>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="font-semibold text-white mb-4">Para Profissionais</h4>
            <ul className="space-y-2">
              <li>
                <a href="/trabalhe-conosco" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Trabalhe Conosco
                </a>
              </li>
              <li>
                <a href="/registro-profissional" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Cadastre-se
                </a>
              </li>
              <li>
                <a href="/contato" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Institucional</h4>
            <ul className="space-y-2">
              <li>
                <a href="/sobre" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Sobre a Valentina's
                </a>
              </li>
              <li>
                <a href="/contato" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="/equipe" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Nossa Equipe
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-20 border-t border-white/10 text-center">
          <p className="text-sm text-white/60">
            © 2025 Valentina's Resolve. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
