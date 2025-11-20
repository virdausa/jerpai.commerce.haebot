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
  unknownItem: string;
  whatsappMessage: {
    greeting: (orderId: number) => string;
    detailsHeader: string;
    total: (total: string) => string;
  };
  receiverNote: {
    email: (email: string) => string;
    name: (name: string) => string;
    phone: (phone: string) => string;
    note: (note: string) => string;
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
  unknownItem: "Item tidak diketahui",
  whatsappMessage: {
    greeting: (orderId: number) =>
      `Saya mau membayar pesanan dengan nomor pesanan ${orderId}.`,
    detailsHeader: "Rincian Pesanan:",
    total: (total: string) => `Total: ${total}`,
  },
  receiverNote: {
    email: (email: string) => `Email: ${email}`,
    name: (name: string) => `Nama: ${name}`,
    phone: (phone: string) => `Nomor Telepon: ${phone}`,
    note: (note: string) => `Catatan: ${note}`,
  },
};

export type { CheckoutLang };
export default lang;
