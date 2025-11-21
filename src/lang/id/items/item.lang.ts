interface ItemLang {
  badgeLatest: string;
  typeFallback: string;
  noProductsFound: string;
  failedToLoadItems: string;
  addToCart: string;
  addToWishlist: string;
  description: string;
  price: string;
  sku: string;
  weight: string;
  dimensions: string;
  stock: string;
  backToProducts: string;
}

const lang: ItemLang = {
  badgeLatest: "Terbaru",
  typeFallback: "Produk",
  noProductsFound: "Tidak ada produk",
  failedToLoadItems: "Gagal memuat produk",
  addToCart: "Tambah ke Keranjang",
  addToWishlist: "Tambah ke Wishlist",
  description: "Deskripsi",
  price: "Harga",
  sku: "SKU",
  weight: "Berat",
  dimensions: "Dimensi",
  stock: "Stok",
  backToProducts: "Kembali ke Produk",
};

export type { ItemLang };
export default lang;
