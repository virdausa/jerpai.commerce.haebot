import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/config/env.config";
import { erpApi } from "@/infrastructures/http";

const StatusSchema = z.object({
  status: z.enum([
    "TX_DRAFT",
    "TX_READY",
    "TX_SENT",
    "TX_RECEIVED",
    "TX_COMPLETED",
    "TX_CANCELED",
    "TX_RETURN",
    "TX_CLOSED",
  ]),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const parsed = StatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const { id } = await params;
    const response = await erpApi.put(`trades/${id}`, {
      searchParams: {
        space_id: env.ERP_SPACE,
        sender_id: env.ERP_SENDER,
        handler_id: env.ERP_SENDER,
        status: parsed.data.status,
      },
      context: {
        token: env.ERP_TOKEN,
      },
    });
    const json = await response.json<{ success: boolean }>();

    return NextResponse.json({ success: !!json.success });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
