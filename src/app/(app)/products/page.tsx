import { ProductList } from "@/features/items/components/product-list";
import { fetchItems } from "@/features/items/actions/fetch-items";

export const metadata = {
  title: "Produk | HaeBot",
  description: "Jelajahi koleksi produk kami",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page, q } = await searchParams;
  const initialItems = await fetchItems(Number(page) || 1, q ?? "");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold uppercase md:text-3xl">
        Produk
      </h1>
      <ProductList
        initialItems={initialItems.data}
        initialTotal={initialItems.recordsFiltered}
      />
    </div>
  );
}
