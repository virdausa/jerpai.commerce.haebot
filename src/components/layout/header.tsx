"use client";

import navLang from "@/lang/id/layout/navigation.lang";

import Link from "next/link";
import Image from "next/image";

import haebot from "@/assets/logos/haebot.png";

import {
  Search,
  ShoppingCart,
  ShoppingBag,
  User2,
  Heart,
  LogOut,
  Settings,
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

function Header() {
  const { items } = useCartStore((state) => state);
  const { items: wishlistItems } = useWishlistStore((state) => state);

  function handleLogout() {
    try {
      window.dispatchEvent(new CustomEvent("app-logout"));
    } catch {}
    try {
      window.location.assign("/");
    } catch {}
  }

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
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src="" alt={navLang.profileName} />
                      <AvatarFallback>
                        {navLang.profileName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-semibold">
                      {navLang.profileName}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center gap-2">
                      <User className="size-4" /> {navLang.linkAccount}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center gap-2">
                      <ShoppingBag className="size-4" />{" "}
                      {navLang.linkCartHistory}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="size-4" /> {navLang.linkSettings}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout} variant="destructive">
                  <LogOut className="size-4" /> {navLang.linkLogout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
