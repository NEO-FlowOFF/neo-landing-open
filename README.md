# NEØ FlowOFF Landing

Landing page em Astro para posicionar a proposta da NEØ FlowOFF como
infraestrutura digital orientada à conversão.

## Estrutura

```text
src/
  components/
  layouts/
  pages/
  styles/
public/
```

## Requisitos

- Node.js 20+
- npm 10+

## Comandos

```bash
cp .env.example .env
npm install
npm run dev
```

### Scripts disponíveis

- `npm run dev`: inicia o ambiente local
- `npm run build`: gera a versão de produção
- `npm run preview`: serve o build localmente
- `npm run check`: valida o projeto com Astro

## Observações

- Assets públicos devem ficar em `public/`
- Configure `WEB3FORMS_ACCESS_KEY` no `.env`
- O layout base está em `src/layouts/BaseLayout.astro`
- A página principal está em `src/pages/index.astro`
