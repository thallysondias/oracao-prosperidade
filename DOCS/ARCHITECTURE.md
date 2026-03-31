# Arquitetura

## Objetivo

Este projeto está sendo reorganizado para sair de uma estrutura orientada apenas por tipo técnico e evoluir para uma estrutura orientada por domínio.

## Domínios centrais

- `features/auth`: tipos de usuário, navegação autenticada e regras de acesso.
- `features/prayers`: catálogo, cards em destaque e regras de apresentação das orações.
- `features/prayer-requests`: criação e consulta de pedidos de oração.
- `features/webhooks`: integrações externas e processamento de eventos.
- `shared/config`: configuração transversal, locales e links externos.

## Diretrizes

- Componentes de UI não devem conter links de pagamento, regras de acesso ou persistência.
- Handlers de API devem delegar a lógica de negócio para `features/.../server`.
- Configuração externa deve ficar fora de componentes e fora de arquivos de rota.
- Sempre que possível, manter páginas em `app/` finas e componentes focados em renderização.
