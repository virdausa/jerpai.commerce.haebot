import lang from "@/lang/id/home/latest-products.lang";
import commonLang from "@/lang/id/common.lang";

import { Button } from "@/components/ui/button";
import { ItemGrid } from "@/features/items/components/item-grid";
import { getItems } from "@/features/items/services/get-items";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getItems({ length: 4 });

  return (
    <>
      <div className="mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
        <h2 className="mb-3 text-xl font-extrabold uppercase md:mb-6 md:text-2xl">
          {lang.titleLatestItems}
        </h2>
        <ItemGrid items={items.data} />
        <Button
          className="mx-auto mt-4 block md:mt-6"
          size="lg"
          variant="outline-primary"
        >
          {commonLang.seeAll}
        </Button>
      </div>
    </>
  );
}
