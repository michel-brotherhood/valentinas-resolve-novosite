import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllServices } from "@/lib/servicesData";

interface ServiceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (serviceName: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const ServiceAutocomplete = ({
  value,
  onChange,
  onSelect,
  onKeyPress,
  placeholder,
}: ServiceAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredServices, setFilteredServices] = useState<Array<{
    name: string;
    description: string;
    category: string;
  }>>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const allServices = getAllServices();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    
    if (newValue.trim().length >= 2) {
      const filtered = allServices.filter(service =>
        service.name.toLowerCase().includes(newValue.toLowerCase()) ||
        service.description.toLowerCase().includes(newValue.toLowerCase()) ||
        service.category.toLowerCase().includes(newValue.toLowerCase())
      ).slice(0, 8); // Limitar a 8 sugestões
      
      setFilteredServices(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredServices([]);
    }
  };

  const handleSelectService = (serviceName: string) => {
    onChange(serviceName);
    setShowSuggestions(false);
    onSelect(serviceName);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          onFocus={() => {
            if (value.trim().length >= 2 && filteredServices.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="w-full pl-4 pr-12 py-6 text-base bg-white text-foreground rounded-lg border-2 border-border focus:border-primary transition-colors"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      {showSuggestions && filteredServices.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-background border-2 border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {filteredServices.map((service, index) => (
            <button
              key={index}
              onClick={() => handleSelectService(service.name)}
              className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0 focus:bg-secondary/70 focus:outline-none"
            >
              <div className="font-medium text-foreground">{service.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {service.category} • {service.description}
              </div>
            </button>
          ))}
        </div>
      )}

      {value.trim().length >= 2 && !showSuggestions && filteredServices.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-background border-2 border-border rounded-lg shadow-lg p-4">
          <p className="text-sm text-muted-foreground">
            Não encontramos esse serviço. Tente buscar por palavras-chave relacionadas.
          </p>
        </div>
      )}
    </div>
  );
};
