import { createStore } from "zustand/vanilla";

import { CartItem } from "@/features/cart/types/cart-item";

type CartState = {
  items: CartItem[];
};

type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
};

type CartStore = CartState & CartActions;

const defaultCartState: CartState = {
  items: [],
};

function createCartStore(initState: CartState = defaultCartState) {
  return createStore<CartStore>()((set) => ({
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
  }));
}

export type { CartStore };
export { createCartStore };
