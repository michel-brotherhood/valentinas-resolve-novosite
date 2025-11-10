import { Home, Heart, PartyPopper, BookOpen, Briefcase, Building2 } from "lucide-react";

const categories = [
  { name: "Casa", icon: Home },
  { name: "Bem-estar", icon: Heart },
  { name: "Eventos", icon: PartyPopper },
  { name: "Aulas", icon: BookOpen },
  { name: "Empresas", icon: Building2 },
  { name: "Negócios", icon: Briefcase },
];

export const Categories = () => {
  return (
    <section className="py-8 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-secondary transition-colors group"
            >
              <category.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-foreground">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
