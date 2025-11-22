"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { lang } from "@/lang/id/cart/cart.lang";
import { CartItemList } from "@/features/cart/components/cart-item-list";
import { CartSummary } from "@/features/cart/components/cart-summary";

export default function Cart() {
  return (
    <section id="cart-section">
      <h1 className="mb-4 text-2xl font-extrabold uppercase md:mb-8 md:text-4xl">
        {lang.title}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-1 md:col-span-3">
          <CartItemList />
        </div>
        <Card className="col-span-1 h-fit md:sticky md:top-16 md:col-span-2">
          <CardHeader>
            <CardTitle>{lang.summaryTitle}</CardTitle>
          </CardHeader>
          <CartSummary className="px-0" />
        </Card>
      </div>
    </section>
  );
}
