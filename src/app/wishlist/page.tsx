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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-semibold">Wishlist</h1>
              <p className="text-muted-foreground">Your wishlist is empty.</p>
              <Button asChild>
                <Link href="/products">Browse products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Wishlist ({items.length})</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="wishlist-sort" className="text-sm">
            Sort
          </label>
          <Select value={sortBy} onValueChange={(v) => setSort(v as SortBy)}>
            <SelectTrigger id="wishlist-sort" className="w-[180px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">Date added (newest)</SelectItem>
              <SelectItem value="date_asc">Date added (oldest)</SelectItem>
              <SelectItem value="price_desc">Price (high → low)</SelectItem>
              <SelectItem value="price_asc">Price (low → high)</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => {
              clear();
              toast.message("Wishlist cleared");
            }}
          >
            Clear all
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
