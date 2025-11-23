import lang from "@/lang/id/home/latest-products.lang";
import { InfiniteItemGrid } from "@/features/items/components/infinite-item-grid";
import { SearchBar } from "@/features/items/components/search-bar";
import { getItems } from "@/features/items/services/get-items";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getItems({ length: 10 });

  return (
    <>
      <div className="mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
        <h2 className="mb-3 text-xl font-extrabold uppercase md:mb-6 md:text-2xl">
          {lang.titleLatestItems}
        </h2>
        <div className="mb-4 md:mb-6">
          <SearchBar />
        </div>
        <InfiniteItemGrid
          initialItems={items.data}
          initialTotal={items.recordsFiltered}
          batchSize={10}
        />
      </div>
    </>
  );
}
