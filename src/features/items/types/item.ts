import type { Inventory } from "@/features/inventories/types/inventory";

export interface Item {
  id: number;
  primary_code: string | null;
  code: string;
  sku: string;
  parent_type: string | null;
  parent_id: number | null;
  type_type: string | null;
  type_id: number | null;
  model_type: string | null;
  model_id: number | null;
  space_type: string;
  space_id: number;
  name: string;
  price: string;
  price_discount: string | null;
  cost: string;
  weight: string;
  dimension: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  description: string | null;
  inventories: Inventory[];
  images?: {
    name: string;
    path: string;
    size: number;
    isNew?: boolean;
  }[];
  files?: {
    name: string;
    path: string;
    size: number;
  }[];
}
