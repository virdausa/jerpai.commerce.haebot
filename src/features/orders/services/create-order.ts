import type { Order } from "../types/order";

import { env } from "@/config/env.config";
import { erpApi } from "@/infrastructures/http";

interface CreateOrderResponse {
  data: Order[];
  success: boolean;
  message: string;
}

async function createOrder(): Promise<CreateOrderResponse> {
  const response = erpApi.post<CreateOrderResponse>("trades", {
    searchParams: {
      space_id: env.ERP_SPACE,
      sender_id: env.ERP_SENDER,
    },
    context: {
      token: env.ERP_TOKEN,
    },
  });
  return await response.json();
}

export type { CreateOrderResponse };
export { createOrder };
