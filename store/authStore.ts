import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserPurchase {
  product_id: string;
  transaction_id: string;
  status: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  purchases: UserPurchase[];
}

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  hasPurchase: (productId: string) => boolean;
  getActivePurchases: () => UserPurchase[];
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user: UserProfile) => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      hasPurchase: (productId: string) => {
        const { user } = get();
        if (!user) return false;
        
        return user.purchases.some(
          (p) => p.product_id === productId && p.status === 'approved'
        );
      },

      getActivePurchases: () => {
        const { user } = get();
        if (!user) return [];
        
        return user.purchases.filter((p) => p.status === 'approved');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
