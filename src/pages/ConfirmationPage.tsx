import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  
  const type = searchParams.get("type") || "contact";
  
  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const getContent = () => {
    switch (type) {
      case "professional":
        return {
          title: "Cadastro Enviado com Sucesso!",
          message: "Recebemos seu cadastro de profissional. Nossa equipe analisará suas informações e entrará em contato em breve.",
          nextSteps: [
            "✓ Análise da documentação enviada",
            "✓ Verificação de certificações",
            "✓ Contato via WhatsApp ou email",
            "✓ Orientações sobre próximos passos"
          ],
          whatsapp: "5569992715000",
          whatsappLabel: "Falar com Suporte"
        };
      case "accounting":
        return {
          title: "Solicitação Enviada com Sucesso!",
          message: "Recebemos sua solicitação de proposta de contabilidade integrada. Nossa equipe entrará em contato em breve.",
          nextSteps: [
            "✓ Análise do seu perfil",
            "✓ Elaboração de proposta personalizada",
            "✓ Contato via WhatsApp ou email",
            "✓ Agendamento de reunião"
          ],
          whatsapp: "351961803400",
          whatsappLabel: "Falar no WhatsApp"
        };
      case "hire":
        return {
          title: "Orçamento Solicitado com Sucesso!",
          message: "Recebemos sua solicitação de orçamento. Em breve um de nossos especialistas entrará em contato.",
          nextSteps: [
            "✓ Análise da sua solicitação",
            "✓ Seleção de profissionais qualificados",
            "✓ Contato via WhatsApp ou telefone",
            "✓ Apresentação de orçamento personalizado"
          ],
          whatsapp: "5569992715000",
          whatsappLabel: "Falar com Atendimento"
        };
      default: // contact
        return {
          title: "Mensagem Enviada com Sucesso!",
          message: "Recebemos sua mensagem e retornaremos o mais breve possível.",
          nextSteps: [
            "✓ Análise da sua mensagem",
            "✓ Direcionamento para equipe responsável",
            "✓ Resposta em até 24 horas",
            "✓ Acompanhamento personalizado"
          ],
          whatsapp: "5569992715000",
          whatsappLabel: "Falar no WhatsApp"
        };
    }
  };

  const content = getContent();
  const whatsappUrl = `https://wa.me/${content.whatsapp}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/5">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className={`max-w-2xl w-full p-8 md:p-12 bg-card/80 backdrop-blur-sm border-2 transition-all duration-500 ${showContent ? 'animate-scale-in opacity-100' : 'opacity-0'}`}>
          {/* Success Icon */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="relative">
              <CheckCircle2 className="h-20 w-20 text-primary animate-scale-in" />
              <div className="absolute inset-0 h-20 w-20 text-primary animate-ping opacity-20" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
            {content.title}
          </h1>

          {/* Message */}
          <p className="text-center text-muted-foreground text-lg mb-8 animate-fade-in">
            {content.message}
          </p>

          {/* Next Steps */}
          <div className="bg-accent/10 rounded-lg p-6 mb-8 animate-fade-in">
            <h2 className="font-semibold text-lg mb-4 text-foreground">
              Próximos Passos:
            </h2>
            <ul className="space-y-3">
              {content.nextSteps.map((step, index) => (
                <li 
                  key={index} 
                  className="text-muted-foreground animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Button */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button
              onClick={() => window.open(whatsappUrl, '_blank')}
              className="flex-1 h-12 text-base gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <MessageCircle className="h-5 w-5" />
              {content.whatsappLabel}
            </Button>
            
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 h-12 text-base gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar ao Início
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-center text-sm text-muted-foreground mt-8 animate-fade-in">
            Dúvidas? Entre em contato pelo WhatsApp ou aguarde nosso retorno.
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
