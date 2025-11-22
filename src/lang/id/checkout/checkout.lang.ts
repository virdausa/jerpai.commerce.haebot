interface CheckoutLang {
  // Page titles
  checkoutTitle: string;
  orderDetailsTitle: string;
  paymentActionsTitle: string;
  failedToLoadOrder: string;
  // Order details
  orderNumber: string;
  createdAt: string;
  itemDetails: string;
  orderDetails: string;
  emptyCart: string;
  total: string;
  continueToWhatsapp: string;
  unknownItem: string;
  notAvailable: string;
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
  customerDetailsTitle: string;
  contactInformationTitle: string;
  customerNameLabel: string;
  customerEmailLabel: string;
  customerPhoneLabel: string;
  customerNoteLabel: string;
  shippingTitle: string;
  shippingAddressLabel: string;
  preferredDeliveryLabel: string;
  paymentTitle: string;
  paymentMethodLabel: string;
  transactionStatusLabel: string;
  actionsTitle: string;
  printInvoice: string;
  cancelOrder: string;
  trackShipment: string;
  markAsReceived: string;
  statusTimelineTitle: string;
  estimatedNext: (statusLabel: string) => string;
  statusLabels: Record<string, string>;
  statusUnknown: string;
  statusBadgeAria: (statusLabel: string) => string;
  statusCompactLabels: {
    processing: string;
    sent: string;
    received: string;
    completed: string;
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
  createdAt: "Waktu Dibuat",
  itemDetails: "Rincian Item",
  orderDetails: "Rincian Pesanan",
  emptyCart: "Keranjang kosong",
  total: "Total",
  continueToWhatsapp: "Lanjutkan ke Whatsapp",
  unknownItem: "Item tidak diketahui",
  notAvailable: "Tidak tersedia",
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
  customerDetailsTitle: "Detail Pelanggan",
  contactInformationTitle: "Informasi Kontak",
  customerNameLabel: "Nama",
  customerEmailLabel: "Email",
  customerPhoneLabel: "Nomor Telepon",
  customerNoteLabel: "Catatan",
  shippingTitle: "Pengiriman",
  shippingAddressLabel: "Alamat Pengiriman",
  preferredDeliveryLabel: "Waktu Pengantaran",
  paymentTitle: "Pembayaran",
  paymentMethodLabel: "Metode Pembayaran",
  transactionStatusLabel: "Status Transaksi",
  actionsTitle: "Aksi Pesanan",
  printInvoice: "Cetak Invoice",
  cancelOrder: "Batalkan Pesanan",
  trackShipment: "Lacak Pengiriman",
  markAsReceived: "Tandai Diterima",
  statusTimelineTitle: "Riwayat Status",
  estimatedNext: (statusLabel: string) => `Perkiraan menuju: ${statusLabel}`,
  statusLabels: {
    TX_DRAFT: "DRAFT",
    TX_READY: "PERLU DIKIRIM",
    TX_SENT: "DIKIRIM SELLER",
    TX_RECEIVED: "DITERIMA PENERIMA",
    TX_COMPLETED: "PESANAN SELESAI",
    TX_CANCELED: "BATAL",
    TX_RETURN: "RETURN",
    TX_CLOSED: "CLOSED",
  },
  statusUnknown: "Status tidak diketahui",
  statusBadgeAria: (statusLabel: string) => `Status: ${statusLabel}`,
  statusCompactLabels: {
    processing: "Diproses",
    sent: "Dikirim",
    received: "Diterima",
    completed: "Selesai",
  },
};

export type { CheckoutLang };
export default lang;
