interface CheckoutLang {
  // Page titles
  checkoutTitle: string;
  orderDetailsTitle: string;
  paymentActionsTitle: string;
  failedToLoadOrder: string;
  // Order details
  orderNumber: string;
  itemDetails: string;
  orderDetails: string;
  emptyCart: string;
  total: string;
  continueToWhatsapp: string;
  whatsappMessage: {
    greeting: (orderId: number) => string;
    detailsHeader: string;
    total: (total: string) => string;
  };
}

const lang: CheckoutLang = {
  // Page titles
  checkoutTitle: "Checkout",
  orderDetailsTitle: "Detail Pesanan",
  paymentActionsTitle: "Aksi Pembayaran",
  failedToLoadOrder: "Gagal memuat pesanan",
  // Order details
  orderNumber: "Nomor Pesanan",
  itemDetails: "Rincian Item",
  orderDetails: "Rincian Pesanan",
  emptyCart: "Keranjang kosong",
  total: "Total",
  continueToWhatsapp: "Lanjutkan ke Whatsapp",
  whatsappMessage: {
    greeting: (orderId: number) =>
      `Saya mau membayar pesanan dengan nomor pesanan ${orderId}.`,
    detailsHeader: "Rincian Pesanan:",
    total: (total: string) => `Total: ${total}`,
  },
};

export type { CheckoutLang };
export default lang;
