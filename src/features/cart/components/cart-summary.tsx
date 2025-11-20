"use client";

import * as React from "react";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import type { CartItem } from "@/features/cart/types/cart-item";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { lang as cartLang } from "@/lang/id/cart/cart.lang";
import { cn, formatIDR } from "@/lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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
  const clearCart = useCartStore((s) => s.clearCart);
  const items = providedItems ?? storeItems;

  const [promoCode, setPromoCode] = React.useState("");
  const [promoError, setPromoError] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const router = useRouter();

  const CustomerInfoSchema = z.object({
    email: z
      .email({ message: "Format email tidak valid" })
      .min(1, "Email wajib diisi"),
    fullName: z
      .string()
      .min(2, "Nama minimal 2 karakter")
      .max(100, "Nama maksimal 100 karakter"),
    phone: z
      .string()
      .min(1, "Nomor telepon wajib diisi")
      .regex(
        /^\+[1-9]\d{7,14}$/,
        "Gunakan format internasional, mis. +62xxxxxxxxxx"
      ),
    note: z.string().optional(),
  });

  type CustomerInfo = z.infer<typeof CustomerInfoSchema>;

  const form = useForm<CustomerInfo>({
    resolver: zodResolver(CustomerInfoSchema),
    defaultValues: { email: "", fullName: "", phone: "", note: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    try {
      const stored = sessionStorage.getItem("customer_info");
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CustomerInfo>;
        form.reset({
          email: parsed.email ?? "",
          fullName: parsed.fullName ?? "",
          phone: parsed.phone ?? "",
          note: parsed.note ?? "",
        });
        form.trigger();
      }
    } catch {}
  }, [form]);

  const customerInfo = useWatch({ control: form.control });

  React.useEffect(() => {
    if (!customerInfo) return;
    try {
      sessionStorage.setItem("customer_info", JSON.stringify(customerInfo));
    } catch {}
  }, [customerInfo]);

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
  const isFormValid = form.formState.isValid;

  const handlePromoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPromoError(cartLang.promoNotAvailable);
    }
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
      return;
    }
    if (isCartEmpty || isProcessing) return;
    const submit = form.handleSubmit(
      () => {
        const invalid = items.some(
          (it) => it.quantity <= 0 || !Number.isFinite(Number(it.item.price))
        );
        if (invalid) {
          toast.error(cartLang.checkoutValidationFailed);
          return;
        }
        setIsProcessing(true);
        const payload = { items, customerData: form.getValues() };
        fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(async (res) => {
            if (!res.ok) {
              const data = await res.json().catch(() => null);
              throw new Error(
                data?.message || cartLang.checkoutProcessingFailed
              );
            }
            return res.json();
          })
          .then((data) => {
            if (!data?.success || !data?.order?.id) {
              throw new Error(cartLang.invalidOrderData);
            }
            toast.success(cartLang.orderCreatedSuccess);
            const orderId = data.order.id as number;
            router.push(`/checkout/${orderId}`);
          })
          .catch((err: unknown) => {
            const message =
              err instanceof Error ? err.message : cartLang.errorOccurred;
            toast.error(message);
          })
          .finally(() => {
            setIsProcessing(false);
            clearCart();
          });
      },
      () => {
        toast.error(cartLang.checkoutValidationFailed);
      }
    );
    submit();
  };

  return (
    <div
      className={cn("space-y-4", className)}
      role="complementary"
      aria-label={cartLang.summaryTitle}
    >
      <CardContent className="space-y-3">
        <Form {...form}>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      inputMode="email"
                      required
                      aria-required="true"
                      placeholder="nama@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      required
                      aria-required="true"
                      placeholder="Nama Lengkap"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      required
                      aria-required="true"
                      placeholder="+62xxxxxxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Catatan untuk penjual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex items-center justify-between py-1">
          <div className="text-muted-foreground text-sm">
            {cartLang.subtotal}
          </div>
          <div
            className="font-medium tabular-nums"
            aria-live="polite"
            role="status"
          >
            {format(subtotal)}
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="text-muted-foreground text-sm">
            {cartLang.discount}
          </div>
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
            {cartLang.tax} ({Math.round(taxRate * 100)}%)
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
          <div className="text-muted-foreground text-sm">
            {cartLang.deliveryFee}
          </div>
          <Badge variant="secondary" aria-label={cartLang.freeDelivery}>
            {cartLang.freeDelivery}
          </Badge>
        </div>
        <Separator className="my-1" />
        <div className="flex items-center justify-between py-1">
          <div className="text-base font-semibold">{cartLang.total}</div>
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
            placeholder={cartLang.promoCodePlaceholder}
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              if (promoError) setPromoError(null);
            }}
            onKeyDown={handlePromoKeyDown}
            aria-label={cartLang.promoCodePlaceholder}
            aria-invalid={promoError ? true : false}
            aria-describedby={promoError ? "promo-error" : undefined}
          />
          <Button variant="outline" disabled aria-disabled="true">
            {cartLang.applyPromo}
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
          disabled={isCartEmpty || isProcessing || !isFormValid}
          aria-disabled={
            isCartEmpty || isProcessing || !isFormValid ? "true" : "false"
          }
          aria-busy={isProcessing ? "true" : "false"}
        >
          {isProcessing ? (
            <span className="inline-flex items-center gap-2">
              <Loader2Icon className="animate-spin" />
              {cartLang.processing}
            </span>
          ) : (
            cartLang.proceedToCheckout
          )}
        </Button>
      </CardFooter>
    </div>
  );
}

export { CartSummary };
