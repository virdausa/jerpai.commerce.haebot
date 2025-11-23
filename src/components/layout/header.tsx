"use client";

import navLang from "@/lang/id/layout/navigation.lang";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import itemLang from "@/lang/id/items/item.lang";

import haebot from "@/assets/logos/haebot.png";

import {
  Search,
  ShoppingCart,
  ShoppingBag,
  User2,
  Heart,
  LogOut,
  User,
} from "lucide-react";

import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navigationData } from "@/data/navigation.data";
import { useCartStore } from "@/features/cart/providers/cart-store-provider";
import { useWishlistStore } from "@/features/wishlist/providers/wishlist-store-provider";
import { useAuthStore } from "@/features/auth/providers/auth-store-provider";

function Header() {
  const { items } = useCartStore((state) => state);
  const { items: wishlistItems } = useWishlistStore((state) => state);
  const { user, isAuthenticated, logout } = useAuthStore((state) => state);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  function handleLogout() {
    // Clear auth store
    logout();

    // Dispatch logout event for any listeners
    try {
      window.dispatchEvent(new CustomEvent("app-logout"));
    } catch {}

    // Navigate to home
    try {
      router.push("/");
    } catch {}
  }

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
      setTimeout(() => setSubmitting(false), 300);
    }
  };

  return (
    <header className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="size-8 md:hidden" />
              <Link href="/" className="hidden md:block">
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
            <form
              onSubmit={handleSearchSubmit}
              aria-label={navLang.searchLabel}
              aria-busy={submitting ? "true" : "false"}
              className="relative"
            >
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="header-search-input"
                name="q"
                inputMode="search"
                placeholder={navLang.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 md:max-w-lg"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/wishlist" className="relative">
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-1.25 -right-1.25 size-5 rounded-full px-1 tabular-nums">
                  {wishlistItems.length}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                aria-label={navLang.wishlistAriaLabel}
              >
                <Heart className="size-5" />
                <span className="sr-only">{navLang.wishlistAriaLabel}</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={navLang.profileAriaLabel}
                >
                  <User2 className="size-5" />
                  <span className="sr-only">{navLang.profileAriaLabel}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60" sideOffset={6} align="end">
                {isAuthenticated && user ? (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarImage src="" alt={user.name} />
                          <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="text-sm font-semibold">
                            {user.name}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2"
                        >
                          <User className="size-4" /> {navLang.linkAccount}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2">
                        <ShoppingBag className="size-4" />
                        {navLang.linkCartHistory}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={handleLogout}
                      variant="destructive"
                    >
                      <LogOut className="size-4" /> {navLang.linkLogout}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>
                      <div className="text-sm font-semibold">
                        {navLang.guestName || "Guest"}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/login" className="flex items-center gap-2">
                          <User className="size-4" />{" "}
                          {navLang.linkLogin || "Login"}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/register"
                          className="flex items-center gap-2"
                        >
                          <User2 className="size-4" />{" "}
                          {navLang.linkRegister || "Register"}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2">
                        <ShoppingBag className="size-4" />
                        {navLang.linkCartHistory}
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
