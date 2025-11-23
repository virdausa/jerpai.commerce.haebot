"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type AuthStore, createAuthStore } from "../stores/auth-store";

type AuthStoreApi = ReturnType<typeof createAuthStore>;

const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined);

interface AuthStoreProviderProps {
  children: ReactNode;
}

/**
 * Authentication Store Provider
 * Provides auth state and actions to all child components
 */
function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const authStoreRef = useRef<AuthStoreApi>(createAuthStore());
  // eslint-disable-next-line react-hooks/refs
  const authStore = authStoreRef.current;

  return (
    <AuthStoreContext.Provider value={authStore}>
      {children}
    </AuthStoreContext.Provider>
  );
}

/**
 * Hook to access auth store
 * @param selector - Function to select specific state from the store
 * @returns Selected state from auth store
 * @throws Error if used outside AuthStoreProvider
 */
const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);
  if (!authStoreContext) {
    throw new Error("useAuthStore must be used within an AuthStoreProvider");
  }
  return useStore(authStoreContext, selector);
};

export type { AuthStoreApi };
export { AuthStoreProvider, useAuthStore };
