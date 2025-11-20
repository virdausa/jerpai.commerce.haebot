import { env } from "@/config/env.config";
import { erpApi } from "@/infrastructures/http";
import { Item } from "@/features/items/types/item";

interface GetItemsApiResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Item[];
  disableOrdering: boolean;
}

async function getItems(data?: {
  length?: number;
  limit?: number;
  q?: string;
  start?: number;
}): Promise<GetItemsApiResponse> {
  const response = erpApi.get("items/data", {
    searchParams: {
      space_id: env.ERP_SPACE,
      q: data?.q ?? "",
      limit: data?.limit ?? "all",
      length: data?.length ?? 10,
      start: data?.start ?? 0,
    },
  });
  return await response.json();
}

export type { GetItemsApiResponse };
export { getItems };
