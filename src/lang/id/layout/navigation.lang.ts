interface NavigationLang {
  // Links
  linkProducts: string;
  linkPromotions: string;
  linkAbout: string;
  linkAccount: string;
  linkSettings: string;
  linkLogout: string;
  // Header
  searchLabel: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  cartAriaLabel: string;
  profileAriaLabel: string;
  wishlistAriaLabel: string;
  linkCartHistory: string;
  profileName: string;
  guestName: string;
  linkLogin: string;
  linkRegister: string;
  // Sidebar
  navigationLabel: string;
}

const lang: NavigationLang = {
  // Links
  linkProducts: "Produk",
  linkPromotions: "Promo",
  linkAbout: "Tentang",
  linkAccount: "Profil",
  linkSettings: "Pengaturan",
  linkLogout: "Keluar",
  // Header
  searchLabel: "Cari Produk",
  searchPlaceholder: "Cari produk...",
  searchButtonLabel: "Cari",
  cartAriaLabel: "Keranjang",
  profileAriaLabel: "Profil",
  wishlistAriaLabel: "Daftar Keinginan",
  linkCartHistory: "Riwayat Belanja",
  profileName: "Nama Pengguna",
  guestName: "Tamu",
  linkLogin: "Masuk",
  linkRegister: "Daftar",
  // Sidebar
  navigationLabel: "Navigasi",
};

export type { NavigationLang };
export default lang;
