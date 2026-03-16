

## Status do Banco de Dados

- **service_requests**: 0 registros (nenhum orçamento enviado ainda)
- **professionals**: 2 registros salvos

Os formulários **estão configurados para salvar** no banco de dados. A edge function `send-hire-service-email` envia o email e depois salva na tabela `service_requests`. Funciona corretamente — só não há envios de orçamento ainda.

---

## Plano: Botão WhatsApp Inteligente na Página de Orçamento

Adicionar uma seção alternativa na página `/contratar-servico` com um **fluxo conversacional tipo bot** que coleta dados passo a passo e no final abre o WhatsApp com a mensagem pré-montada.

### Como vai funcionar

1. Abaixo ou ao lado do formulário principal, adicionar um card com CTA "Prefere falar pelo WhatsApp?"
2. Ao clicar, abre um **mini-chat bot** (dentro da própria página) com etapas sequenciais:
   - Passo 1: "Qual seu nome?" → input
   - Passo 2: "Qual serviço precisa?" → ServiceSelect
   - Passo 3: "Descreva brevemente o que precisa" → textarea
   - Passo 4: "Qual sua cidade?" → input
3. Cada resposta aparece como "mensagem" no chat (estilo bolha)
4. No final, monta a mensagem e abre `https://wa.me/351961803414?text=...` com todos os dados coletados

### Alterações

**1. Criar componente `WhatsAppBot.tsx`**
- Estado com array de mensagens (bot + user)
- Stepper interno que avança a cada resposta
- Input dinâmico conforme o passo atual
- Animação de "digitando" do bot entre passos
- Botão final que abre WhatsApp com mensagem formatada

**2. Editar `HireService.tsx`**
- Adicionar seção após o formulário principal (ou como tab alternativa)
- Card com ícone do WhatsApp e texto "Prefere contratar pelo WhatsApp?"
- Ao clicar, exibe o `WhatsAppBot` inline

### Mensagem WhatsApp gerada

```text
Olá! Vim pelo site Valentina's Resolve.
📋 *Solicitação de Serviço*
👤 Nome: {nome}
🔧 Serviço: {servico}
📝 Descrição: {descricao}
📍 Cidade: {cidade}
```

### Arquivos
- **Criar**: `src/components/WhatsAppBot.tsx`
- **Editar**: `src/pages/HireService.tsx` (adicionar seção com o bot)

