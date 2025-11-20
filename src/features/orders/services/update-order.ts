import type { OrderData } from "../types/order-data";
import lang from "@/lang/id/checkout/checkout.lang";

import { env } from "@/config/env.config";
import { Item } from "@/features/items/types/item";
import { erpApi } from "@/infrastructures/http";

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
  orderId: number,
  cartItems: PartialCartItem[],
  customerData: {
    email: string;
    fullName: string;
    phone: string;
    note?: string;
  }
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
        model_type: item?.model_type ?? "SO",
      };
    }),
  };

  const data = [
    lang.receiverNote.email(customerData.email),
    lang.receiverNote.name(customerData.fullName),
    lang.receiverNote.phone(customerData.phone),
    customerData.note && lang.receiverNote.note(customerData.note),
  ];

  const response = erpApi.put(`trades/${orderId}`, {
    searchParams: {
      space_id: env.ERP_SPACE,
      sender_id: env.ERP_SENDER,
      handler_id: env.ERP_SENDER,
      sender_notes: "",
      tags: "",
      links: "",
      status: "TX_DRAFT",
      receiver_notes: data.join("\n"),
    },
    body: JSON.stringify(body),
    context: {
      token: env.ERP_TOKEN,
    },
  });

  return response.json();
}

export type { UpdateOrderResponse, OrderData };
export { updateOrder };
