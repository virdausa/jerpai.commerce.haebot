import lang from "@/lang/id/home/lang";

import { Button } from "@/components/ui/button";
import { getItems } from "@/modules/items/items.service";
import { ItemGrid } from "@/components/common/items/item-grid";

export default async function Home() {
  const items = await getItems({ limit: 4 });

  return (
    <div className="mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
      <h1 className="mb-4 text-2xl font-bold md:mb-8 md:text-3xl">
        {lang.titleLatestItems}
      </h1>
      <ItemGrid items={items.data} />
      <Button
        className="mx-auto mt-4 block md:mt-6"
        size="lg"
        variant="outline"
      >
        Lihat Semua
      </Button>
    </div>
  );
}
