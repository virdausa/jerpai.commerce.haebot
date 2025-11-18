"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { lang } from "@/lang/id/cart/cart.lang";
import { CartItemList } from "@/features/cart/components/cart-item-list";

export default function Cart() {
  return (
    <section
      id="cart-section"
      className="container mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10"
    >
      <h1 className="mb-4 text-2xl font-extrabold uppercase md:mb-8 md:text-4xl">
        {lang.title}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-1 md:col-span-3">
          <CartItemList />
        </div>
        <Card className="col-span-1 h-fit md:col-span-2">
          <CardHeader>
            <CardTitle>{lang.summaryTitle}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
