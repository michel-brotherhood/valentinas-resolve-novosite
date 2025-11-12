import {
  Home,
  Sparkles,
  Heart,
  Scale,
  BookOpen,
  Car,
  PawPrint,
  PartyPopper,
  Palette,
  Construction,
  Truck,
  Wheat,
  UserCog,
  Plane,
  Dumbbell,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { icon: Home, name: "Domésticos" },
  { icon: Sparkles, name: "Beleza" },
  { icon: Heart, name: "Saúde" },
  { icon: Scale, name: "Jurídicos" },
  { icon: BookOpen, name: "Educação" },
  { icon: Car, name: "Automotivos" },
  { icon: PawPrint, name: "Pets" },
  { icon: PartyPopper, name: "Eventos" },
  { icon: Palette, name: "Criativos" },
  { icon: Construction, name: "Construção" },
  { icon: Truck, name: "Transporte" },
  { icon: Wheat, name: "Agricultura" },
  { icon: UserCog, name: "Personalizados" },
  { icon: Plane, name: "Turismo" },
  { icon: Dumbbell, name: "Esportes" },
];

export const Categories = () => {
  return (
    <section className="py-12 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Categorias de Serviços
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/servicos/${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-secondary transition-colors group border border-border"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
