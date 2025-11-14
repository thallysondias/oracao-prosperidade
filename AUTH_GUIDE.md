# Sistema de Autenticação - Guia de Uso

## 📦 Arquivos Criados

### 1. Store (Zustand)
- `store/authStore.ts` - Gerenciamento global de estado de autenticação

### 2. API Routes
- `app/api/auth/login/route.ts` - Endpoint de login

### 3. Páginas
- `app/[locale]/(public)/login/page.tsx` - Página de login

### 4. Componentes
- `components/auth/ProtectedRoute.tsx` - Wrapper para proteger rotas
- `components/auth/UserMenu.tsx` - Menu dropdown do usuário

### 5. Hooks
- `hooks/use-auth.ts` - Hook customizado para autenticação

## 🚀 Como Usar

### 1. Fazer Login

```typescript
// Na página de login (já implementado)
const { login } = useAuth();

const response = await fetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});

const data = await response.json();
login(data.user); // Salva no Zustand + localStorage
```

### 2. Verificar se Está Autenticado

```typescript
"use client";
import { useAuth } from "@/hooks/use-auth";

export function MyComponent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <div>Por favor, faça login</div>;
  }

  return <div>Olá, {user.name}!</div>;
}
```

### 3. Proteger uma Página Inteira

```typescript
"use client";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function MinhaPageProtegida() {
  return (
    <ProtectedRoute>
      {/* Conteúdo só aparece se estiver logado */}
      <div>Conteúdo protegido</div>
    </ProtectedRoute>
  );
}
```

### 4. Proteger com Produto Específico

```typescript
"use client";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function PaginaProduto() {
  return (
    <ProtectedRoute requiredProduct="produto-123">
      {/* Só aparece se tiver comprado o produto-123 */}
      <div>Conteúdo exclusivo do produto</div>
    </ProtectedRoute>
  );
}
```

### 5. Verificar Produto Manualmente

```typescript
"use client";
import { useAuth } from "@/hooks/use-auth";

export function ProductCard({ productId }: { productId: string }) {
  const { hasPurchase } = useAuth();

  if (hasPurchase(productId)) {
    return (
      <div>
        <h2>Você já tem este produto!</h2>
        <button>Acessar Conteúdo</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Compre agora</h2>
      <button>Comprar</button>
    </div>
  );
}
```

### 6. Listar Produtos Ativos do Usuário

```typescript
"use client";
import { useAuth } from "@/hooks/use-auth";

export function MyProducts() {
  const { getActivePurchases } = useAuth();
  const purchases = getActivePurchases();

  return (
    <div>
      <h2>Meus Produtos</h2>
      {purchases.map((p) => (
        <div key={p.transaction_id}>
          <p>Produto: {p.product_id}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </div>
  );
}
```

### 7. Botão de Logout

```typescript
"use client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button onClick={logout}>
      Sair
    </Button>
  );
}
```

### 8. Menu de Usuário no Header

```typescript
import { UserMenu } from "@/components/auth/UserMenu";

export function Header() {
  return (
    <header>
      <nav>
        {/* Seus links */}
      </nav>
      <UserMenu />
    </header>
  );
}
```

## 📊 Estrutura de Dados

### UserProfile (Zustand State)

```typescript
{
  id: string,           // UUID do perfil
  name: string,         // Nome do usuário
  email: string,        // Email do usuário
  purchases: [          // Array de compras
    {
      product_id: string,      // ID do produto
      transaction_id: string,  // ID da transação
      status: string          // approved, cancelled, etc
    }
  ]
}
```

## 🔐 Credenciais Padrão

- **Senha padrão**: `benedito`
- Todos os usuários criados via webhook recebem essa senha
- Email: o email usado na compra

## 📍 Rotas

- `/pt/login` - Página de login
- `/api/auth/login` - API de autenticação (POST)

## ✅ Exemplos Práticos

### Proteger Página de Oração São Benedito

```typescript
// app/[locale]/(authenticated)/saint-benedict/page.tsx
"use client";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function SaintBenedictPage() {
  return (
    <ProtectedRoute requiredProduct="sao-benedito">
      {/* Conteúdo da oração */}
    </ProtectedRoute>
  );
}
```

### Mostrar Botão Condicional

```typescript
"use client";
import { useAuth } from "@/hooks/use-auth";

export function ProductButton({ productId }: { productId: string }) {
  const { hasPurchase, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={() => router.push('/pt/login')}>Fazer Login</button>;
  }

  if (hasPurchase(productId)) {
    return <button>Acessar Agora</button>;
  }

  return <button>Comprar Agora</button>;
}
```

## 🎯 Fluxo Completo

1. **Usuário compra na Hotmart** → Webhook cria perfil + compra
2. **Usuário acessa site** → Vai para `/pt/login`
3. **Faz login** → Email + senha "benedito"
4. **Sistema consulta** → Busca perfil + compras no Supabase
5. **Salva no Zustand** → Dados ficam em memória + localStorage
6. **Acessa conteúdo** → ProtectedRoute verifica se tem o produto
7. **Navega pelo site** → Dados persistem até fazer logout

## 🔄 Persistência

- **Zustand + localStorage**: Dados persistem entre reloads
- **Expira**: Apenas no logout manual
- **Revalida**: A cada login

## 🛡️ Segurança (MVP)

⚠️ **AVISO**: Este é um MVP simplificado:
- Senha em texto plano no banco
- Sem JWT/tokens
- Sem refresh
- Sem rate limiting
- Sem 2FA

Para produção, considere:
- Hash de senhas (bcrypt)
- JWT com refresh tokens
- HTTPS obrigatório
- Rate limiting
- 2FA opcional
