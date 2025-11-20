interface CommonLang {
  seeAll: string;
  continueShopping: string;
  addToCart: string;
  addedToCart: (itemName: string) => string;
  paginationPrevLabel: string;
  paginationNextLabel: string;
  paginationPrevAriaLabel: string;
  paginationNextAriaLabel: string;
  paginationMorePagesSrLabel: string;
  paginationAriaLabel?: string;
  productsPageDescription: string;
}

const lang: CommonLang = {
  seeAll: "Lihat Semua",
  continueShopping: "Lanjut Belanja",
  addToCart: "Tambah ke Keranjang",
  addedToCart: (itemName: string) => `${itemName} ditambahkan ke keranjang`,
  paginationPrevLabel: "Sebelumnya",
  paginationNextLabel: "Berikutnya",
  paginationPrevAriaLabel: "Ke halaman sebelumnya",
  paginationNextAriaLabel: "Ke halaman berikutnya",
  paginationMorePagesSrLabel: "Halaman lainnya",
  paginationAriaLabel: "Navigasi halaman",
  productsPageDescription: "Jelajahi koleksi produk kami",
};

export type { CommonLang };
export default lang;
