"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { defaultLocale, isSupportedLocale } from "@/shared/config/locales";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const hasCheckedSession = useAuthStore((state) => state.hasCheckedSession);
  const isRestoringSession = useAuthStore((state) => state.isRestoringSession);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    if (hasHydrated && !hasCheckedSession && !isRestoringSession) {
      void restoreSession();
    }
  }, [hasHydrated, hasCheckedSession, isRestoringSession, restoreSession]);

  useEffect(() => {
    if (hasHydrated && hasCheckedSession && !isRestoringSession && !isAuthenticated) {
      const pathnameLocale = pathname.split("/")[1];
      const locale = isSupportedLocale(pathnameLocale) ? pathnameLocale : defaultLocale;
      router.push(`/${locale}/login`);
    }
  }, [hasHydrated, hasCheckedSession, isRestoringSession, isAuthenticated, router, pathname]);

  if (!hasHydrated || isRestoringSession || (!isAuthenticated && !hasCheckedSession)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando autenticacao...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
