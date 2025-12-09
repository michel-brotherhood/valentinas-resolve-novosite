import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllServices } from "@/lib/servicesData";

interface ServiceAreaAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

interface ServiceWithCategory {
  name: string;
  description: string;
  category: string;
  categoryId: string;
}

export const ServiceAreaAutocomplete = ({
  value,
  onChange,
  error,
  placeholder = "Digite para buscar um serviço..."
}: ServiceAreaAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredServices, setFilteredServices] = useState<ServiceWithCategory[]>([]);
  const [inputValue, setInputValue] = useState(value);
  const componentRef = useRef<HTMLDivElement>(null);

  const allServices = getAllServices();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setInputValue(searchValue);
    
    // Clear the form value when typing (only valid when selected)
    onChange("");

    if (searchValue.length >= 2) {
      const filtered = allServices.filter(service =>
        service.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        service.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredServices(filtered.slice(0, 10)); // Limit to 10 results
      setShowSuggestions(true);
    } else {
      setFilteredServices([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectService = (service: ServiceWithCategory) => {
    setInputValue(service.name);
    onChange(service.name);
    setShowSuggestions(false);
    setFilteredServices([]);
  };

  // Group services by category for display
  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceWithCategory[]>);

  return (
    <div ref={componentRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (inputValue.length >= 2 && filteredServices.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className={`pl-10 ${error ? 'border-destructive' : ''}`}
        />
      </div>

      {showSuggestions && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {Object.keys(groupedServices).length > 0 ? (
            Object.entries(groupedServices).map(([category, services]) => (
              <div key={category}>
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                  {category}
                </div>
                {services.map((service, index) => (
                  <button
                    key={`${service.categoryId}-${index}`}
                    type="button"
                    onClick={() => handleSelectService(service)}
                    className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex flex-col"
                  >
                    <span className="font-medium text-foreground">{service.name}</span>
                    <span className="text-xs text-muted-foreground">{service.description}</span>
                  </button>
                ))}
              </div>
            ))
          ) : (
            <div className="px-3 py-4 text-center text-muted-foreground">
              <p className="font-medium">Serviço não encontrado</p>
              <p className="text-sm mt-1">Tente palavras-chave relacionadas à sua área de atuação.</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};
