"use client";

import type { Item } from "@/features/items/types/item";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

import { toast } from "sonner";

import placeholder from "@/assets/images/placeholder.jpg";
import itemLang from "@/lang/id/items/item.lang";
import commonLang from "@/lang/id/common.lang";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import { useWishlistStore } from "@/features/wishlist/providers/wishlist-store-provider";
import { MAX_ITEMS } from "@/features/wishlist/stores/wishlist-store";
import { formatIDR, getFullImageUrl } from "@/lib/utils";
import wishlistLang from "@/lang/id/wishlist/wishlist.lang";
import Link from "next/link";

interface ItemCardProps {
  item: Item;
  showLatestBadge?: boolean;
}

function ItemCard({ item, showLatestBadge }: ItemCardProps) {
  const { items, addItem, updateItemQuantity } = useCartStore((state) => state);
  const { items: wishlistItems, toggle } = useWishlistStore((state) => state);

  const image = item.images?.[0];
  const imageUrl = image?.path ? getFullImageUrl(image.path) : placeholder;

  function handleAddToCart() {
    const isInCart = items.some((cartItem) => cartItem.item.id === item.id);
    if (isInCart) {
      updateItemQuantity(item.id, 1);
    } else {
      addItem({ item, quantity: 1 });
    }
    toast.success(commonLang.addedToCart(item.name));
  }

  return (
    <Link href={`/products/${encodeURIComponent(item.name)}`}>
      <Card
        key={item.id}
        className="group border-border bg-card text-card-foreground relative flex h-full flex-col overflow-hidden rounded-xl pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Image Section */}
        <div className="bg-muted relative aspect-square w-full overflow-hidden">
          <Skeleton className="absolute inset-0 size-full" />
          <Image
            src={imageUrl}
            alt={item.name}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
            height={300}
            width={300}
          />
          {showLatestBadge && (
            <Badge className="bg-background/80 text-foreground hover:bg-background/90 absolute top-3 left-3 z-10 backdrop-blur-sm">
              {itemLang.badgeLatest}
            </Badge>
          )}

          {/* Quick Actions Overlay (Optional - can be always visible or on hover) */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {/* Placeholder for future quick actions like 'Quick View' */}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          {/* Category / Type */}
          <div className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">
            {item.type_type || itemLang.typeFallback}
          </div>

          {/* Title */}
          <h3
            className="text-foreground mb-2 line-clamp-2 min-h-[2.5rem] text-base leading-tight font-semibold"
            title={item.name}
          >
            {item.name}
          </h3>

          {/* Price */}
          <div className="mt-auto mb-4 flex items-baseline gap-2">
            <span className="text-primary text-lg font-bold md:text-xl">
              {formatIDR(item.price)}
            </span>
            {/* Optional: Show original price if discounted */}
            {/* <span className="text-sm text-muted-foreground line-through">Rp 999.000</span> */}
          </div>

          {/* Actions */}
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
        </CardContent>
      </Card>
    </Link>
  );
}

export { ItemCard };
