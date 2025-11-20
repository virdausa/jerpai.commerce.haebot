"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import itemLang from "@/lang/id/items/item.lang";
import navLang from "@/lang/id/layout/navigation.lang";

import { Item } from "@/features/items/types/item";
import { ItemCard } from "@/features/items/components/item-card";
import { fetchItems } from "@/features/items/actions/fetch-items";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface ProductListProps {
  initialItems: Item[];
  initialTotal: number;
}

export function ProductList({ initialItems, initialTotal }: ProductListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [items, setItems] = useState<Item[]>(initialItems);
  const [totalItems, setTotalItems] = useState(initialTotal);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const debouncedSearch = useDebounce(searchQuery, 500);
  const firstRender = useRef(true);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchPage = useCallback(async (currentPage: number, query: string) => {
    setLoading(true);
    try {
      const response = await fetchItems(currentPage, query);
      setItems(response.data);
      setTotalItems(response.recordsFiltered);
      setPage(currentPage);
    } catch (error) {
      toast.error(itemLang.failedToLoadItems);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search change
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Reset to page 1 and fetch
    router.push(`?page=${1}&q=${debouncedSearch}`);
    fetchPage(1, debouncedSearch);
  }, [debouncedSearch, fetchPage, router]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    router.push(`?page=${newPage}&q=${debouncedSearch}`);
    fetchPage(newPage, debouncedSearch);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={page === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            isActive={page === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and neighbors
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={page === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder={navLang.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:gap-x-5 md:gap-y-8 lg:grid-cols-4">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground py-10 text-center">
              {itemLang.noProductsFound}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page - 1);
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page + 1);
                    }}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
