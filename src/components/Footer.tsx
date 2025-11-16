import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo-v-3D.svg";
import { Link } from "react-router-dom";

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
            <p className="text-sm text-white/70 mb-2 text-center md:text-left">
              Negócios que conectam, resultados que transformam.
            </p>
            <p className="text-xs text-white/50 mb-2 text-center md:text-left">
              CNPJ: 35.677.143/0001-17
            </p>
            <p className="text-xs text-white/50 mb-1 text-center md:text-left">
              Telefone: (69) 99271-5000
            </p>
            <p className="text-xs text-white/50 mb-3 text-center md:text-left">
              Contabilidade: +351 961803400
            </p>
            <p className="text-xs text-white/50 mb-4 text-center md:text-left">
              200+ serviços especializados em 15 categorias
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
                <Link to="/servicos" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Catálogo de Serviços
                </Link>
              </li>
              <li>
                <Link to="/contabilidade" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Contabilidade Integrada
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Nossa Equipe
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="font-semibold text-white mb-4">Para Profissionais</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/trabalhe-conosco" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link to="/registro-profissional" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Institucional</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Sobre a Valentina's
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Nossa Equipe
                </Link>
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
