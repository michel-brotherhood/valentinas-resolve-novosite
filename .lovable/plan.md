

## Plano: Ajustes no Mapa e na seção de Testimonials

### 1. ServiceAreaMap.tsx — Remover fundo preto + melhorar responsividade

- Trocar `bg-[hsl(0,0%,5%)]` por `bg-background` para seguir o tema do site (sem fundo preto forçado)
- Ajustar textos do header para usar `text-foreground` e `text-muted-foreground` em vez de `text-white`
- Melhorar responsividade: reduzir padding em mobile, ajustar tamanho dos markers e labels para telas menores
- Labels das cidades sempre visíveis (não só no hover) em mobile

### 2. Testimonials.tsx — Remover estrelas do header + melhorar formatação

- Remover o bloco das 5 estrelas grandes acima do título (linhas 142-146)
- Melhorar espaçamento e tipografia do header (título e subtítulo)
- Ajustar o card de estatísticas na parte inferior para melhor formatação visual

### Arquivos alterados
- `src/components/ServiceAreaMap.tsx`
- `src/components/Testimonials.tsx`

