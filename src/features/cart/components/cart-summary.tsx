"use client";

import * as React from "react";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn, formatIDR } from "@/lib/utils";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import type { CartItem } from "@/features/cart/types/cart-item";

type CartSummaryProps = {
  items?: CartItem[];
  taxRate?: number;
  discount?: number;
  deliveryFee?: number;
  className?: string;
  onCheckout?: () => void;
  formatCurrency?: (value: number) => string;
};

function CartSummary({
  items: providedItems,
  taxRate = 0,
  discount: providedDiscount = 0,
  deliveryFee: providedDeliveryFee = 0,
  className,
  onCheckout,
  formatCurrency,
}: CartSummaryProps) {
  const storeItems = useCartStore((s) => s.items);
  const items = providedItems ?? storeItems;

  const [promoCode, setPromoCode] = React.useState("");
  const [promoError, setPromoError] = React.useState<string | null>(null);

  const toNumber = (value: string) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  };

  const subtotal = items.reduce(
    (acc, it) => acc + toNumber(it.item.price) * it.quantity,
    0
  );
  const discount = providedDiscount;
  const tax = subtotal * taxRate;
  const deliveryFee = providedDeliveryFee;
  const total = subtotal - discount + tax + deliveryFee;

  const format = (n: number) =>
    formatCurrency ? formatCurrency(n) : formatIDR(String(Math.round(n)));

  const isCartEmpty = items.length === 0;

  const handlePromoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPromoError("Promo code sedang tidak ada");
    }
  };

  const handleCheckout = () => {
    if (onCheckout) onCheckout();
  };

  return (
    <div
      className={cn("space-y-4", className)}
      role="complementary"
      aria-label="Cart summary"
    >
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between py-1">
          <div className="text-muted-foreground text-sm">Subtotal</div>
          <div
            className="font-medium tabular-nums"
            aria-live="polite"
            role="status"
          >
            {format(subtotal)}
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="text-muted-foreground text-sm">Diskon</div>
          <div
            className="font-medium tabular-nums"
            aria-live="polite"
            role="status"
          >
            {format(discount)}
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="text-muted-foreground text-sm">
            Pajak ({Math.round(taxRate * 100)}%)
          </div>
          <div
            className="font-medium tabular-nums"
            aria-live="polite"
            role="status"
          >
            {format(tax)}
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="text-muted-foreground text-sm">Ongkos Kirim</div>
          <Badge variant="secondary" aria-label="Delivery is free">
            FREE
          </Badge>
        </div>
        <Separator className="my-1" />
        <div className="flex items-center justify-between py-1">
          <div className="text-base font-semibold">Total</div>
          <div
            className="text-lg font-extrabold tabular-nums"
            aria-live="polite"
            role="status"
          >
            {format(total)}
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-3">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Masukkan kode promo"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              if (promoError) setPromoError(null);
            }}
            onKeyDown={handlePromoKeyDown}
            aria-label="Promo code"
            aria-invalid={promoError ? true : false}
            aria-describedby={promoError ? "promo-error" : undefined}
          />
          <Button variant="outline" disabled aria-disabled="true">
            Terapkan
          </Button>
        </div>
        {promoError ? (
          <div id="promo-error" className="text-destructive text-xs">
            {promoError}
          </div>
        ) : null}
        <Separator />
        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={isCartEmpty}
          aria-disabled={isCartEmpty ? "true" : "false"}
        >
          Lanjutkan ke Checkout
        </Button>
      </CardFooter>
    </div>
  );
}

export { CartSummary };
