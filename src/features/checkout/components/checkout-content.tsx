"use client";

import checkoutLang from "@/lang/id/checkout/checkout.lang";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatIDR } from "@/lib/utils";
import { OrderData } from "@/features/orders/services/update-order";

function CheckoutContent({ order }: { order: OrderData }) {
  const items = order.details;

  const total = order.total;

  return (
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between py-1">
        <div className="text-muted-foreground text-sm">
          {checkoutLang.orderNumber}
        </div>
        <div className="font-medium tabular-nums">{order.id}</div>
      </div>
      <Separator className="my-1" />
      <div className="space-y-2">
        <div className="text-sm font-semibold">{checkoutLang.itemDetails}</div>
        <ul className="space-y-1">
          {items.length === 0 ? (
            <li className="text-muted-foreground">{checkoutLang.emptyCart}</li>
          ) : (
            items.map((item) => (
              <li
                key={`summary-${item.id}`}
                className="flex items-center justify-between"
              >
                <span>
                  {item.notes} × {item.quantity}
                </span>
                <span className="tabular-nums">
                  {formatIDR(
                    String(
                      Math.round(Number(item.price) * Number(item.quantity))
                    )
                  )}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
      <Separator />
      <div className="flex items-center justify-between py-1">
        <div className="text-base font-semibold">{checkoutLang.total}</div>
        <div className="text-lg font-extrabold tabular-nums">
          {formatIDR(String(Math.round(total)))}
        </div>
      </div>
    </CardContent>
  );
}

export { CheckoutContent };
