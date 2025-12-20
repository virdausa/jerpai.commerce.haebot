"use client";

// import commonLang from "@/lang/id/common.lang";
// import Link from "next/link";

import checkoutLang from "@/lang/id/checkout/checkout.lang";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatIDR, getEffectivePrice } from "@/lib/utils";
import { OrderData } from "@/features/orders/services/update-order";

function CheckoutActions({ order }: { order: OrderData }) {
  const items = order.details;
  const total = order.total;

  const lines = [
    checkoutLang.whatsappMessage.greeting(order.id),
    checkoutLang.whatsappMessage.detailsHeader,
    ...items.map((it) => {
      const effectivePrice = Math.round(
        Number(getEffectivePrice(it.price, it.detail?.price_discount ?? null))
      );
      return `- ${it.detail?.name || it.notes || checkoutLang.unknownItem} x${it.quantity} @ ${formatIDR(String(effectivePrice))}`;
    }),
    checkoutLang.whatsappMessage.total(formatIDR(String(Math.round(total)))),
  ];
  const message = lines.join("\n");
  const waHref = `https://wa.me/6285246428746?text=${encodeURIComponent(message)}`;

  const disabled = items.length === 0;

  return (
    <CardContent className="space-y-3">
      <div className="flex flex-col gap-3">
        {/* <Button asChild variant="outline-primary" size="lg">
          <Link href="/">{commonLang.continueShopping}</Link>
        </Button> */}
        <Button
          asChild
          size="lg"
          disabled={disabled}
          aria-disabled={disabled ? "true" : "false"}
        >
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            {checkoutLang.continueToWhatsapp}
          </a>
        </Button>
      </div>
    </CardContent>
  );
}

export { CheckoutActions };
