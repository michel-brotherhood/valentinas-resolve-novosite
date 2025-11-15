import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu e-mail",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // TODO: Integrar com backend para salvar o e-mail
    setTimeout(() => {
      toast({
        title: "Sucesso!",
        description: "Você foi inscrito na nossa newsletter",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fique por dentro das novidades
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Receba em primeira mão dicas exclusivas, novos serviços e oportunidades especiais
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-background"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="lg"
              className="h-12 px-8 shadow__btn"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Inscrever-se"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            Não enviamos spam. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};
