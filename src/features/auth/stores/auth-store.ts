import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import type { User } from "@/features/auth/types/auth-types";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  clearAuth: () => void;
};

type AuthStore = AuthState & AuthActions;

const defaultAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

/**
 * Creates authentication store with user and token management
 * Persists to localStorage for maintaining login state across sessions
 */
function createAuthStore(initState: AuthState = defaultAuthState) {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (user) =>
          set({
            user,
            isAuthenticated: true,
          }),
        setToken: (token) =>
          set({
            token,
          }),
        login: (user, token) =>
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
        clearAuth: () =>
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: "auth-storage",
      }
    )
  );
}

export type { AuthStore };
export { createAuthStore };
