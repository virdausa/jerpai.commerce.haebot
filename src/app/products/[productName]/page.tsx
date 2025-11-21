import { getItems } from "@/features/items/services/get-items";
import { ProductGallery } from "@/features/items/components/product-gallery";
import { ProductDetails } from "@/features/items/components/product-details";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    productName: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { productName } = await params;
  const decodedName = decodeURIComponent(productName);

  return {
    title: `${decodedName} | Jerpai Shop`,
    description: `Buy ${decodedName} at the best price.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { productName } = await params;
  const decodedName = decodeURIComponent(productName);

  // Fetch product data
  // We use the product name as the search query
  const response = await getItems({
    q: decodedName,
    limit: 1,
  });

  const product = response.data?.[0];

  if (!product) {
    notFound();
  }

  return (
    <section className="container mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Side: Image Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Right Side: Product Details */}
        <ProductDetails item={product} />
      </div>
    </section>
  );
}
