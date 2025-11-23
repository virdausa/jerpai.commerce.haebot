"use client";

import { Item } from "@/features/items/types/item";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import lang from "@/lang/id/items/item.lang";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import { useWishlistStore } from "@/features/wishlist/providers/wishlist-store-provider";
import { toast } from "sonner";
import commonLang from "@/lang/id/common.lang";
import wishlistLang from "@/lang/id/wishlist/wishlist.lang";
import { MAX_ITEMS } from "@/features/wishlist/stores/wishlist-store";

interface ProductDetailsProps {
  item: Item;
}

export function ProductDetails({ item }: ProductDetailsProps) {
  const {
    items: cartItems,
    addItem,
    updateItemQuantity,
  } = useCartStore((state) => state);
  const { items: wishlistItems, toggle } = useWishlistStore((state) => state);

  // Format price to IDR
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(item.price));

  function handleAddToCart() {
    const isInCart = cartItems.some((cartItem) => cartItem.item.id === item.id);
    if (isInCart) {
      updateItemQuantity(item.id, 1);
    } else {
      addItem({ item, quantity: 1 });
    }
    toast.success(commonLang.addedToCart(item.name));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-muted-foreground">
            {item.type_type || lang.typeFallback}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {item.name}
        </h1>
        <p className="text-primary text-2xl font-bold">{formattedPrice}</p>
      </div>

      <div className="space-y-4">
        <div className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-[1fr_auto] md:items-center">
          <Button
            onClick={handleAddToCart}
            className="h-12 w-full gap-2 whitespace-normal md:h-9 md:whitespace-nowrap"
            size="default"
            variant="default"
          >
            <ShoppingCart className="size-5 md:size-4" />
            {commonLang.addToCart}
          </Button>

          <Button
            size="icon"
            variant={
              wishlistItems.some((w) => w.item.id === item.id)
                ? "default"
                : "outline"
            }
            className={
              wishlistItems.some((w) => w.item.id === item.id)
                ? "bg-destructive hover:bg-destructive/90 text-destructive size-12 shrink-0 md:size-9"
                : "text-muted-foreground hover:text-destructive hover:border-destructive size-12 shrink-0 md:size-9"
            }
            aria-label={
              wishlistItems.some((w) => w.item.id === item.id)
                ? wishlistLang.removeAria
                : wishlistLang.addAria
            }
            aria-pressed={wishlistItems.some((w) => w.item.id === item.id)}
            onClick={() => {
              const isWishlisted = wishlistItems.some(
                (w) => w.item.id === item.id
              );
              if (!isWishlisted && wishlistItems.length >= MAX_ITEMS) {
                toast.error(wishlistLang.limitReached(MAX_ITEMS));
                return;
              }
              const ok = toggle(item);
              if (!ok) {
                toast.error(wishlistLang.storageError);
                return;
              }
              if (isWishlisted) {
                toast.info(wishlistLang.removed(item.name));
              } else {
                toast.success(wishlistLang.added(item.name));
              }
            }}
          >
            <Heart className="fill-muted size-5 md:size-4" />
          </Button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-semibold">{lang.description}</h3>
        <div
          className="prose prose-sm text-muted-foreground max-w-none"
          dangerouslySetInnerHTML={{ __html: item.description || "" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {lang.weight}
          </p>
          <p className="text-sm">{item.weight} g</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {lang.dimensions}
          </p>
          <p className="text-sm">{item.dimension || "-"}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {lang.stock}
          </p>
          <p className="text-sm">
            {item.inventories?.reduce(
              (acc, inv) => acc + Number(inv.balance),
              0
            ) || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
