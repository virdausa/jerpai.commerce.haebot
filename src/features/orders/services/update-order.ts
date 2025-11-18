import { env } from "@/config/env.config";
import { CartItem } from "@/features/cart/types/cart-item";
import { Item } from "@/features/items/types/item";
import { erpApi } from "@/infrastructures/http";

interface OrderDetail {
  id: number;
  transaction_id: number;
  detail_type: string;
  detail_id: number;
  model_type: string;
  model_id: null;
  data: null;
  quantity: string;
  price: string;
  cost_per_unit: string;
  debit: string;
  credit: string;
  notes: null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  sku: null;
  name: null;
  code: null;
  weight: string;
  discount: string;
}

interface OrderData {
  id: number;
  number: string;
  class: null;
  space_type: string;
  space_id: number;
  model_type: string;
  model_id: null;
  type_type: null;
  type_id: null;
  input_type: null;
  input_id: null;
  output_type: null;
  output_id: null;
  sender_type: string;
  sender_id: number;
  receiver_type: string;
  receiver_id: null;
  handler_type: string;
  handler_id: string;
  input_address: null;
  output_address: null;
  request_time: null;
  sent_time: string;
  received_time: null;
  handler_number: null;
  total: number;
  fee: string;
  fee_rules: null;
  sender_notes: null;
  receiver_notes: null;
  handler_notes: null;
  status: string;
  notes: null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  sent_date: null;
  description: null;
  relation_type: null;
  relation_id: null;
  files: unknown[];
  parent_type: null;
  parent_id: null;
  total_details: number;
  tags: unknown[];
  links: unknown[];
  details: OrderDetail[];
}

interface UpdateOrderResponse {
  data: OrderData[];
  success: boolean;
  message: string;
}

interface OrderDetailBody {
  detail_id: string;
  quantity: string;
  price: string;
  discount: string;
  cost_per_unit: string;
  notes: string;
  model_type: string;
}

interface UpdateOrderRequestBody {
  details: OrderDetailBody[];
}

type PartialCartItem = {
  item: Partial<Item>;
  quantity: number;
};

async function updateOrder(
  cartItems: PartialCartItem[]
): Promise<UpdateOrderResponse> {
  const body: UpdateOrderRequestBody = {
    details: cartItems.map((cartItem) => {
      const item = cartItem.item;

      return {
        detail_id: item?.id?.toString() || "",
        quantity: cartItem.quantity?.toString() || "0",
        price: item?.price?.toString() || "0",
        discount: "0",
        cost_per_unit: item?.price?.toString() || "0",
        notes: item?.notes || "",
        model_type: item?.model_type ?? "",
      };
    }),
  };

  const response = erpApi.post<UpdateOrderResponse>("trades", {
    searchParams: {
      space_id: env.ERP_SPACE,
      sender_id: env.ERP_SENDER,
      handler_id: env.ERP_SENDER,
      sender_notes: "",
      tags: "",
      links: "",
      status: "TX_DRAFT",
    },
    body: JSON.stringify(body),
    context: {
      token: env.ERP_TOKEN,
    },
  });
  return await response.json();
}

export type { UpdateOrderResponse };
export { updateOrder };
