import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserPurchase {
  product_id: string;
  product_name: string;
  transaction_id: string;
  status: string;
  purchased_at?: string; // ISO date string
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
  hasPurchase: (productName: string) => boolean;
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

      hasPurchase: (productName: string) => {
        const { user } = get();
        if (!user) return false;
        
        return user.purchases.some(
          (p) => p.product_name === productName && p.status === 'approved'
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
