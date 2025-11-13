/*
Projeto: Portal da Prosperidade Espiritual
Tipo: SaaS religioso low-ticket com entregas digitais
Plataforma: Webapp (estilo Holy Bible App)
Público: América Latina, Europa, EUA
Valor dos produtos: US$7 a US$37 (via Hotmart)

Resumo técnico:
- Frontend: Next.js 15 (App Router)
- Estilo: TailwindCSS com UI moderna e inspiradora
- Backend: Supabase (Auth, Storage, Postgres)
- Entregas: vídeos, séries, áudios gerados por IA
- Integrações: Hotmart (acesso pago), API de voz, WhatsApp

Fases do projeto:

1. Setup inicial (stack e layout base)
2. Sistema de autenticação com Supabase
3. Painel do usuário (dashboard com produtos)
4. Upload e exibição de vídeos/áudios
5. Envio de pedidos de oração
6. Integração com IA de voz (áudio personalizado)
7. Integração com Hotmart (webhook de liberação)
8. Integração com WhatsApp (entrega automática)
9. Finalização de UI e testes
10. Deploy e entrega da versão MVP

Tarefas imediatas (prioridade alta):

✅ Criar estrutura com Next.js 15 e TailwindCSS
✅ Conectar projeto ao Supabase
✅ Configurar Auth (login/senha via Supabase)
✅ Criar página protegida /dashboard
✅ Criar tabela 'produtos' no Supabase (modelo SaaS)
✅ Criar tabela 'compras' e lógica de acesso
✅ Criar lista de produtos visíveis no painel
✅ Reproduzir vídeos do Storage do Supabase
✅ Permitir compra direta (inicialmente fake/mock)
✅ Criar tabela 'pedidos_oracao'
✅ Criar formulário para envio de pedido de oração
✅ Mockar envio de áudio IA (arquivo mp3 no Storage)

Tarefas para fase 2:

🔄 Conectar webhook real da Hotmart
🔄 Implementar função de geração de áudio por IA
🔄 Implementar envio automático por WhatsApp
🔄 Adicionar sistema de assinatura mensal
🔄 Design responsivo para mobile-first
🔄 Implementar loading states, erro e UX final

Instruções para Copilot:

- Escreva código limpo e modular com padrão de pastas src/
- Use componentes client e server do App Router corretamente
- Evite hardcoded – sempre que possível use configs centralizadas
- Use TypeScript estrito e tipos de dados corretos
- Priorize segurança nas rotas protegidas e acesso a mídia
- Quando necessário, comente os trechos com explicações

Objetivo: Criar um SaaS funcional, bonito e rápido de escalar com foco em entrega digital religiosa.
*/
