import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "Como funciona a plataforma Valentina's Resolve?",
    answer: "A Valentina's Resolve conecta clientes a profissionais qualificados em mais de 148 serviços diferentes. Você descreve o que precisa, recebe orçamentos de profissionais verificados, compara propostas e escolhe o melhor para você. Tudo de forma digital, segura e transparente."
  },
  {
    question: "Quais serviços estão disponíveis na plataforma?",
    answer: "Oferecemos 148+ serviços em 15 categorias: Domésticos, Beleza, Saúde, Jurídicos, Educação, Automotivos, Pets, Eventos, Criativos, Construção, Transporte, Agricultura, Personalizados, Turismo e Esportes. Desde limpeza residencial até consultoria jurídica e contabilidade integrada."
  },
  {
    question: "Como os profissionais são verificados?",
    answer: "Todos os profissionais passam por um processo rigoroso de verificação que inclui: análise de documentos, verificação de qualificações, checagem de referências e avaliação de experiência. Também monitoramos as avaliações dos clientes para garantir a qualidade contínua dos serviços."
  },
  {
    question: "Quanto custa usar a plataforma?",
    answer: "Para clientes, é gratuito solicitar orçamentos e comparar propostas. Você só paga pelo serviço contratado diretamente com o profissional. Para profissionais, oferecemos diferentes planos de assinatura com acesso a solicitações de serviços e ferramentas de gestão."
  },
  {
    question: "Como funciona a Contabilidade Integrada?",
    answer: "A Contabilidade Integrada é um serviço exclusivo liderado pela contadora Andressa Melo. É 100% digital e oferece abertura de CNPJ, planejamento tributário, emissão de notas fiscais, relatórios mensais e suporte personalizado. Ideal para profissionais da plataforma e empresas que buscam gestão contábil moderna."
  },
  {
    question: "Como me cadastro como profissional?",
    answer: "O cadastro é simples e feito em 4 etapas: (1) Preencha seus dados pessoais, (2) Informe suas qualificações e experiência, (3) Selecione as categorias de serviços que você oferece, (4) Envie documentos e portfólio. Após análise (até 48h), você receberá um email confirmando a aprovação."
  },
  {
    question: "Como solicito um orçamento?",
    answer: "Acesse a plataforma, descreva o serviço que você precisa, informe sua localização e preferências. Os profissionais qualificados receberão sua solicitação e enviarão orçamentos. Você pode comparar propostas, ver avaliações e escolher o melhor profissional para você."
  },
  {
    question: "Qual a garantia de qualidade dos serviços?",
    answer: "Trabalhamos apenas com profissionais verificados e monitoramos constantemente as avaliações. Se você não ficar satisfeito com o serviço, oferecemos suporte para resolução de problemas. Nossa equipe está sempre disponível para garantir a melhor experiência."
  },
  {
    question: "Posso cancelar ou reagendar um serviço?",
    answer: "Sim! Você pode cancelar ou reagendar diretamente com o profissional contratado. Recomendamos fazer isso com antecedência mínima de 24 horas. As políticas de cancelamento podem variar de acordo com o tipo de serviço e o profissional."
  },
  {
    question: "Como funciona o pagamento?",
    answer: "O pagamento é combinado diretamente entre cliente e profissional. Aceitamos diversas formas de pagamento: dinheiro, PIX, cartão de crédito/débito e transferência bancária. A plataforma facilita a conexão, e o pagamento é feito de forma segura após a conclusão do serviço."
  },
  {
    question: "A plataforma atende em quais regiões?",
    answer: "Atendemos em todo o Brasil, com foco especial em áreas urbanas, rurais e regiões com acesso fluvial. A disponibilidade de profissionais pode variar por região. Ao fazer sua solicitação, você verá os profissionais disponíveis na sua área."
  },
  {
    question: "Como entro em contato com o suporte?",
    answer: "Você pode entrar em contato conosco através do WhatsApp, email (contato@valentinasresolve.com.br), formulário no site ou pelo chat flutuante disponível em todas as páginas. Nossa equipe está pronta para ajudar de segunda a sexta, das 8h às 18h."
  },
];

export const FAQ = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre a plataforma, serviços e como começar
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-4 md:p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-lg px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <a
            href="https://wa.me/5569992715000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Entre em contato conosco →
          </a>
        </div>
      </div>
    </section>
  );
};
