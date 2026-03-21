# Diretrizes de Design iOS-Like (Mobile 100%)

Este projeto segue rigorosamente a estética e o comportamento do ecossistema iOS da Apple para a experiência mobile. QUALQUER modificação ou novo componente deve aderir aos seguintes princípios:

## 1. Interações Táteis
- **Feedback Visual**: Todo botão ou elemento clicável deve ter uma escala suave de compressão (`scale(0.96)`) no estado `:active`.
- **Curvas (Squircle)**: Uso de raios de borda generosos (estilo iOS), variando entre `var(--radius-sm)` e `var(--radius-lg)`.

## 2. Glassmorphism & Depth
- **Blur Profundo**: Uso extensivo de `backdrop-filter: blur()` em headers, modais e menus.
- **Layers**: Elementos flutuantes devem ter sombras suaves (`box-shadow`) e bordas vítreas (`border: 1px solid rgba(255,255,255,0.1)`).

## 3. Navegação & Modais
- **Bottom Sheets**: Modais no mobile DEVEM se comportar como "Sheets" do iOS, deslizando de baixo para cima e ocupando a parte inferior da tela com um handle (`modal-handle`) centralizado no topo.
- **Header Slim**: A barra de navegação superior deve ser compacta, ocupando o mínimo de espaço vertical possível para focar no conteúdo.

## 4. Tipografia & Escala
- **Hierarchy**: Títulos com pesos fortes (`font-weight: 800` ou `900`) e corpo de texto limpo e legível.
- **Compactness**: No mobile, priorize layouts que aproveitem a largura total mas com paddings internos que evitem o aspecto "apertado".

> [!IMPORTANT]
> NUNCA use botões quadrados ou sombras duras. O site deve parecer um aplicativo nativo do iPhone Pro.
