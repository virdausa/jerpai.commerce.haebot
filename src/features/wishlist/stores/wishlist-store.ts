import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import type { Item } from "@/features/items/types/item";
import type { WishlistItem } from "@/features/wishlist/types/wishlist-item";

type SortBy = "date_desc" | "date_asc" | "price_asc" | "price_desc";

type WishlistState = {
  items: WishlistItem[];
  sortBy: SortBy;
};

type WishlistActions = {
  add: (item: Item) => boolean;
  remove: (itemId: number) => boolean;
  toggle: (item: Item) => boolean;
  clear: () => void;
  setSort: (sortBy: SortBy) => void;
};

type WishlistStore = WishlistState & WishlistActions;

const MAX_ITEMS = 50;

const defaultWishlistState: WishlistState = {
  items: [],
  sortBy: "date_desc",
};

function safeParsePrice(price: string | null | undefined): number {
  const n = Number.parseFloat(price ?? "0");
  return Number.isFinite(n) ? n : 0;
}

function createWishlistStore(initState: WishlistState = defaultWishlistState) {
  return createStore<WishlistStore>()(
    persist(
      (set, get) => ({
        ...initState,
        add: (item) => {
          const state = get();
          const exists = state.items.some((w) => w.item.id === item.id);
          if (exists) return false;
          if (state.items.length >= MAX_ITEMS) return false;
          const entry: WishlistItem = {
            item,
            addedAt: new Date().toISOString(),
          };
          try {
            const next = [...state.items, entry];
            localStorage.setItem("__wishlist_probe__", JSON.stringify(next));
            localStorage.removeItem("__wishlist_probe__");
            set({ items: next });
            return true;
          } catch {
            return false;
          }
        },
        remove: (itemId) => {
          const state = get();
          const next = state.items.filter((w) => w.item.id !== itemId);
          set({ items: next });
          return true;
        },
        toggle: (item) => {
          const state = get();
          const exists = state.items.some((w) => w.item.id === item.id);
          if (exists) {
            const next = state.items.filter((w) => w.item.id !== item.id);
            set({ items: next });
            return true;
          } else {
            if (state.items.length >= MAX_ITEMS) return false;
            const entry: WishlistItem = {
              item,
              addedAt: new Date().toISOString(),
            };
            try {
              const next = [...state.items, entry];
              localStorage.setItem("__wishlist_probe__", JSON.stringify(next));
              localStorage.removeItem("__wishlist_probe__");
              set({ items: next });
              return true;
            } catch {
              return false;
            }
          }
        },
        clear: () => set({ items: [] }),
        setSort: (sortBy) => set({ sortBy }),
      }),
      {
        name: "wishlist-storage",
        version: 1,
        migrate: (persistedState: unknown) => {
          const state = persistedState as Partial<WishlistState> | undefined;
          if (!state || !Array.isArray(state.items))
            return defaultWishlistState;
          const deduped = [] as WishlistItem[];
          const seen = new Set<number>();
          for (const w of state.items as WishlistItem[]) {
            const id = w?.item?.id;
            if (typeof id !== "number" || seen.has(id)) continue;
            seen.add(id);
            deduped.push({
              item: w.item,
              addedAt: w.addedAt ?? new Date().toISOString(),
            });
          }
          const sortBy = state.sortBy ?? "date_desc";
          return { items: deduped, sortBy } satisfies WishlistState;
        },
      }
    )
  );
}

export type { WishlistStore, SortBy };
export { createWishlistStore, safeParsePrice, MAX_ITEMS };
