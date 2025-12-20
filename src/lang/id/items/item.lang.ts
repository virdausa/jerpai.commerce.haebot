interface ItemLang {
  badgeLatest: string;
  typeFallback: string;
  noProductsFound: string;
  failedToLoadItems: string;
  emptySearchShowsAll: string;
  addToCart: string;
  addToWishlist: string;
  description: string;
  price: string;
  originalPrice: string;
  discountedPrice: string;
  sku: string;
  weight: string;
  dimensions: string;
  stock: string;
  backToProducts: string;
  loadingMore: string;
  endOfList: string;
  files: string;
  downloadFile: string;
  noFiles: string;
}

const lang: ItemLang = {
  badgeLatest: "Terbaru",
  typeFallback: "Produk",
  noProductsFound: "Tidak ada produk",
  failedToLoadItems: "Gagal memuat produk",
  emptySearchShowsAll: "Kolom pencarian kosong — menampilkan semua produk",
  addToCart: "Tambah ke Keranjang",
  addToWishlist: "Tambah ke Wishlist",
  description: "Deskripsi",
  price: "Harga",
  originalPrice: "Harga Asli",
  discountedPrice: "Harga Diskon",
  sku: "SKU",
  weight: "Berat",
  dimensions: "Dimensi",
  stock: "Stok",
  backToProducts: "Kembali ke Produk",
  loadingMore: "Memuat produk...",
  endOfList: "Tidak ada produk lagi",
  files: "File",
  downloadFile: "Unduh",
  noFiles: "Tidak ada file",
};

export type { ItemLang };
export default lang;
