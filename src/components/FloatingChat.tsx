import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, HelpCircle, Briefcase, UserPlus } from "lucide-react";

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open("https://wa.me/5500000000000?text=Olá! Tenho dúvidas sobre a Valentina's Resolve", "_blank");
    setIsOpen(false);
  };

  const handleHireService = () => {
    window.location.href = "/contratar-profissional";
    setIsOpen(false);
  };

  const handleRegister = () => {
    window.location.href = "/registro-profissional";
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Options Menu */}
      {isOpen && (
        <Card className="absolute bottom-20 right-0 p-4 shadow-2xl w-72 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-2">
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold">Tenho Dúvidas</div>
                <div className="text-xs text-muted-foreground">Fale conosco no WhatsApp</div>
              </div>
            </Button>

            <Button
              onClick={handleHireService}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
            >
              <Briefcase className="h-5 w-5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold">Quero Contratar</div>
                <div className="text-xs text-muted-foreground">Solicite orçamento</div>
              </div>
            </Button>

            <Button
              onClick={handleRegister}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
            >
              <UserPlus className="h-5 w-5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold">Quero Me Cadastrar</div>
                <div className="text-xs text-muted-foreground">Seja um profissional</div>
              </div>
            </Button>
          </div>
        </Card>
      )}

      {/* Main Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-destructive hover:bg-destructive/90"
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};
