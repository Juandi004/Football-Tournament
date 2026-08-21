import type { User } from '@/types/User'
import { persist } from 'zustand/middleware';
import { create } from 'zustand'
import type { Role } from '@/types/Role';

interface AuthUser {
  id: number | string;
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: AuthUser, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', 
    }
  )
);
