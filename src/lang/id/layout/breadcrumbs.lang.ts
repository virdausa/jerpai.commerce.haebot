interface BreadcrumbsLang {
  ariaLabel: string;
  home: string;
  products: string;
  wishlist: string;
  cart: string;
  orders: string;
  checkout: string;
  categories: string;
  account: string;
  searchLabel: (query: string) => string;
  orderIdLabel: (id: number | string) => string;
  segmentTitle: (segment: string) => string;
}

const lang: BreadcrumbsLang = {
  ariaLabel: "Jejak Navigasi",
  home: "Beranda",
  products: "Produk",
  wishlist: "Daftar Keinginan",
  cart: "Keranjang",
  orders: "Riwayat Belanja",
  checkout: "Checkout",
  categories: "Kategori",
  account: "Akun",
  searchLabel: (query: string) => `Pencarian: ${query}`,
  orderIdLabel: (id: number | string) => `Pesanan #${id}`,
  segmentTitle: (segment: string) =>
    segment
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "),
};

export type { BreadcrumbsLang };
export default lang;
