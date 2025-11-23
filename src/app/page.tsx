import { Metadata } from "next";
import lang from "@/lang/id/home/latest-products.lang";
import { InfiniteItemGrid } from "@/features/items/components/infinite-item-grid";
import { SearchBar } from "@/features/items/components/search-bar";
import { getItems } from "@/features/items/services/get-items";
import { HeroCarousel } from "@/features/home/components/hero-carousel";
import {
  generateMetadata as genMeta,
  getOrganizationSchema,
  siteConfig,
} from "@/config/metadata.config";

export const metadata: Metadata = genMeta({
  title: `${siteConfig.shortName} - Suku Cadang CNC, Mesin CNC & Layanan Perbaikan Terpercaya di ${siteConfig.location.city}`,
  description: `${siteConfig.description} PT HaeBot Teknologi Indonesia menyediakan berbagai suku cadang CNC berkualitas, mesin CNC, dan jasa perbaikan profesional dengan harga terbaik.`,
  keywords: [
    "toko CNC terlengkap",
    "distributor spare parts CNC",
    "dealer mesin CNC",
    "jasa maintenance CNC profesional",
    "suku cadang original",
  ],
  url: "/",
});

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getItems({ length: 10 });
  const organizationSchema = getOrganizationSchema();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Products Section */}
      <div className="mx-auto max-w-7xl px-3 py-5 md:px-6 md:py-10">
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
