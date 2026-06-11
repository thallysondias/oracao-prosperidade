# Oracao Prosperidade

Aplicação Next.js para catálogo de orações, conteúdo autenticado, pedidos personalizados e processamento de compras via webhooks.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Supabase
- next-intl
- Zustand
- Stripe

## Estrutura atual

```text
app/                 rotas e handlers
components/          UI existente
features/            domínio por área de negócio
shared/config/       locales, links e configuração transversal
lib/                 compatibilidade com imports legados
docs/                documentação técnica
```

## Domínios principais

- `features/auth`: tipos de usuário e navegação autenticada
- `features/prayers`: catálogo e cards em destaque
- `features/prayer-requests`: criação e consulta de pedidos
- `features/webhooks`: integrações e normalização de eventos

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Próximos passos de organização

- Migrar mais componentes de `components/` para `features/.../components`
- Extrair os webhooks restantes para serviços dedicados
- Padronizar nomenclatura de rotas, assets e textos
- Revisar autenticação e remover senha importada de fallback

## Documentação

- Arquitetura: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

update de service role key