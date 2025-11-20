interface WishlistLang {
  title: string;
  titleCount: (count: number) => string;
  empty: string;
  browseProducts: string;
  sortLabel: string;
  dateDesc: string;
  dateAsc: string;
  priceDesc: string;
  priceAsc: string;
  clearAll: string;
  cleared: string;
  addAria: string;
  removeAria: string;
  limitReached: (max: number) => string;
  storageError: string;
  added: (name: string) => string;
  removed: (name: string) => string;
}

const lang: WishlistLang = {
  title: "Daftar Keinginan",
  titleCount: (count: number) => `Daftar Keinginan (${count})`,
  empty: "Daftar keinginan Anda kosong.",
  browseProducts: "Lihat produk",
  sortLabel: "Urutkan",
  dateDesc: "Tanggal ditambahkan (terbaru)",
  dateAsc: "Tanggal ditambahkan (terlama)",
  priceDesc: "Harga (tinggi → rendah)",
  priceAsc: "Harga (rendah → tinggi)",
  clearAll: "Hapus semua",
  cleared: "Daftar keinginan dibersihkan",
  addAria: "Tambahkan ke daftar keinginan",
  removeAria: "Hapus dari daftar keinginan",
  limitReached: (max: number) =>
    `Batas daftar keinginan tercapai (${max} item)`,
  storageError:
    "Tidak dapat memperbarui daftar keinginan. Penyimpanan diblokir atau penuh.",
  added: (name: string) => `Ditambahkan ke daftar keinginan: ${name}`,
  removed: (name: string) => `Dihapus dari daftar keinginan: ${name}`,
};

export type { WishlistLang };
export default lang;
