"use client";

import { usePathname, useRouter } from "next/navigation";

import { getHomePath, getLoginPath, resolveLocaleFromPath } from "@/features/auth/navigation";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    user,
    isAuthenticated,
    login,
    logout: storeLogout,
    hasPurchase,
    getActivePurchases,
  } = useAuthStore();
  const locale = resolveLocaleFromPath(pathname);

  const logout = () => {
    storeLogout();
    router.push(getLoginPath(locale));
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push(getLoginPath(locale));
      return false;
    }
    return true;
  };

  const requireProduct = (productId: string) => {
    if (!isAuthenticated) {
      router.push(getLoginPath(locale));
      return false;
    }
    if (!hasPurchase(productId)) {
      router.push(getHomePath(locale));
      return false;
    }
    return true;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    hasPurchase,
    getActivePurchases,
    requireAuth,
    requireProduct,
  };
}
