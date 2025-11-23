import { OrdersHistory } from "@/features/orders/components/orders-history";
import { generateMetadata as genMeta } from "@/config/metadata.config";

export const metadata = genMeta({
  title: "Riwayat Pesanan - Order History",
  description:
    "Lihat riwayat pesanan suku cadang CNC Anda. Pantau status pengiriman dan detail pembelian sebelumnya.",
  noIndex: true,
});

export default function OrdersPage() {
  return (
    <section>
      <OrdersHistory />
    </section>
  );
}
