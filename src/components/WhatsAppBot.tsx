import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, ArrowRight } from "lucide-react";
import { ServiceSelect } from "@/components/ServiceSelect";

interface Message {
  from: "bot" | "user";
  text: string;
}

const STEPS = [
  { key: "name", question: "Olá! 👋 Qual é o seu nome?", type: "input" as const, placeholder: "Seu nome completo" },
  { key: "service", question: "Qual serviço você precisa?", type: "service" as const, placeholder: "" },
  { key: "description", question: "Descreva brevemente o que precisa ser feito:", type: "textarea" as const, placeholder: "Ex: Preciso de uma faxina completa no apartamento..." },
  { key: "city", question: "Qual sua cidade?", type: "input" as const, placeholder: "Ex: Porto Velho - RO" },
];

const WHATSAPP_NUMBER = "351961803414";

export function WhatsAppBot() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: STEPS[0].question },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping]);

  const advanceStep = (userAnswer: string) => {
    if (!userAnswer.trim()) return;

    const stepKey = STEPS[currentStep].key;
    const newAnswers = { ...answers, [stepKey]: userAnswer.trim() };
    setAnswers(newAnswers);

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: userAnswer.trim() }]);
    setInputValue("");

    const nextStep = currentStep + 1;

    if (nextStep < STEPS.length) {
      // Show typing indicator then next question
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { from: "bot", text: STEPS[nextStep].question }]);
        setCurrentStep(nextStep);
      }, 800);
    } else {
      // All steps done
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Perfeito! ✅ Clique no botão abaixo para enviar sua solicitação pelo WhatsApp." },
        ]);
        setIsComplete(true);
      }, 800);
    }
  };

  const handleSend = () => {
    advanceStep(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá! Vim pelo site Valentina's Resolve.\n` +
      `📋 *Solicitação de Serviço*\n` +
      `👤 Nome: ${answers.name}\n` +
      `🔧 Serviço: ${answers.service}\n` +
      `📝 Descrição: ${answers.description}\n` +
      `📍 Cidade: ${answers.city}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const step = STEPS[currentStep];

  return (
    <div className="flex flex-col h-[420px] max-h-[420px] rounded-lg border border-border bg-card overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(142,70%,40%)] text-white rounded-t-lg">
        <MessageCircle className="h-5 w-5" />
        <span className="font-bold text-sm">Assistente WhatsApp</span>
        <span className="ml-auto text-xs opacity-80">Online</span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border text-card-foreground rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border px-4 py-2 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-border bg-card">
        {isComplete ? (
          <Button onClick={openWhatsApp} className="w-full bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white font-bold gap-2">
            <MessageCircle className="h-4 w-4" />
            Enviar pelo WhatsApp
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : isTyping ? (
          <div className="text-sm text-muted-foreground text-center py-2">Digitando...</div>
        ) : step?.type === "service" ? (
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <ServiceSelect
                value={inputValue}
                onChange={(val) => {
                  setInputValue(val);
                  setTimeout(() => advanceStep(val), 100);
                }}
                placeholder="Selecione o serviço"
              />
            </div>
          </div>
        ) : step?.type === "textarea" ? (
          <div className="flex gap-2 items-end">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={step.placeholder}
              rows={2}
              className="flex-1 min-h-[40px] text-sm"
            />
            <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()} className="bg-primary hover:bg-primary/90 flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={step?.placeholder}
              className="flex-1 text-sm"
            />
            <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()} className="bg-primary hover:bg-primary/90 flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
