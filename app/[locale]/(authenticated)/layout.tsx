"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // Extrair o locale do pathname (ex: /es/algo -> es)
      const locale = pathname.split('/')[1] || 'es';
      console.log("❌ Usuário não autenticado, redirecionando para login...");
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, pathname]);

  // Não renderizar nada enquanto verifica ou redireciona
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
