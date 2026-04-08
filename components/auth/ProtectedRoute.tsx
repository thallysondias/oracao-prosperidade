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
  const {
    isAuthenticated,
    hasPurchase,
    hasHydrated,
    hasCheckedSession,
    isRestoringSession,
    restoreSession,
  } = useAuthStore();
  const locale = resolveLocaleFromPath(pathname);
  const loginRedirect = redirectTo || getLoginPath(locale);
  const homeRedirect = getHomePath(locale);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!hasCheckedSession && !isRestoringSession) {
      void restoreSession();
      return;
    }

    if (isRestoringSession || !hasCheckedSession) {
      return;
    }

    if (!isAuthenticated) {
      router.push(loginRedirect);
      return;
    }

    if (requiredProduct && !hasPurchase(requiredProduct)) {
      router.push(homeRedirect);
    }
  }, [
    hasHydrated,
    isAuthenticated,
    hasCheckedSession,
    isRestoringSession,
    requiredProduct,
    hasPurchase,
    restoreSession,
    router,
    loginRedirect,
    homeRedirect,
  ]);

  if (!hasHydrated || isRestoringSession || (!isAuthenticated && !hasCheckedSession)) {
    return null;
  }

  if (requiredProduct && !hasPurchase(requiredProduct)) {
    return null;
  }

  return <>{children}</>;
}
