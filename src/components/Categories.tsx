import {
  Sparkles,
  Heart,
  Scale,
  GraduationCap,
  Car,
  Dog,
  PartyPopper,
  Palette,
  Truck,
  Plane,
  Dumbbell,
  Settings,
  HeartHandshake,
  Building2,
  Wrench,
  HardHat,
  Briefcase,
  Tractor,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { icon: Sparkles, name: "LIMPEZAS" },
  { icon: Wrench, name: "MANUTENÇÃO" },
  { icon: Wrench, name: "REPARO" },
  { icon: HardHat, name: "CONSTRUÇÃO" },
  { icon: Settings, name: "INSTALAÇÕES" },
  { icon: Sparkles, name: "BELEZA & ESTÉTICA" },
  { icon: Scale, name: "JURÍDICO" },
  { icon: Briefcase, name: "CONSULTORIAS" },
  { icon: Heart, name: "SAÚDE & BEM-ESTAR" },
  { icon: GraduationCap, name: "EDUCAÇÃO" },
  { icon: Car, name: "AUTOMOTIVOS" },
  { icon: Dog, name: "PETS" },
  { icon: PartyPopper, name: "EVENTOS" },
  { icon: Palette, name: "CRIATIVOS & DIGITAIS" },
  { icon: Truck, name: "TRANSPORTE" },
  { icon: Tractor, name: "AGRICULTURA & PECUÁRIA" },
  { icon: Plane, name: "LAZER & TURISMO" },
  { icon: Dumbbell, name: "ESPORTIVOS" },
  { icon: HeartHandshake, name: "CUIDADO & ACOMPANHAMENTO HUMANO" },
  { icon: Building2, name: "ARQUITETURA, ENGENHARIA & DESIGN" },
];

export const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Nichos de Serviços
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-border"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-24 sm:w-32" />
                </div>
              ))
            : categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/servicos?categoria=${encodeURIComponent(category.name)}`}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg hover:bg-secondary transition-colors group border border-border"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                    <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground text-center">
                    {category.name}
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};
