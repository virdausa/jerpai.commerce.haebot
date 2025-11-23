import { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/metadata.config";

export const metadata: Metadata = genMeta({
  title: "Keranjang Belanja - Shopping Cart",
  description:
    "Keranjang belanja suku cadang CNC Anda. Tinjau item yang dipilih dan lanjutkan ke checkout untuk menyelesaikan pembelian.",
  noIndex: true,
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
