import { getItems } from "@/features/items/services/get-items";
import { ProductGallery } from "@/features/items/components/product-gallery";
import { ProductDetails } from "@/features/items/components/product-details";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  generateProductMetadata,
  getProductSchema,
  siteConfig,
} from "@/config/metadata.config";

interface PageProps {
  params: Promise<{
    productName: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { productName } = await params;
  const decodedName = decodeURIComponent(productName);

  // Fetch product to get more details
  const response = await getItems({
    q: decodedName,
    limit: 1,
  });

  const product = response.data?.[0];

  if (!product) {
    return {
      title: `Produk Tidak Ditemukan | ${siteConfig.shortName}`,
      description: "Produk yang Anda cari tidak ditemukan.",
    };
  }

  return generateProductMetadata({
    productName: product.name,
    description: `${product.name} - Suku cadang CNC berkualitas dari ${siteConfig.name}. Harga: Rp ${parseFloat(product.price).toLocaleString("id-ID")}. Ready stock, garansi resmi, pengiriman cepat ke seluruh Indonesia.`,
    price: parseFloat(product.price),
    image:
      typeof product.images?.[0] === "string"
        ? product.images[0]
        : product.images?.[0]?.path || siteConfig.ogImage,
    inStock: true,
  });
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

  // Generate product structured data
  const productImagePath =
    typeof product.images?.[0] === "string"
      ? product.images[0]
      : product.images?.[0]?.path || siteConfig.ogImage;

  const productSchema = getProductSchema({
    name: product.name,
    description: `${product.name} - Suku cadang CNC berkualitas dari ${siteConfig.name}`,
    image: productImagePath,
    price: parseFloat(product.price),
    currency: "IDR",
    inStock: true,
    sku: product.id?.toString(),
  });

  return (
    <section>
      {/* Structured Data for Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Side: Image Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Right Side: Product Details */}
        <ProductDetails item={product} />
      </div>
    </section>
  );
}
