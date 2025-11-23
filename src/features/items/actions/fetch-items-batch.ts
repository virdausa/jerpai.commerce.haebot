"use server";

import {
  getItems,
  type GetItemsApiResponse,
} from "@/features/items/services/get-items";

export async function fetchItemsBatch(
  start: number,
  length: number,
  q?: string
): Promise<GetItemsApiResponse> {
  const res = await getItems({ start, length, q });
  return res;
}
