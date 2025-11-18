"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatIDR } from "@/lib/utils";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";

function CheckoutContent({ orderId }: { orderId: string }) {
  const items = useCartStore((s) => s.items);

  const subtotal = items.reduce(
    (acc, it) => acc + Number(it.item.price) * it.quantity,
    0
  );
  const total = subtotal;

  return (
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between py-1">
        <div className="text-muted-foreground text-sm">Nomor Pesanan</div>
        <div className="font-medium tabular-nums">{orderId}</div>
      </div>
      <Separator className="my-1" />
      <div className="space-y-2">
        <div className="text-sm font-semibold">Rincian Item</div>
        <ul className="space-y-1">
          {items.length === 0 ? (
            <li className="text-muted-foreground">Keranjang kosong</li>
          ) : (
            items.map((cartItem) => (
              <li
                key={`summary-${cartItem.item.id}`}
                className="flex items-center justify-between"
              >
                <span>
                  {cartItem.item.name} × {cartItem.quantity}
                </span>
                <span className="tabular-nums">
                  {formatIDR(
                    String(
                      Math.round(
                        Number(cartItem.item.price) * cartItem.quantity
                      )
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
        <div className="text-base font-semibold">Total</div>
        <div className="text-lg font-extrabold tabular-nums">
          {formatIDR(String(Math.round(total)))}
        </div>
      </div>
    </CardContent>
  );
}

export { CheckoutContent };
