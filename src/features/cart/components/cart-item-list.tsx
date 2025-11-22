"use client";

import * as React from "react";

import { lang as cartLang } from "@/lang/id/cart/cart.lang";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "./cart-item";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import commonLang from "@/lang/id/common.lang";

function CartItemList() {
  const { items } = useCartStore((s) => s);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!listRef.current) return;
    const focusable = Array.from(
      listRef.current.querySelectorAll<HTMLElement>("[role='listitem']")
    );
    const currentIndex = focusable.findIndex(
      (el) => el === document.activeElement
    );

    if (e.key === "ArrowRight") {
      const nextIndex = Math.min(
        focusable.length - 1,
        (currentIndex >= 0 ? currentIndex : -1) + 1
      );
      focusable[nextIndex]?.focus();
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      const prevIndex = Math.max(0, (currentIndex >= 0 ? currentIndex : 1) - 1);
      focusable[prevIndex]?.focus();
      e.preventDefault();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cartLang.productsInCart}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={listRef}
          role="list"
          aria-label={cartLang.cartItemList}
          onKeyDown={handleKeyDown}
          className="flex snap-x snap-mandatory flex-col gap-3 overflow-y-auto overscroll-y-contain scroll-smooth py-2 md:gap-4 md:py-3 lg:gap-5"
        >
          {items.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon" aria-hidden="true">
                  <ShoppingCart className="size-6" aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>{cartLang.emptyCart}</EmptyTitle>
                <EmptyDescription>
                  {cartLang.emptyCartDescription}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  asChild
                  aria-label={commonLang.continueShopping}
                  variant="outline-primary"
                  size="lg"
                  className="h-12 md:h-9"
                >
                  <Link href="/products">{commonLang.continueShopping}</Link>
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            items.map((cartItem) => (
              <div
                key={`cart-item-${cartItem.item.id}`}
                className="min-w-[240px] snap-start md:min-w-[300px] lg:min-w-[360px]"
              >
                <CartItem
                  cartItem={cartItem}
                  showControls
                  className="hover:bg-accent/40 transition-colors"
                />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { CartItemList };
