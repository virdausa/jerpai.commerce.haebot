"use client";

import Link from "next/link";

import { useWishlistStore } from "@/features/wishlist/providers/wishlist-store-provider";
import {
  safeParsePrice,
  SortBy,
} from "@/features/wishlist/stores/wishlist-store";
import { ItemCard } from "@/features/items/components/item-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import wishlistLang from "@/lang/id/wishlist/wishlist.lang";

export default function WishlistPage() {
  const { items, clear, setSort, sortBy } = useWishlistStore((s) => s);

  const sorted = (() => {
    const arr = [...items];
    switch (sortBy) {
      case "date_asc":
        arr.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
        break;
      case "price_asc":
        arr.sort(
          (a, b) => safeParsePrice(a.item.price) - safeParsePrice(b.item.price)
        );
        break;
      case "price_desc":
        arr.sort(
          (a, b) => safeParsePrice(b.item.price) - safeParsePrice(a.item.price)
        );
        break;
      case "date_desc":
      default:
        arr.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
        break;
    }
    return arr;
  })();

  if (items.length === 0) {
    return (
      <div>
        <Card>
          <CardContent className="p-6">
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon" aria-hidden="true">
                  <Heart className="size-6" aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>{wishlistLang.empty}</EmptyTitle>
                <EmptyDescription>
                  {wishlistLang.emptyDescription}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  asChild
                  variant="outline-primary"
                  aria-label={wishlistLang.browseProducts}
                  size="lg"
                  className="h-12 md:h-9"
                >
                  <Link href="/products">{wishlistLang.browseProducts}</Link>
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {wishlistLang.titleCount(items.length)}
        </h1>
        <div className="flex items-center gap-2">
          <label htmlFor="wishlist-sort" className="text-sm">
            {wishlistLang.sortLabel}
          </label>
          <Select value={sortBy} onValueChange={(v) => setSort(v as SortBy)}>
            <SelectTrigger id="wishlist-sort" className="w-[180px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">{wishlistLang.dateDesc}</SelectItem>
              <SelectItem value="date_asc">{wishlistLang.dateAsc}</SelectItem>
              <SelectItem value="price_desc">
                {wishlistLang.priceDesc}
              </SelectItem>
              <SelectItem value="price_asc">{wishlistLang.priceAsc}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => {
              clear();
              toast.message(wishlistLang.cleared);
            }}
          >
            {wishlistLang.clearAll}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sorted.map((w) => (
          <ItemCard key={`wl-${w.item.id}`} item={w.item} />
        ))}
      </div>
    </div>
  );
}
