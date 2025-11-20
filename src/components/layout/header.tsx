"use client";

import navLang from "@/lang/id/layout/navigation.lang";

import Link from "next/link";
import Image from "next/image";

import haebot from "@/assets/logos/haebot.png";

import { Search, ShoppingCart, User2, Heart } from "lucide-react";

import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { navigationData } from "@/data/navigation.data";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import { useWishlistStore } from "@/features/wishlist/providers/wishlist-store-provider";

function Header() {
  const { items } = useCartStore((state) => state);
  const { items: wishlistItems } = useWishlistStore((state) => state);

  return (
    <header className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="size-8 md:hidden" />
              <Link href="/">
                <Image
                  src={haebot}
                  alt="Haebot"
                  className="h-8 w-fit md:h-10"
                />
              </Link>
            </div>
            <nav className="hidden items-center gap-4 md:flex">
              {navigationData.map((item) => (
                <Link
                  key={`header-nav-${item.title}`}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                placeholder={navLang.searchPlaceholder}
                className="w-full pl-9 md:max-w-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/wishlist" className="relative">
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-1.25 -right-1.25 size-5 rounded-full px-1 tabular-nums">
                  {wishlistItems.length}
                </Badge>
              )}
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="size-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              {items.length > 0 && (
                <Badge className="absolute -top-1.25 -right-1.25 size-5 rounded-full px-1 tabular-nums">
                  {items.length}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                aria-label={navLang.cartAriaLabel}
              >
                <ShoppingCart className="size-5" />
                <span className="sr-only">{navLang.cartAriaLabel}</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label={navLang.profileAriaLabel}
            >
              <User2 className="size-5" />
              <span className="sr-only">{navLang.profileAriaLabel}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
