import { env } from "@/config/env.config";
import { erpApi } from "@/infrastructures/http";
import { OrderData } from "./update-order";

interface GetOrderResponse {
  data: OrderData[];
  success: boolean;
  message: string;
}

async function getOrder(id: string): Promise<GetOrderResponse> {
  const response = erpApi.get<GetOrderResponse>(`trades/${id}`, {
    context: {
      token: env.ERP_TOKEN,
    },
  });
  return await response.json();
}

export type { GetOrderResponse };
export { getOrder };
