import { z } from "zod";
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
  const raw = await searchParams;
  const parsed = z
    .object({ page: z.string().optional(), q: z.string().optional() })
    .safeParse(raw);
  const pageStr = parsed.success ? parsed.data.page : undefined;
  const qRaw = parsed.success ? parsed.data.q : undefined;
  const pageNum = (() => {
    const n = Number(pageStr);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
  })();
  const q = (() => {
    const t = (qRaw ?? "").trim();
    return t.replace(/[\r\n\t\u0000-\u001F]+/g, "");
  })();
  const initialItems = await fetchItems(pageNum, q);

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
