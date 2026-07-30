import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { hasOpenContentAccess } from '@/features/auth/open-content-access';
import type { UserProfile, UserPurchase } from '@/features/auth/types';

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  hasCheckedSession: boolean;
  isRestoringSession: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  hasPurchase: (productName: string) => boolean;
  getActivePurchases: () => UserPurchase[];
  setHasHydrated: (value: boolean) => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      hasCheckedSession: false,
      isRestoringSession: false,

      login: (user: UserProfile) => {
        set({
          user,
          isAuthenticated: true,
          hasCheckedSession: true,
          isRestoringSession: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          hasCheckedSession: true,
          isRestoringSession: false,
        });
      },

      hasPurchase: (productName: string) => {
        const { user } = get();
        void productName;

        return hasOpenContentAccess({ isAuthenticated: Boolean(user) });
      },

      getActivePurchases: () => {
        const { user } = get();
        if (!user) return [];
        
        return user.purchases.filter((p) => p.status === 'approved');
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      restoreSession: async () => {
        const { hasCheckedSession, isRestoringSession } = get();

        if (hasCheckedSession || isRestoringSession) {
          return;
        }

        set({ isRestoringSession: true });

        try {
          const response = await fetch("/api/auth/session", {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          });

          if (!response.ok) {
            set({
              user: null,
              isAuthenticated: false,
              hasCheckedSession: true,
              isRestoringSession: false,
            });
            return;
          }

          const data = await response.json();

          set({
            user: data.user ?? null,
            isAuthenticated: Boolean(data.user),
            hasCheckedSession: true,
            isRestoringSession: false,
          });
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            hasCheckedSession: true,
            isRestoringSession: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export type { UserProfile, UserPurchase };
