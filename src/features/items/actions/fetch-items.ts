"use server";

import { getItems } from "@/features/items/services/get-items";

export async function fetchItems(page: number, query: string) {
  const length = 20;
  return await getItems({ length, page, q: query });
}
