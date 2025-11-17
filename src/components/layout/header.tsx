import Link from "next/link";
import Image from "next/image";

import haebot from "@/assets/logos/haebot.png";

import { Search, ShoppingCart, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "../ui/sidebar";
import { navigationData } from "@/data/navigation.data";

function Header() {
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
                placeholder="Cari produk..."
                className="w-full pl-9 md:max-w-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Keranjang">
              <ShoppingCart className="size-5" />
              <span className="sr-only">Keranjang</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Profil">
              <User2 className="size-5" />
              <span className="sr-only">Profil</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
