import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutActions } from "@/features/checkout/components/checkout-action";
import { CheckoutContent } from "@/features/checkout/components/checkout-content";

import { getOrder } from "@/features/orders/services/get-order";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getOrder(id);

  if (!response.success || !response.data?.[0]) {
    return <div>Gagal memuat pesanan</div>;
  }

  const order = response.data[0];

  return (
    <section className="container mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
      <h1 className="mb-4 text-2xl font-extrabold uppercase md:mb-8 md:text-4xl">
        Checkout
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Detail Pesanan</CardTitle>
          </CardHeader>
          <CheckoutContent order={order} />
        </Card>
        <Card className="col-span-1 h-fit md:sticky md:top-16 md:col-span-2">
          <CardHeader>
            <CardTitle>Aksi Pembayaran</CardTitle>
          </CardHeader>
          <CheckoutActions order={order} />
        </Card>
      </div>
    </section>
  );
}
