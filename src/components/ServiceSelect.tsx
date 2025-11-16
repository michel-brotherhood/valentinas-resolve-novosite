import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllServices } from "@/lib/servicesData";

interface ServiceSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ServiceSelect = ({ value, onChange, placeholder = "Selecione um serviço" }: ServiceSelectProps) => {
  const allServices = getAllServices();

  // Agrupar serviços por categoria
  const servicesByCategory = allServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof allServices>);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        {Object.entries(servicesByCategory).map(([category, services]) => (
          <div key={category}>
            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
              {category}
            </div>
            {services.map((service, index) => (
              <SelectItem 
                key={`${category}-${index}`} 
                value={service.name}
                className="pl-6"
              >
                {service.name}
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};
