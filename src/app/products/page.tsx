import { ProductList } from "@/features/items/components/product-list";
import { fetchItems } from "@/features/items/actions/fetch-items";

export const metadata = {
  title: "Products | Jerpai",
  description: "Browse our collection of products",
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
    <div className="mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
      <h1 className="mb-6 text-2xl font-extrabold uppercase md:text-3xl">
        Products
      </h1>
      <ProductList
        initialItems={initialItems.data}
        initialTotal={initialItems.recordsFiltered}
      />
    </div>
  );
}
