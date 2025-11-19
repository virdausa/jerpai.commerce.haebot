import { Item } from "@/features/items/types/item";

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
  detail: Item;
}

export type { OrderDetail };
