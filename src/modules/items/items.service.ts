import { env } from "@/config/env.config";
import { erpApi } from "@/lib/http";
import { Item } from "./items.interface";

interface GetItemsApiResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Item[];
  disableOrdering: boolean;
}

async function getItems(data?: {
  limit?: number;
  q?: string;
}): Promise<GetItemsApiResponse> {
  const response = erpApi.get("items/data", {
    searchParams: {
      space_id: env.ERP_SPACE,
      q: data?.q ?? "",
      limit: data?.limit ?? 10,
    },
  });
  return await response.json();
}

export { getItems };
