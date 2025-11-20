interface ItemLang {
  badgeLatest: string;
  typeFallback: string;
  noProductsFound: string;
  failedToLoadItems: string;
}

const lang: ItemLang = {
  badgeLatest: "Terbaru",
  typeFallback: "Produk",
  noProductsFound: "Tidak ada produk",
  failedToLoadItems: "Gagal memuat produk",
};

export type { ItemLang };
export default lang;
