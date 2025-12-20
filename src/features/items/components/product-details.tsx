"use client";

import { Item } from "@/features/items/types/item";
import { Button } from "@/components/ui/button";
import { Download, FileText, Heart, ShoppingCart } from "lucide-react";
import lang from "@/lang/id/items/item.lang";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import { useWishlistStore } from "@/features/wishlist/providers/wishlist-store-provider";
import { toast } from "sonner";
import commonLang from "@/lang/id/common.lang";
import wishlistLang from "@/lang/id/wishlist/wishlist.lang";
import { MAX_ITEMS } from "@/features/wishlist/stores/wishlist-store";
import { RichTextRenderer } from "@/components/rich-text-renderer";

interface ProductDetailsProps {
  item: Item;
}

/**
 * Formats a number to IDR currency format.
 * @param value - The numeric value or string to format
 * @returns Formatted IDR currency string
 */
function formatPrice(value: string | number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));
}

/**
 * Generates the download URL for a file using the CDN base URL.
 * @param filePath - The relative path of the file
 * @returns Full download URL
 */
function getFileDownloadUrl(filePath: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_NEW_ERP_URL;
  return `${baseUrl}/${filePath}`;
}

/**
 * Checks if the item has a valid discount price.
 * @param priceDiscount - The discount price value
 * @returns True if discount is valid and greater than 0
 */
function hasValidDiscount(priceDiscount: string | null): boolean {
  return priceDiscount !== null && Number(priceDiscount) > 0;
}

export function ProductDetails({ item }: ProductDetailsProps) {
  const {
    items: cartItems,
    addItem,
    updateItemQuantity,
  } = useCartStore((state) => state);
  const { items: wishlistItems, toggle } = useWishlistStore((state) => state);

  const showDiscount = hasValidDiscount(item.price_discount);
  const displayPrice = showDiscount
    ? formatPrice(item.price_discount!)
    : formatPrice(item.price);
  const originalPrice = formatPrice(item.price);

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
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-primary text-2xl font-bold">{displayPrice}</p>
          {showDiscount && (
            <p
              className="text-muted-foreground text-lg line-through"
              aria-label={lang.originalPrice}
            >
              {originalPrice}
            </p>
          )}
        </div>
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
        <RichTextRenderer editorState={item.description ?? ""} />
      </div>

      {/* Files Section */}
      {item.files && item.files.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="mb-4 text-lg font-semibold">{lang.files}</h3>
          <ul className="space-y-2">
            {item.files.map((file, index) => (
              <li
                key={`${file.path}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="text-muted-foreground size-5 shrink-0" />
                  <span className="truncate text-sm font-medium">
                    {file.name}
                  </span>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-9 shrink-0 gap-2"
                >
                  <a
                    href={getFileDownloadUrl(file.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${lang.downloadFile} ${file.name}`}
                  >
                    <Download className="size-4" />
                    <span className="hidden sm:inline">
                      {lang.downloadFile}
                    </span>
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
