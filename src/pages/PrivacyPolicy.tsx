import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Cookie, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-1 py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Política de Privacidade
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
                <h2 className="text-2xl font-bold text-foreground">1. Introdução</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A Valentina's Resolve está comprometida em proteger a privacidade e os dados pessoais de nossos usuários. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações 
                quando você utiliza nossa plataforma de intermediação de serviços profissionais.
              </p>
            </section>

            {/* Coleta de Dados */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">2. Dados Coletados</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.1 Dados Fornecidos por Você</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Nome completo</li>
                    <li>E-mail</li>
                    <li>Telefone/WhatsApp</li>
                    <li>Endereço (cidade, bairro)</li>
                    <li>Informações sobre serviços solicitados</li>
                    <li>Documentos e certificados (para profissionais)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.2 Dados Coletados Automaticamente</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador e dispositivo</li>
                    <li>Páginas visitadas e tempo de navegação</li>
                    <li>Localização geográfica aproximada</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Uso dos Dados */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">3. Uso dos Dados</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos seus dados pessoais para as seguintes finalidades:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Intermediar o contato entre clientes e profissionais</li>
                <li>Processar solicitações de orçamentos e serviços</li>
                <li>Enviar comunicações relacionadas aos serviços contratados</li>
                <li>Melhorar e personalizar sua experiência na plataforma</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Prevenir fraudes e garantir a segurança da plataforma</li>
                <li>Realizar análises estatísticas e de mercado</li>
              </ul>
            </section>

            {/* Compartilhamento */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">4. Compartilhamento de Dados</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Seus dados pessoais podem ser compartilhados nas seguintes situações:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Com profissionais parceiros:</strong> Para viabilizar o orçamento e execução dos serviços solicitados
                </li>
                <li>
                  <strong>Com prestadores de serviços:</strong> Empresas que nos auxiliam em operações como envio de e-mails, 
                  hospedagem e processamento de pagamentos
                </li>
                <li>
                  <strong>Por exigência legal:</strong> Quando necessário para cumprir ordens judiciais ou requisições legais
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Importante:</strong> Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros 
                para fins de marketing.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">5. Cookies e Tecnologias Similares</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Manter você conectado à plataforma</li>
                <li>Lembrar suas preferências</li>
                <li>Analisar o uso da plataforma</li>
                <li>Melhorar a performance e segurança</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            {/* Segurança */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">6. Segurança dos Dados</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra 
                acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia de dados, 
                controles de acesso rigorosos e monitoramento contínuo de segurança.
              </p>
            </section>

            {/* Seus Direitos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">7. Seus Direitos (LGPD)</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Solicitar a portabilidade dos dados</li>
                <li>Revogar o consentimento</li>
                <li>Ser informado sobre compartilhamento de dados</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Para exercer seus direitos, entre em contato conosco através do e-mail:{" "}
                <a href="mailto:atendimentoaocliente@valentinasresolve.com.br" className="text-primary hover:underline">
                  atendimentoaocliente@valentinasresolve.com.br
                </a>
              </p>
            </section>

            {/* Retenção */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">8. Retenção de Dados</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, 
                salvo se houver obrigação legal de retenção por período maior. Após esse período, seus dados serão 
                excluídos ou anonimizados de forma segura.
              </p>
            </section>

            {/* Alterações */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">9. Alterações nesta Política</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas 
                ou por razões operacionais, legais ou regulatórias. Notificaremos você sobre alterações significativas 
                através do e-mail cadastrado ou por meio de aviso em nossa plataforma.
              </p>
            </section>

            {/* Contato */}
            <section className="border-t border-border pt-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">10. Entre em Contato</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, 
                entre em contato conosco:
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
