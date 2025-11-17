"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type CartStore, createCartStore } from "../stores/cart-store";

type CartStoreApi = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

interface CartStoreProviderProps {
  children: ReactNode;
}

function CartStoreProvider({ children }: CartStoreProviderProps) {
  const cartStoreRef = useRef<CartStoreApi>(createCartStore());
  // eslint-disable-next-line react-hooks/refs
  const cartStore = cartStoreRef.current;

  return (
    <CartStoreContext.Provider value={cartStore}>
      {children}
    </CartStoreContext.Provider>
  );
}

const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);
  if (!cartStoreContext) {
    throw new Error("useCartStore must be used within a CartStoreProvider");
  }
  return useStore(cartStoreContext, selector);
};

export type { CartStoreApi };
export { CartStoreProvider, useCartStore };
