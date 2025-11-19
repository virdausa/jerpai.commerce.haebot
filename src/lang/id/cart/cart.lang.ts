interface CartLang {
  title: string;
  summaryTitle: string;
  productsInCart: string;
  emptyCart: string;
  cartItemList: string;
  subtotal: string;
  discount: string;
  tax: string;
  deliveryFee: string;
  total: string;
  freeDelivery: string;
  promoCodePlaceholder: string;
  applyPromo: string;
  promoNotAvailable: string;
  proceedToCheckout: string;
  processing: string;
  productLabel: (name: string) => string;
  decreaseQuantity: string;
  increaseQuantity: string;
  removeItem: string;
  itemRemovedFromCart: (name: string) => string;
  undoAction: string;
  checkoutValidationFailed: string;
  checkoutProcessingFailed: string;
  invalidOrderData: string;
  orderCreatedSuccess: string;
  errorOccurred: string;
}

const lang: CartLang = {
  title: "Keranjang Anda",
  summaryTitle: "Ringkasan Belanja",
  productsInCart: "Produk di Keranjang",
  emptyCart: "Keranjang kosong",
  cartItemList: "Daftar item keranjang",
  subtotal: "Subtotal",
  discount: "Diskon",
  tax: "Pajak",
  deliveryFee: "Ongkos Kirim",
  total: "Total",
  freeDelivery: "FREE",
  promoCodePlaceholder: "Masukkan kode promo",
  applyPromo: "Terapkan",
  promoNotAvailable: "Promo code sedang tidak ada",
  proceedToCheckout: "Lanjutkan ke Checkout",
  processing: "Memproses...",
  productLabel: (name: string) => `Produk ${name}`,
  decreaseQuantity: "Kurangi jumlah",
  increaseQuantity: "Tambah jumlah",
  removeItem: "Hapus item",
  itemRemovedFromCart: (name: string) => `${name} dihapus dari keranjang`,
  undoAction: "Urungkan",
  checkoutValidationFailed: "Validasi keranjang gagal",
  checkoutProcessingFailed: "Gagal memproses checkout",
  invalidOrderData: "Data pesanan tidak valid",
  orderCreatedSuccess: "Pesanan berhasil dibuat",
  errorOccurred: "Terjadi kesalahan",
};

export type { CartLang };
export { lang };
