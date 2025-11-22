interface OrdersLang {
  title: string;
  empty: string;
  emptyDescription?: string;
  orderId: (id: number) => string;
  total: string;
  itemsCount: (count: number) => string;
  date: string;
  viewDetails: string;
  clearAll: string;
  cleared: string;
}

const lang: OrdersLang = {
  title: "Riwayat Belanja",
  empty: "Belum ada transaksi selesai.",
  emptyDescription: "Riwayat pembelian akan muncul setelah Anda bertransaksi",
  orderId: (id: number) => `Pesanan #${id}`,
  total: "Total",
  itemsCount: (count: number) => `${count} item`,
  date: "Tanggal",
  viewDetails: "Lihat Detail",
  clearAll: "Hapus Riwayat",
  cleared: "Riwayat belanja dibersihkan",
};

export type { OrdersLang };
export default lang;
