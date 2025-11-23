import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { CartStoreProvider } from "@/features/cart/providers/cart-store-provider";
import { WishlistStoreProvider } from "@/features/wishlist/providers/wishlist-store-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HaeBot",
  description: "Toko industri dan suku cadang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} text-foreground bg-background`}>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <CartStoreProvider>
            <WishlistStoreProvider>
              <div className="flex w-full flex-col">
                <Suspense
                  fallback={
                    <header className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
                      <div className="mx-auto max-w-7xl px-6">
                        <div className="flex h-20 items-center gap-4" />
                      </div>
                    </header>
                  }
                >
                  <Header />
                </Suspense>
                <main className="w-full">{children}</main>
                <Footer />
              </div>
            </WishlistStoreProvider>
          </CartStoreProvider>
        </SidebarProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
