import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, HelpCircle, Briefcase, UserPlus } from "lucide-react";

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open("https://wa.me/5500000000000?text=Olá! Tenho dúvidas sobre a Valentina's Resolve", "_blank");
    setIsOpen(false);
  };

  const handleHireService = () => {
    navigate("/contratar-servico");
    setIsOpen(false);
  };

  const handleRegister = () => {
    navigate("/registro-profissional");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Options Menu */}
      {isOpen && (
        <Card className="absolute bottom-24 right-0 p-5 shadow-2xl w-80 animate-in fade-in slide-in-from-bottom-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="space-y-3">
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 px-4 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300 group border-muted-foreground/20 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <HelpCircle className="h-5 w-5 flex-shrink-0 text-primary" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-foreground">Tenho Dúvidas</div>
                <div className="text-xs text-muted-foreground">Fale conosco no WhatsApp</div>
              </div>
            </Button>

            <Button
              onClick={handleHireService}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 px-4 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300 group border-muted-foreground/20 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Briefcase className="h-5 w-5 flex-shrink-0 text-primary" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-foreground">Quero Contratar</div>
                <div className="text-xs text-muted-foreground">Solicite orçamento</div>
              </div>
            </Button>

            <Button
              onClick={handleRegister}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 px-4 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300 group border-muted-foreground/20 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <UserPlus className="h-5 w-5 flex-shrink-0 text-primary" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-foreground">Quero Me Cadastrar</div>
                <div className="text-xs text-muted-foreground">Seja um profissional</div>
              </div>
            </Button>
          </div>
        </Card>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${
          isOpen
            ? "bg-gradient-to-br from-destructive to-destructive/80 rotate-90"
            : "bg-gradient-to-br from-primary via-primary to-primary/80 hover:shadow-primary/50"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
        <div className="relative flex items-center justify-center h-full">
          {isOpen ? (
            <X className="h-6 w-6 text-white transition-transform duration-300" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white transition-transform duration-300" />
          )}
        </div>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent animate-pulse" />
        )}
      </button>
    </div>
  );
};
