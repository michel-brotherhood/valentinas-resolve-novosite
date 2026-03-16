

## Plano: Restaurar Modo Dual (Clientes + Profissionais)

A plataforma está em modo temporário "somente profissionais". Vou restaurar os elementos voltados para clientes em todos os componentes afetados.

### Alterações por Componente

**1. Hero — Adicionar abas Cliente/Profissional**
- Adicionar tabs "Contratar Serviço" e "Trabalhe Conosco"
- Tab cliente: busca por serviços → navega para `/contratar-servico`
- Tab profissional: busca atual → navega para `/registro-profissional`
- Texto do hero muda conforme a aba selecionada

**2. Header — Adicionar link "Contratar Serviço"**
- Desktop: adicionar link "Contratar Serviço" na navegação (antes ou junto dos outros links)
- Mobile: adicionar botão "Contratar Serviço" no menu mobile
- Manter "Trabalhe Conosco" como CTA principal

**3. FloatingChat — Adicionar opção "Contratar Serviço"**
- Adicionar terceiro botão "Contratar um Serviço" que navega para `/contratar-servico`
- Manter "Tenho Dúvidas" e "Trabalhe Conosco"

**4. HowItWorks — Restaurar versão dual**
- Adicionar tabs ou duas seções: "Para Clientes" e "Para Profissionais"
- Para clientes: passos como "Escolha o serviço" → "Descreva sua necessidade" → "Receba orçamentos" → "Contrate com segurança"
- Para profissionais: manter os passos atuais

**5. Footer — Adicionar seção "Para Clientes"**
- Adicionar links: "Contratar Serviço", "Como Funciona" na coluna "Serviços"
- Ou criar coluna separada "Para Clientes"

**6. FAQ — Adicionar perguntas voltadas a clientes**
- Adicionar FAQs como "Como contrato um serviço?", "Como funciona o orçamento?"
- Já existem algumas perguntas de cliente (pagamento, cancelamento), então o impacto é menor

### Resumo Técnico
- 6 arquivos editados: `Hero.tsx`, `Header.tsx`, `FloatingChat.tsx`, `HowItWorks.tsx`, `Footer.tsx`, `FAQ.tsx`
- Nenhuma nova rota necessária (HireService já existe em `/contratar-servico`)
- Nenhuma mudança no banco de dados

