import { Skeleton } from "@/components/ui/skeleton";
import checkoutLang from "@/lang/id/checkout/checkout.lang";

export default function Loading() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-extrabold uppercase md:mb-8 md:text-4xl">
        {checkoutLang.checkoutTitle}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Skeleton className="col-span-1 h-64 md:col-span-3" />
        <Skeleton className="col-span-1 h-48 md:col-span-2" />
      </div>
    </section>
  );
}
