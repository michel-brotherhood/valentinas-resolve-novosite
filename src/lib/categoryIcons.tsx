import {
  Home,
  Sparkles,
  Heart,
  Scale,
  GraduationCap,
  Car,
  Dog,
  PartyPopper,
  Palette,
  Hammer,
  Truck,
  Sprout,
  Star,
  Plane,
  Dumbbell,
  LucideIcon
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "Domésticos": Home,
  "Beleza": Sparkles,
  "Saúde": Heart,
  "Jurídicos": Scale,
  "Educação": GraduationCap,
  "Automotivos": Car,
  "Pets": Dog,
  "Eventos": PartyPopper,
  "Criativos": Palette,
  "Construção": Hammer,
  "Transporte": Truck,
  "Agricultura": Sprout,
  "Personalizados": Star,
  "Turismo": Plane,
  "Esportes": Dumbbell,
};

export const getCategoryIcon = (category: string): LucideIcon => {
  return categoryIcons[category] || Home;
};
