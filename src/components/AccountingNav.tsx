import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const sections = [
  { id: "hero", label: "Início" },
  { id: "professionals", label: "Profissionais" },
  { id: "business", label: "Empresas" },
  { id: "differentials", label: "Diferenciais" },
  { id: "testimonials", label: "Depoimentos" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Contato" }
];

export const AccountingNav = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-black/80 backdrop-blur-sm border border-primary/20 rounded-lg p-3 shadow-lg">
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary text-black font-semibold"
                  : "text-white/70 hover:text-primary hover:bg-primary/10"
              }`}
            >
              <ChevronRight 
                className={`h-4 w-4 transition-transform ${
                  activeSection === section.id ? "translate-x-1" : ""
                }`} 
              />
              <span className="text-sm whitespace-nowrap">{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
