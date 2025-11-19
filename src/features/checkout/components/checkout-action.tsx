"use client";

import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatIDR } from "@/lib/utils";
import { OrderData } from "@/features/orders/services/update-order";

function CheckoutActions({ order }: { order: OrderData }) {
  const items = order.details;
  const total = order.total;

  const lines = [
    `Saya mau membayar pesanan dengan nomor pesanan ${order.id}.`,
    "Rincian Pesanan:",
    ...items.map(
      (it) =>
        `- ${it.notes} x${it.quantity} @ ${formatIDR(String(Math.round(Number(it.price))))}`
    ),
    `Total: ${formatIDR(String(Math.round(total)))}`,
  ];
  const message = lines.join("\n");
  const waHref = `https://wa.me/6285246428746?text=${encodeURIComponent(message)}`;

  const disabled = items.length === 0;

  return (
    <CardContent className="space-y-3">
      <div className="flex flex-col gap-3">
        <Button asChild variant="outline-primary" size="lg">
          <Link href="/">Lanjut Belanja</Link>
        </Button>
        <Button
          asChild
          size="lg"
          disabled={disabled}
          aria-disabled={disabled ? "true" : "false"}
        >
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            Lanjutkan ke Whatsapp
          </a>
        </Button>
      </div>
    </CardContent>
  );
}

export { CheckoutActions };
