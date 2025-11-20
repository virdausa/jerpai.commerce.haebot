"use server";

import { getItems } from "@/features/items/services/get-items";

export async function fetchItems(page: number, query: string) {
  const length = 20;
  const start = (page - 1) * length;
  return await getItems({ length, start, q: query });
}
