import checkoutLang from "@/lang/id/checkout/checkout.lang";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutActions } from "@/features/checkout/components/checkout-action";
import { CheckoutContent } from "@/features/checkout/components/checkout-content";

import { getOrder } from "@/features/orders/services/get-order";
import { generateMetadata as genMeta } from "@/config/metadata.config";

export const metadata = genMeta({
  title: "Checkout - Proses Pembayaran",
  description:
    "Selesaikan pembelian suku cadang CNC Anda dengan proses checkout yang aman dan mudah. Pembayaran cepat, pengiriman terpercaya.",
  noIndex: true,
});

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getOrder(id);

  if (!response.success || !response.data?.[0]) {
    return <div>{checkoutLang.failedToLoadOrder}</div>;
  }

  const order = response.data[0];

  return (
    <section>
      <h1 className="mb-4 text-2xl font-extrabold uppercase md:mb-8 md:text-4xl">
        {checkoutLang.checkoutTitle}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>{checkoutLang.orderDetailsTitle}</CardTitle>
          </CardHeader>
          <CheckoutContent order={order} />
        </Card>
        <Card className="col-span-1 h-fit md:sticky md:top-16 md:col-span-2">
          <CardHeader>
            <CardTitle>{checkoutLang.paymentActionsTitle}</CardTitle>
          </CardHeader>
          <CheckoutActions order={order} />
        </Card>
      </div>
    </section>
  );
}
