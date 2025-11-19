import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { CartItem } from "@/features/cart/types/cart-item";

type CartState = {
  items: CartItem[];
};

type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
};

type CartStore = CartState & CartActions;

const defaultCartState: CartState = {
  items: [],
};

function createCartStore(initState: CartState = defaultCartState) {
  return createStore<CartStore>()(
    persist(
      (set) => ({
        ...initState,
        addItem: (item) =>
          set((state) => ({
            items: [...state.items, item],
          })),
        removeItem: (itemId) =>
          set((state) => ({
            items: state.items.filter((item) => item.item.id !== itemId),
          })),
        updateItemQuantity: (itemId, quantity) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.item.id === itemId ? { ...item, quantity } : item
            ),
          })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: "cart-storage",
      }
    )
  );
}

export type { CartStore };
export { createCartStore };
