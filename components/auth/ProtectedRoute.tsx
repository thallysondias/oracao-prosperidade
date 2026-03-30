"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredProduct?: string;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredProduct,
  redirectTo,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hasPurchase } = useAuthStore();
  const locale = pathname.split("/")[1] || "es";
  const loginRedirect = redirectTo || `/${locale}/login`;
  const homeRedirect = `/${locale}`;

  useEffect(() => {
    // Verificar se está autenticado
    if (!isAuthenticated) {
      router.push(loginRedirect);
      return;
    }

    // Se requer produto específico, verificar se tem acesso
    if (requiredProduct && !hasPurchase(requiredProduct)) {
      router.push(homeRedirect); // Redireciona para home se não tem o produto
    }
  }, [isAuthenticated, requiredProduct, hasPurchase, router, loginRedirect, homeRedirect]);

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
