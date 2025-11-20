"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type WishlistStore,
  createWishlistStore,
} from "../stores/wishlist-store";

type WishlistStoreApi = ReturnType<typeof createWishlistStore>;

const WishlistStoreContext = createContext<WishlistStoreApi | undefined>(
  undefined
);

interface WishlistStoreProviderProps {
  children: ReactNode;
}

function WishlistStoreProvider({ children }: WishlistStoreProviderProps) {
  const wishlistStoreRef = useRef<WishlistStoreApi>(createWishlistStore());
  // eslint-disable-next-line react-hooks/refs
  const wishlistStore = wishlistStoreRef.current;

  return (
    <WishlistStoreContext.Provider value={wishlistStore}>
      {children}
    </WishlistStoreContext.Provider>
  );
}

const useWishlistStore = <T,>(selector: (store: WishlistStore) => T): T => {
  const wishlistStoreContext = useContext(WishlistStoreContext);
  if (!wishlistStoreContext) {
    throw new Error(
      "useWishlistStore must be used within a WishlistStoreProvider"
    );
  }
  return useStore(wishlistStoreContext, selector);
};

export type { WishlistStoreApi };
export { WishlistStoreProvider, useWishlistStore };
