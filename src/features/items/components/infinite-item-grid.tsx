"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import itemLang from "@/lang/id/items/item.lang";
import { Item } from "@/features/items/types/item";
import { ItemCard } from "@/features/items/components/item-card";
import { fetchItemsBatch } from "@/features/items/actions/fetch-items-batch";
import { Skeleton } from "@/components/ui/skeleton";

interface InfiniteItemGridProps {
  initialItems: Item[];
  initialTotal: number;
  batchSize?: number;
}

export function InfiniteItemGrid({
  initialItems,
  initialTotal,
  batchSize = 10,
}: InfiniteItemGridProps) {
  const [items, setItems] = React.useState<Item[]>(initialItems);
  const [total, setTotal] = React.useState<number>(initialTotal);
  const [start, setStart] = React.useState<number>(initialItems.length);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hasMore, setHasMore] = React.useState<boolean>(
    initialItems.length < initialTotal
  );
  const [virtualize, setVirtualize] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = React.useState<number>(1);

  const ROW_HEIGHT = 360;
  const debounceRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const style = window.getComputedStyle(c);
    const colCount = style.gridTemplateColumns
      .split(" ")
      .filter(Boolean).length;
    setColumns(Math.max(1, colCount));
    const onResize = () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        const s = window.getComputedStyle(c);
        const cc = s.gridTemplateColumns.split(" ").filter(Boolean).length;
        setColumns(Math.max(1, cc));
      }, 300);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const loadMore = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetchItemsBatch(start, batchSize);
      const next = res.data ?? [];
      setItems((prev) => [...prev, ...next]);
      setStart((s) => s + next.length);
      setTotal(res.recordsFiltered ?? total);
      if (next.length === 0 || start + next.length >= res.recordsFiltered) {
        setHasMore(false);
      }
      if (items.length + next.length > 200) {
        setVirtualize(true);
      }
    } catch (err) {
      setHasMore(false);
      toast.error(itemLang.failedToLoadItems);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [batchSize, hasMore, loading, start, total, items.length]);

  React.useEffect(() => {
    const onScroll = () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        const scrolled = window.scrollY;
        const viewport = window.innerHeight;
        const full = document.documentElement.scrollHeight;
        const distance = full - (scrolled + viewport);
        if (distance < 300) {
          loadMore();
        }
      }, 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore]);

  const [visibleStart, setVisibleStart] = React.useState<number>(0);
  const [visibleEnd, setVisibleEnd] = React.useState<number>(items.length);

  React.useEffect(() => {
    if (!virtualize || !containerRef.current) {
      setVisibleStart(0);
      setVisibleEnd(items.length);
      return;
    }
    const update = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      const top = Math.max(0, -rect.top + window.scrollY);
      const rowsInView = Math.ceil(window.innerHeight / ROW_HEIGHT) + 6;
      const startRow = Math.max(0, Math.floor(top / ROW_HEIGHT) - 3);
      const endRow = startRow + rowsInView;
      const startIndex = startRow * columns;
      const endIndex = Math.min(items.length, endRow * columns);
      setVisibleStart(startIndex);
      setVisibleEnd(endIndex);
    };
    update();
    const onScroll = () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(update, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [virtualize, columns, items.length]);

  const totalRows = React.useMemo(() => {
    return Math.ceil(items.length / Math.max(1, columns));
  }, [items.length, columns]);

  const topSpacerRows = React.useMemo(() => {
    return virtualize ? Math.floor(visibleStart / Math.max(1, columns)) : 0;
  }, [visibleStart, columns, virtualize]);

  const bottomSpacerRows = React.useMemo(() => {
    if (!virtualize) return 0;
    const endRow = Math.ceil(visibleEnd / Math.max(1, columns));
    return Math.max(0, totalRows - endRow);
  }, [visibleEnd, columns, virtualize, totalRows]);

  return (
    <div className="space-y-6">
      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-x-2 gap-y-3 sm:gap-x-4 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-5"
        style={virtualize ? { gridAutoRows: `${ROW_HEIGHT}px` } : undefined}
      >
        {virtualize && topSpacerRows > 0 && (
          <div
            style={{
              gridColumn: `1 / -1`,
              height: `${topSpacerRows * ROW_HEIGHT}px`,
            }}
          />
        )}
        {(virtualize ? items.slice(visibleStart, visibleEnd) : items).map(
          (item) => (
            <div key={item.id}>
              <ItemCard item={item} />
            </div>
          )
        )}
        {virtualize && bottomSpacerRows > 0 && (
          <div
            style={{
              gridColumn: `1 / -1`,
              height: `${bottomSpacerRows * ROW_HEIGHT}px`,
            }}
          />
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-2 py-6">
          <Loader2 className="h-6 w-6 animate-spin" />
          <div className="text-muted-foreground text-sm">
            {itemLang.loadingMore}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={`sk-${i}`} className="h-40" />
            ))}
          </div>
        </div>
      )}

      {!loading && !hasMore && (
        <div className="text-muted-foreground py-6 text-center text-sm">
          {itemLang.endOfList}
        </div>
      )}
    </div>
  );
}
