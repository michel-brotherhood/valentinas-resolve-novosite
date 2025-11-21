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
  LucideIcon
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "LIMPEZAS": Sparkles,
  "MANUTENÇÃO": Wrench,
  "REPARO": Wrench,
  "CONSTRUÇÃO": HardHat,
  "INSTALAÇÕES": Settings,
  "BELEZA & ESTÉTICA": Sparkles,
  "JURÍDICO": Scale,
  "CONSULTORIAS": Briefcase,
  "SAÚDE & BEM-ESTAR": Heart,
  "EDUCAÇÃO": GraduationCap,
  "AUTOMOTIVOS": Car,
  "PETS": Dog,
  "EVENTOS": PartyPopper,
  "CRIATIVOS & DIGITAIS": Palette,
  "TRANSPORTE": Truck,
  "AGRICULTURA & PECUÁRIA": Tractor,
  "LAZER & TURISMO": Plane,
  "ESPORTIVOS": Dumbbell,
  "CUIDADO & ACOMPANHAMENTO HUMANO": HeartHandshake,
  "ARQUITETURA, ENGENHARIA & DESIGN": Building2,
};

export const getCategoryIcon = (category: string): LucideIcon => {
  return categoryIcons[category] || Sparkles;
};
