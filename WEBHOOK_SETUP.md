# Sistema de Webhook e Autenticação

## Estrutura das Tabelas

### Tabela: `profiles`
Armazena os perfis dos usuários que compraram produtos.

```sql
- id (UUID)
- email (TEXT, UNIQUE)
- name (TEXT)
- password (TEXT, default: "benedito")
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: `purchases`
Registra todas as compras realizadas.

```sql
- id (UUID)
- profile_id (UUID, FK para profiles)
- email (TEXT)
- product_id (TEXT)
- product_name (TEXT)
- transaction_id (TEXT, UNIQUE)
- status (TEXT) - approved, cancelled, refunded, chargeback, pending
- purchase_data (JSONB) - dados completos do webhook
- purchased_at (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Configuração do Supabase

### 1. Executar a Migration

Copie o conteúdo de `supabase/migrations/001_create_profiles_and_purchases.sql` e execute no SQL Editor do Supabase.

### 2. Verificar as Tabelas

Após executar a migration, você terá:
- ✅ Tabelas `profiles` e `purchases` criadas
- ✅ Índices para otimizar consultas
- ✅ Row Level Security (RLS) habilitado
- ✅ Políticas de acesso configuradas
- ✅ Funções helper para consultas
- ✅ View `user_products` para dados agregados

### 3. Verificar Funções Criadas

**`get_user_products(user_email TEXT)`**
```sql
SELECT * FROM get_user_products('usuario@email.com');
```

**`has_product_access(user_email TEXT, check_product_id TEXT)`**
```sql
SELECT has_product_access('usuario@email.com', 'produto-123');
```

## Configuração do Webhook Hotmart

### 1. Endpoint do Webhook

```
POST https://seu-dominio.com/api/webhooks/hotmart
```

### 2. Eventos Suportados

- `PURCHASE_COMPLETE` → status: approved
- `PURCHASE_CANCELED` → status: cancelled
- `PURCHASE_REFUNDED` → status: refunded
- `PURCHASE_CHARGEBACK` → status: chargeback

### 3. Formato do Payload Hotmart

```json
{
  "id": "webhook-id",
  "event": "PURCHASE_COMPLETE",
  "creation_date": 1700000000,
  "data": {
    "buyer": {
      "email": "comprador@email.com",
      "name": "Nome do Comprador"
    },
    "product": {
      "id": "produto-123",
      "name": "Nome do Produto"
    },
    "purchase": {
      "transaction": "HP123456789",
      "status": "approved",
      "approved_date": 1700000000
    }
  }
}
```

### 4. Configurar na Hotmart

1. Acesse o **Painel Hotmart**
2. Vá em **Ferramentas** → **Webhooks**
3. Clique em **Adicionar URL**
4. Cole a URL: `https://seu-dominio.com/api/webhooks/hotmart`
5. Selecione os eventos:
   - Compra Aprovada
   - Compra Cancelada
   - Reembolso
   - Chargeback

## Fluxo de Funcionamento

### Quando um Webhook é Recebido:

1. **Recebe o payload** da Hotmart
2. **Extrai os dados**: email, nome, produto, transação
3. **Busca ou cria perfil**:
   - Se o email já existe → usa o perfil existente
   - Se não existe → cria novo perfil com senha "benedito"
4. **Verifica a compra**:
   - Se `transaction_id` já existe → atualiza o status
   - Se não existe → cria novo registro de compra
5. **Retorna resposta** de sucesso ou erro

### Exemplo de Uso no Frontend:

```typescript
// Verificar se usuário tem acesso ao produto
const { data } = await supabase
  .rpc('has_product_access', {
    user_email: 'usuario@email.com',
    check_product_id: 'produto-123'
  });

if (data) {
  // Usuário tem acesso
} else {
  // Redirecionar para página de compra
}
```

```typescript
// Listar produtos do usuário
const { data: products } = await supabase
  .rpc('get_user_products', {
    user_email: 'usuario@email.com'
  });
```

## Teste do Webhook

### 1. Health Check

```bash
curl https://seu-dominio.com/api/webhooks/hotmart
```

Resposta esperada:
```json
{
  "status": "ok",
  "endpoint": "hotmart-webhook",
  "timestamp": "2025-11-14T12:00:00.000Z"
}
```

### 2. Teste de Compra

```bash
curl -X POST https://seu-dominio.com/api/webhooks/hotmart \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-123",
    "event": "PURCHASE_COMPLETE",
    "creation_date": 1700000000,
    "data": {
      "buyer": {
        "email": "teste@email.com",
        "name": "João Teste"
      },
      "product": {
        "id": "produto-teste",
        "name": "Protocolo Start"
      },
      "purchase": {
        "transaction": "TEST123456",
        "status": "approved",
        "approved_date": 1700000000
      }
    }
  }'
```

Resposta esperada:
```json
{
  "success": true,
  "action": "created",
  "transaction": "TEST123456",
  "status": "approved"
}
```

## Consultas Úteis

### Ver todos os perfis:
```sql
SELECT * FROM profiles ORDER BY created_at DESC;
```

### Ver todas as compras:
```sql
SELECT * FROM purchases ORDER BY purchased_at DESC;
```

### Ver produtos de um usuário:
```sql
SELECT * FROM user_products WHERE email = 'usuario@email.com';
```

### Ver compras ativas:
```sql
SELECT * FROM purchases WHERE status = 'approved';
```

### Estatísticas:
```sql
-- Total de usuários
SELECT COUNT(*) FROM profiles;

-- Total de compras por status
SELECT status, COUNT(*) 
FROM purchases 
GROUP BY status;

-- Receita por produto (se tiver campo de valor)
SELECT product_name, COUNT(*) as total_vendas
FROM purchases 
WHERE status = 'approved'
GROUP BY product_name;
```

## Segurança

### Senhas
- Todos os usuários recebem a senha padrão: **"benedito"**
- Usuários podem alterar depois do primeiro login
- Para produção, considere implementar reset de senha

### RLS (Row Level Security)
- Usuários só veem seus próprios dados
- Webhook usa `service_role` para bypass do RLS
- Políticas protegem contra acesso não autorizado

## Próximos Passos

1. ✅ Tabelas criadas
2. ✅ Webhook configurado
3. 🔄 Configurar autenticação no frontend
4. 🔄 Implementar página de login
5. 🔄 Proteger rotas autenticadas
6. 🔄 Adicionar verificação de produto nas páginas
