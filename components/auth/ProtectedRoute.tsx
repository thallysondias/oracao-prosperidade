"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  getHomePath,
  getLoginPath,
  resolveLocaleFromPath,
} from "@/features/auth/navigation";
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
  const locale = resolveLocaleFromPath(pathname);
  const loginRedirect = redirectTo || getLoginPath(locale);
  const homeRedirect = getHomePath(locale);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(loginRedirect);
      return;
    }

    if (requiredProduct && !hasPurchase(requiredProduct)) {
      router.push(homeRedirect);
    }
  }, [isAuthenticated, requiredProduct, hasPurchase, router, loginRedirect, homeRedirect]);

  if (!isAuthenticated) {
    return null;
  }

  if (requiredProduct && !hasPurchase(requiredProduct)) {
    return null;
  }

  return <>{children}</>;
}
