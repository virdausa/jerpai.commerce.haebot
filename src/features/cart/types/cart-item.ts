import { Item } from "@/features/items/types/item";

type CartItem = {
  item: Item;
  quantity: number;
};

export type { CartItem };
