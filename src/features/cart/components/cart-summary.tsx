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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

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
  const [isProcessing, setIsProcessing] = React.useState(false);
  const router = useRouter();

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
    if (onCheckout) {
      onCheckout();
      return;
    }
    if (isCartEmpty || isProcessing) return;
    const invalid = items.some(
      (it) => it.quantity <= 0 || !Number.isFinite(Number(it.item.price))
    );
    if (invalid) {
      toast.error("Validasi keranjang gagal");
      return;
    }
    setIsProcessing(true);
    const payload = { items };
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.message || "Gagal memproses checkout");
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.success || !data?.order?.id) {
          throw new Error("Data pesanan tidak valid");
        }
        toast.success("Pesanan berhasil dibuat");
        const orderId = data.order.id as number;
        router.push(`/checkout/${orderId}`);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        toast.error(message);
      })
      .finally(() => {
        setIsProcessing(false);
      });
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
          disabled={isCartEmpty || isProcessing}
          aria-disabled={isCartEmpty || isProcessing ? "true" : "false"}
          aria-busy={isProcessing ? "true" : "false"}
        >
          {isProcessing ? (
            <span className="inline-flex items-center gap-2">
              <Loader2Icon className="animate-spin" />
              Memproses...
            </span>
          ) : (
            "Lanjutkan ke Checkout"
          )}
        </Button>
      </CardFooter>
    </div>
  );
}

export { CartSummary };
