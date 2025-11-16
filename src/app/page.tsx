import lang from "@/lang/id/home/lang";

import { Button } from "@/components/ui/button";
import { getItems } from "@/modules/items/items.service";
import { ItemGrid } from "@/components/common/items/item-grid";

export default async function Home() {
  const items = await getItems({ limit: 4 });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">{lang.titleLatestItems}</h1>
      <ItemGrid items={items.data} />
      <Button className="mx-auto mt-6 block" size="lg" variant="outline">
        Lihat Semua
      </Button>
    </div>
  );
}
