import { getItems } from "@/features/items/services/get-items";
import { ProductList } from "@/features/items/components/product-list";

export const metadata = {
  title: "Products | Jerpai",
  description: "Browse our collection of products",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const initialItems = await getItems({ limit: 20, page: 1 });

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
