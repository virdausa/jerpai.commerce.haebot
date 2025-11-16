export interface Inventory {
  id: number;
  code: string;
  sku: string;
  space_type: string;
  space_id: number;
  parent_type: string | null;
  parent_id: number | null;
  model_type: string | null;
  model_id: number | null;
  type_type: string | null;
  type_id: number | null;
  location_type: string | null;
  location_id: number | null;
  item_type: string;
  item_id: number;
  expiry_date: string | null;
  quantity: number;
  balance: string;
  cost_per_unit: string;
  name: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
