"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search as SearchIcon, Loader2 as Loader2Icon } from "lucide-react";

import navLang from "@/lang/id/layout/navigation.lang";
import itemLang from "@/lang/id/items/item.lang";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const trimmed = query.trim();
      const sanitized = trimmed.replace(/[\r\n\t\u0000-\u001F]+/g, "");

      if (sanitized.length === 0) {
        toast.info(itemLang.emptySearchShowsAll);
        router.push("/products");
        return;
      }

      const encoded = encodeURIComponent(sanitized);
      router.push(`/products?q=${encoded}`);
    } finally {
      // Navigation will take over, but ensure UI feedback clears if needed
      setTimeout(() => setSubmitting(false), 400);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={navLang.searchLabel}
      aria-busy={submitting ? "true" : "false"}
      className="flex w-full flex-col gap-2"
      data-testid="home-search-bar"
    >
      <Label htmlFor="home-search-input" className="text-sm font-semibold">
        {navLang.searchLabel}
      </Label>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            id="home-search-input"
            name="q"
            inputMode="search"
            placeholder={navLang.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10"
            aria-invalid={false}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          aria-label={navLang.searchButtonLabel}
          disabled={submitting}
          aria-disabled={submitting ? "true" : "false"}
          className="h-12 sm:h-9"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2Icon className="animate-spin" />
              {navLang.searchButtonLabel}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <SearchIcon className="size-4" />
              {navLang.searchButtonLabel}
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
