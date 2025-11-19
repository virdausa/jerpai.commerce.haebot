import { NextResponse } from "next/server";
import { z } from "zod";

import { createOrder } from "@/features/orders/services/create-order";
import { updateOrder } from "@/features/orders/services/update-order";

const ItemSchema = z.object({
  item: z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    model_type: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
  }),
  quantity: z.number().int().positive(),
});

const BodySchema = z.object({ items: z.array(ItemSchema).min(1) });

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Data tidak valid" },
        { status: 400 }
      );
    }

    const items = parsed.data.items;

    const created = await createOrder();
    if (!created.success || !created.data?.[0]) {
      return NextResponse.json(
        { success: false, message: "Gagal membuat pesanan" },
        { status: 502 }
      );
    }

    const orderId = created.data[0].id;
    const updated = await updateOrder(orderId, items);
    if (!updated.success || !updated.data?.[0]) {
      return NextResponse.json(
        { success: false, message: "Gagal memperbarui pesanan" },
        { status: 502 }
      );
    }

    const order = updated.data[0];

    return NextResponse.json({
      success: true,
      order,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server", error: error },
      { status: 500 }
    );
  }
}
