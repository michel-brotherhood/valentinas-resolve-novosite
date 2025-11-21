import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { FileText, AlertCircle, Scale, CheckCircle, XCircle, Shield } from "lucide-react";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-1 py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 mb-4">
              <Scale className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground">
              Última atualização: Dezembro de 2024
            </p>
          </div>

          <Card className="p-6 md:p-8 space-y-8">
            {/* Introdução */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">1. Aceitação dos Termos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Bem-vindo à Valentina's Resolve. Ao acessar e utilizar nossa plataforma, você concorda em cumprir e estar 
                vinculado aos seguintes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve 
                utilizar nossos serviços. Estes termos se aplicam a todos os usuários da plataforma, incluindo clientes 
                e profissionais cadastrados.
              </p>
            </section>

            {/* Descrição dos Serviços */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">2. Descrição dos Serviços</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A Valentina's Resolve é uma plataforma de intermediação que conecta clientes a profissionais qualificados 
                  em diversas áreas de serviços. Nossa plataforma:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Intermedia o contato entre clientes e profissionais</li>
                  <li>Facilita a solicitação e fornecimento de orçamentos</li>
                  <li>Gerencia o pagamento e execução dos serviços contratados</li>
                  <li>Oferece suporte durante todo o processo</li>
                </ul>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                  <p className="text-sm text-foreground font-semibold mb-2">⚠️ Importante:</p>
                  <p className="text-sm text-muted-foreground">
                    A Valentina's Resolve atua exclusivamente como intermediadora. Não somos prestadores diretos dos serviços 
                    e não nos responsabilizamos pela execução técnica realizada pelos profissionais cadastrados.
                  </p>
                </div>
              </div>
            </section>

            {/* Cadastro e Conta */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">3. Cadastro e Conta de Usuário</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.1 Requisitos</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Ser maior de 18 anos ou ter autorização de responsável legal</li>
                    <li>Fornecer informações verdadeiras, precisas e completas</li>
                    <li>Manter suas informações atualizadas</li>
                    <li>Manter a confidencialidade de sua conta</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.2 Responsabilidades</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Você é responsável por todas as atividades realizadas através de sua conta. Em caso de uso não autorizado, 
                    notifique-nos imediatamente através dos canais de contato disponíveis.
                  </p>
                </div>
              </div>
            </section>

            {/* Uso da Plataforma */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">4. Uso Aceitável da Plataforma</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Você PODE:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-8">
                    <li>Solicitar orçamentos para serviços legítimos</li>
                    <li>Contratar profissionais através da plataforma</li>
                    <li>Avaliar serviços recebidos de forma honesta</li>
                    <li>Comunicar-se respeitosamente com outros usuários</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    Você NÃO PODE:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-8">
                    <li>Usar a plataforma para atividades ilegais</li>
                    <li>Fornecer informações falsas ou enganosas</li>
                    <li>Tentar burlar nosso sistema de pagamento</li>
                    <li>Contatar profissionais diretamente para evitar nossas taxas</li>
                    <li>Publicar conteúdo ofensivo, discriminatório ou abusivo</li>
                    <li>Tentar acessar contas ou dados de outros usuários</li>
                    <li>Usar bots, scripts ou ferramentas automatizadas</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pagamentos e Tarifas */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">5. Pagamentos e Tarifas</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Os pagamentos pelos serviços são processados através da plataforma Valentina's Resolve. Ao contratar um serviço:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>O pagamento deve ser feito exclusivamente através da plataforma</li>
                  <li>As tarifas e condições de pagamento serão informadas antes da confirmação</li>
                  <li>A liberação do pagamento ao profissional ocorre após confirmação da execução do serviço</li>
                  <li>Reembolsos seguem nossa política específica de cancelamento</li>
                </ul>
              </div>
            </section>

            {/* Responsabilidades */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">6. Limitação de Responsabilidade</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A Valentina's Resolve não se responsabiliza por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>A qualidade técnica dos serviços executados pelos profissionais</li>
                  <li>Danos causados durante a execução dos serviços</li>
                  <li>Disputas diretas entre clientes e profissionais</li>
                  <li>Problemas decorrentes de informações incorretas fornecidas pelos usuários</li>
                  <li>Interrupções temporárias na disponibilidade da plataforma</li>
                </ul>
                <div className="bg-muted/50 border border-border rounded-lg p-4 mt-4">
                  <p className="text-sm text-foreground">
                    <strong>Mediação:</strong> Embora não sejamos responsáveis pela execução dos serviços, nos comprometemos 
                    a mediar conflitos entre clientes e profissionais, buscando soluções justas para ambas as partes.
                  </p>
                </div>
              </div>
            </section>

            {/* Propriedade Intelectual */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">7. Propriedade Intelectual</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Todo o conteúdo da plataforma Valentina's Resolve, incluindo design, logotipos, textos, gráficos e código, 
                é propriedade da Valentina's Resolve ou de seus licenciadores e está protegido por leis de direitos autorais 
                e propriedade intelectual. É proibida a reprodução não autorizada.
              </p>
            </section>

            {/* Cancelamento e Suspensão */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">8. Cancelamento e Suspensão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Reservamo-nos o direito de suspender ou cancelar sua conta, a qualquer momento, caso:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Você viole qualquer um destes Termos de Uso</li>
                <li>Seja detectada atividade fraudulenta ou suspeita</li>
                <li>Haja inadimplência de pagamentos</li>
                <li>Seja necessário por razões legais ou regulatórias</li>
              </ul>
            </section>

            {/* Modificações */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">9. Alterações nos Termos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Podemos modificar estes Termos de Uso periodicamente. As alterações entrarão em vigor imediatamente após 
                publicação na plataforma. O uso continuado dos serviços após as modificações constitui aceitação dos novos termos.
              </p>
            </section>

            {/* Lei Aplicável */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">10. Lei Aplicável</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida 
                nos tribunais competentes da comarca de Ouro Preto do Oeste - RO.
              </p>
            </section>

            {/* Contato */}
            <section className="border-t border-border pt-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">11. Dúvidas sobre os Termos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="text-foreground">
                  <strong>Valentina's Resolve</strong>
                </p>
                <p className="text-muted-foreground text-sm">
                  E-mail: atendimentoaocliente@valentinasresolve.com.br
                </p>
                <p className="text-muted-foreground text-sm">
                  Telefone: +351 961803414
                </p>
                <p className="text-muted-foreground text-sm">
                  Endereço: Rua Osvaldo Cruz, 770 - Ouro Preto do Oeste - RO, 76.920-000
                </p>
              </div>
            </section>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
