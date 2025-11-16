import lang from "@/lang/id/home/lang";

import { Button } from "@/components/ui/button";
import { ItemGrid } from "@/components/common/items/item-grid";
import { PartnerLogo } from "@/components/home/partners-logo";
import { getItems } from "@/modules/items/items.service";

export default async function Home() {
  const items = await getItems({ limit: 4 });

  return (
    <>
      <div className="bg-primary text-primary-foreground w-full">
        <PartnerLogo />
      </div>
      <div className="mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
        <h2 className="mb-4 text-center text-2xl font-extrabold uppercase md:mb-8 md:text-4xl">
          {lang.titleLatestItems}
        </h2>
        <ItemGrid items={items.data} />
        <Button
          className="mx-auto mt-4 block md:mt-6"
          size="lg"
          variant="outline-primary"
        >
          Lihat Semua
        </Button>
      </div>
    </>
  );
}
