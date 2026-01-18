# Configuração do Webhook Stripe

Este guia mostra como configurar o webhook do Stripe para processar compras automaticamente.

## 1. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis no seu arquivo `.env.local`:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # ou sk_live_... para produção
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 2. Obter as Credenciais do Stripe

### 2.1. Secret Key

1. Acesse [Stripe Dashboard](https://dashboard.stripe.com/)
2. Vá em **Developers** → **API keys**
3. Copie a **Secret key** (começa com `sk_test_` ou `sk_live_`)
4. Cole no `.env.local` como `STRIPE_SECRET_KEY`

### 2.2. Webhook Secret

1. No Stripe Dashboard, vá em **Developers** → **Webhooks**
2. Clique em **Add endpoint**
3. Configure o endpoint:
   - **URL do endpoint**: `https://seu-dominio.com/api/webhooks/stripe`
   - **Descrição**: Webhook para processar compras
   - **Eventos para escutar**:
     - `checkout.session.completed` ✅ (obrigatório)
     - `charge.refunded` (opcional - para reembolsos)
     - `payment_intent.payment_failed` (opcional - para pagamentos falhados)
4. Clique em **Add endpoint**
5. Copie o **Signing secret** (começa com `whsec_`)
6. Cole no `.env.local` como `STRIPE_WEBHOOK_SECRET`

## 3. Testar Localmente

Para testar o webhook localmente, use o Stripe CLI:

### 3.1. Instalar Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Linux
# Download do binário em https://github.com/stripe/stripe-cli/releases
```

### 3.2. Fazer Login

```bash
stripe login
```

### 3.3. Encaminhar Webhooks para Localhost

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Este comando irá:
- Gerar um webhook secret temporário (use-o no `.env.local`)
- Encaminhar todos os eventos do Stripe para seu servidor local

### 3.4. Testar Evento de Compra

Em outro terminal, execute:

```bash
stripe trigger checkout.session.completed
```

## 4. Fluxo de Funcionamento

Quando uma compra é completada no Stripe:

1. **Stripe envia webhook** → `/api/webhooks/stripe`
2. **Verifica assinatura** → garante que o webhook é autêntico
3. **Cria/busca perfil do usuário** → na tabela `profiles`
4. **Cria registro de compra** → na tabela `purchases` com status `approved`
5. **Adiciona ao MailingBoss** → envia lead para lista de email
6. **Aprova pedido de oração** → se o produto for relacionado a pedidos de oração

## 5. Eventos Suportados

### ✅ checkout.session.completed

Disparado quando um checkout é completado com sucesso.

**Ações:**
- Cria perfil do usuário (se não existir)
- Cria compra com status `approved`
- Adiciona lead ao MailingBoss
- Aprova pedido de oração (se aplicável)

### ✅ charge.refunded

Disparado quando um pagamento é reembolsado.

**Ações:**
- Atualiza status da compra para `refunded`
- Adiciona tag "refunded" no MailingBoss

### ✅ payment_intent.payment_failed

Disparado quando um pagamento falha.

**Ações:**
- Log do erro (sem alteração no banco)

## 6. Verificar Webhook em Produção

Após configurar em produção:

1. Faça um teste de endpoint:
   ```bash
   curl https://seu-dominio.com/api/webhooks/stripe
   ```

2. Você deve receber:
   ```json
   {
     "status": "ok",
     "endpoint": "stripe-webhook",
     "timestamp": "2026-01-04T..."
   }
   ```

3. Verifique os logs no Stripe Dashboard → **Developers** → **Webhooks** → Clique no seu endpoint

## 7. Solução de Problemas

### Webhook não está sendo recebido

- Verifique se a URL está acessível publicamente
- Confirme se o endpoint está cadastrado no Stripe Dashboard
- Verifique os logs do Stripe Dashboard

### Erro de assinatura inválida

- Confirme que `STRIPE_WEBHOOK_SECRET` está correto
- Use o secret do webhook específico (não a API key)

### Compra não está sendo criada

- Verifique os logs do servidor
- Confirme que o evento `checkout.session.completed` está configurado
- Verifique se as tabelas `profiles` e `purchases` existem no Supabase

## 8. Integração com Checkout

Para criar um checkout do Stripe que dispare este webhook:

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Pedido de Oración Personalizado',
        },
        unit_amount: 2000, // $20.00
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'https://seu-dominio.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://seu-dominio.com/cancel',
  customer_email: 'cliente@example.com', // Opcional
});

// Redirecione o usuário para: session.url
```

## 9. Segurança

⚠️ **IMPORTANTE:**

- Nunca exponha `STRIPE_SECRET_KEY` no código do cliente
- Sempre verifique a assinatura do webhook
- Use HTTPS em produção
- Não confie em dados não verificados

## 10. Diferenças entre Hotmart e Stripe

| Aspecto | Hotmart | Stripe |
|---------|---------|--------|
| Verificação | Por IP/Token (opcional) | Por assinatura criptográfica (obrigatório) |
| Status | Múltiplos eventos | Eventos específicos |
| ID da transação | `purchase.transaction` | `session.id` |
| Dados do cliente | `data.buyer` | `customer_details` |
| Produto | `data.product` | `line_items` |

## 11. Recursos Adicionais

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Stripe Testing](https://stripe.com/docs/testing)
