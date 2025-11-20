"use server";

import { getItems } from "@/features/items/services/get-items";

export async function fetchItems(page: number, query: string) {
  const limit = 20;
  return await getItems({ limit, page, q: query });
}
