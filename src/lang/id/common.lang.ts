interface CommonLang {
  seeAll: string;
  continueShopping: string;
  addToCart: string;
  addedToCart: (itemName: string) => string;
}

const lang: CommonLang = {
  seeAll: "Lihat Semua",
  continueShopping: "Lanjut Belanja",
  addToCart: "Tambah ke Keranjang",
  addedToCart: (itemName: string) => `${itemName} ditambahkan ke keranjang`,
};

export type { CommonLang };
export default lang;
