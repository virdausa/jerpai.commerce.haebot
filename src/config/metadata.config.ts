import { Metadata } from "next";

/**
 * Site Configuration for PT HaeBot Teknologi Indonesia
 * Comprehensive metadata configuration for SEO optimization
 */

export const siteConfig = {
  name: "PT HaeBot Teknologi Indonesia",
  shortName: "HaeBot",
  description:
    "Solusi Terpercaya, Termurah, dan Terbaik untuk Kebutuhan CNC Anda. Spesialis suku cadang CNC, mesin CNC, dan layanan perbaikan di Blitar, Jawa Timur.",
  url: "https://shop.haebot.com",
  ogImage: "/cnc-machine.jpg",
  logo: "/haebot-logo.jpg",
  locale: "id_ID",
  location: {
    city: "Blitar",
    province: "Jawa Timur",
    country: "Indonesia",
  },
  contact: {
    email: "info@haebot.com", // Update with actual email
    phone: "+62-xxx-xxxx-xxxx", // Update with actual phone
  },
  social: {
    twitter: "@haebot", // Update with actual handle if exists
  },
};

/**
 * Comprehensive CNC-related keywords with location targeting
 */
export const keywords = {
  primary: [
    // Core CNC Keywords
    "suku cadang CNC",
    "spare parts CNC",
    "mesin CNC",
    "CNC machine",
    "perbaikan CNC",
    "reparasi CNC",
    "CNC repair",
    "service CNC",

    // Location-specific
    "toko CNC Blitar",
    "jual CNC Blitar",
    "service CNC Blitar",
    "mesin CNC Blitar",
    "spare parts CNC Blitar",
    "CNC Jawa Timur",
    "toko CNC Jawa Timur",

    // Product Categories
    "spindle CNC",
    "motor CNC",
    "controller CNC",
    "servo motor CNC",
    "ball screw",
    "linear guide",
    "bearing CNC",
    "cutting tool CNC",
    "end mill",
    "drill bit CNC",
    "collet CNC",
    "chuck CNC",

    // Machine Types
    "mesin milling CNC",
    "mesin bubut CNC",
    "CNC router",
    "CNC lathe",
    "CNC mill",
    "mesin laser CNC",
    "mesin plasma CNC",
    "mesin EDM",

    // Service Keywords
    "jasa perbaikan CNC",
    "maintenance CNC",
    "upgrade CNC",
    "retrofit CNC",
    "instalasi CNC",
    "training CNC",

    // Industry Terms
    "precision machining",
    "industrial machinery",
    "manufacturing equipment",
    "automation parts",
    "mesin industri",
    "alat presisi",
    "komponen mesin",
  ],

  // Additional descriptive keywords
  secondary: [
    "terpercaya",
    "termurah",
    "terbaik",
    "berkualitas",
    "original",
    "garansi",
    "ready stock",
    "pengiriman cepat",
    "harga kompetitif",
  ],
};

/**
 * Default metadata template
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} - ${siteConfig.description.split(".")[0]}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...keywords.primary, ...keywords.secondary],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.shortName} - ${siteConfig.description.split(".")[0]}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Spesialis CNC di ${siteConfig.location.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} - ${siteConfig.description.split(".")[0]}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.social.twitter,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    // Add verification codes when available
    google: "", // Google Search Console verification
    // yandex: "",
    // bing: "",
  },
};

/**
 * Helper function to generate page-specific metadata
 */
export function generateMetadata({
  title,
  description,
  keywords: pageKeywords = [],
  image = siteConfig.ogImage,
  url,
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noIndex?: boolean;
}): Metadata {
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const allKeywords = [
    ...keywords.primary,
    ...keywords.secondary,
    ...pageKeywords,
  ];

  return {
    title,
    description,
    keywords: allKeywords,
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.social.twitter,
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

/**
 * Helper function to generate product metadata
 */
export function generateProductMetadata({
  productName,
  description,
  price,
  image,
  inStock = true,
}: {
  productName: string;
  description?: string;
  price?: number;
  image?: string;
  inStock?: boolean;
}): Metadata {
  const title = `${productName} - Suku Cadang CNC | ${siteConfig.shortName}`;
  const desc =
    description ||
    `Beli ${productName} berkualitas di ${siteConfig.shortName}. Harga terbaik, ready stock, pengiriman cepat ke seluruh Indonesia.`;
  const productImage = image || siteConfig.ogImage;

  return {
    title,
    description: desc,
    keywords: [
      ...keywords.primary,
      productName,
      `jual ${productName}`,
      `harga ${productName}`,
      `${productName} ${siteConfig.location.city}`,
    ],
    openGraph: {
      title,
      description: desc,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [productImage],
      creator: siteConfig.social.twitter,
    },
  };
}

/**
 * Generate Organization structured data (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.province,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      // Add actual coordinates when available
      latitude: "",
      longitude: "",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "100",
    },
  };
}

/**
 * Generate Product structured data (JSON-LD)
 */
export function getProductSchema({
  name,
  description,
  image,
  price,
  currency = "IDR",
  inStock = true,
  sku,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  inStock?: boolean;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `${siteConfig.url}${image}`,
    sku: sku || name.replace(/\s+/g, "-").toUpperCase(),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: siteConfig.url,
      priceCurrency: currency,
      price: price.toString(),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "10",
    },
  };
}
