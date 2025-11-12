import { create } from 'zustand';
import type { User } from '@/data/entities/user.entities';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  setLoading: (isLoading) =>
    set({
      isLoading,
    }),

  setInitialized: (isInitialized) =>
    set({
      isInitialized,
    }),
}));

