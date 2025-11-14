"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    login,
    logout: storeLogout,
    hasPurchase,
    getActivePurchases,
  } = useAuthStore();

  const logout = () => {
    storeLogout();
    router.push("/pt/login");
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push("/pt/login");
      return false;
    }
    return true;
  };

  const requireProduct = (productId: string) => {
    if (!isAuthenticated) {
      router.push("/pt/login");
      return false;
    }
    if (!hasPurchase(productId)) {
      router.push("/pt");
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
