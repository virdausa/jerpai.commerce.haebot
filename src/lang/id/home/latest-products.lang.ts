interface LatestProductsLang {
  // Title
  titleLatestItems: string;

  // Badges
  badgeLatest: string;

  // Buttons
  buttonAddToCart: string;
}

const lang: LatestProductsLang = {
  // Title
  titleLatestItems: "Produk Terbaru",

  // Badges
  badgeLatest: "Terbaru",

  // Buttons
  buttonAddToCart: "Tambah ke Keranjang",
};

export type { LatestProductsLang };
export default lang;
