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
  Settings,
  HeartHandshake,
  Building2,
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
  "Instalações": Settings,
  "Transporte": Truck,
  "Agricultura": Sprout,
  "Personalizados": Star,
  "Turismo": Plane,
  "Esportes": Dumbbell,
  "Cuidado & Acompanhamento Humano": HeartHandshake,
  "Arquitetura, Engenharia & Design": Building2,
};

export const getCategoryIcon = (category: string): LucideIcon => {
  return categoryIcons[category] || Home;
};
