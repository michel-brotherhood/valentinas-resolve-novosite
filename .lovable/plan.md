

## Plano: Mapa Interativo de Rondônia acima do ProfessionalCallout

Criar uma seção com um mapa estilizado de Rondônia (inspirado na imagem enviada — fundo escuro, mapa dourado com pontos luminosos) posicionada na home acima da seção "Mais do que vender...".

### Abordagem

Usar a imagem enviada como base visual estática, com overlays interativos em CSS/HTML para os pontos das cidades. Cada cidade terá um ponto pulsante (glow animation) e um tooltip/label com o nome.

### Alterações

**1. Copiar a imagem para `src/assets/mapa-rondonia.webp`**

**2. Criar `src/components/ServiceAreaMap.tsx`**
- Seção com fundo escuro (`bg-black` ou `bg-gray-950`)
- Título: "Onde Atuamos" ou "Nossa Área de Atuação"
- Subtítulo: "Atendemos todo o estado de Rondônia"
- Imagem do mapa centralizada com max-width responsivo
- 4 pontos animados (CSS pulse/glow) posicionados sobre as cidades via `position: absolute` com coordenadas percentuais:
  - Porto Velho e região
  - Ariquemes e região
  - Ji-Paraná e região
  - Cacoal e região
- Labels das cidades com estilo de card escuro (como na imagem)
- Animação de entrada com scroll reveal
- Sem logo da Valentina's (já está no header)

**3. Editar `src/pages/Index.tsx`**
- Importar `ServiceAreaMap`
- Inserir `<ServiceAreaMap />` antes de `<ProfessionalCallout />`

### Arquivos
- **Copiar**: imagem → `src/assets/mapa-rondonia.webp`
- **Criar**: `src/components/ServiceAreaMap.tsx`
- **Editar**: `src/pages/Index.tsx`

