"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredProduct?: string;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredProduct,
  redirectTo = "/pt/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, hasPurchase } = useAuthStore();

  useEffect(() => {
    // Verificar se está autenticado
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Se requer produto específico, verificar se tem acesso
    if (requiredProduct && !hasPurchase(requiredProduct)) {
      router.push("/pt"); // Redireciona para home se não tem o produto
    }
  }, [isAuthenticated, requiredProduct, hasPurchase, router, redirectTo]);

  // Não renderizar nada enquanto verifica
  if (!isAuthenticated) {
    return null;
  }

  // Se requer produto e não tem, não renderizar
  if (requiredProduct && !hasPurchase(requiredProduct)) {
    return null;
  }

  return <>{children}</>;
}
