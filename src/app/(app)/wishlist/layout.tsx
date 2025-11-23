import { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/metadata.config";

export const metadata: Metadata = genMeta({
  title: "Wishlist - Daftar Favorit",
  description:
    "Daftar wishlist produk suku cadang CNC favorit Anda. Simpan item yang ingin dibeli nanti untuk akses mudah.",
  noIndex: true,
});

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
