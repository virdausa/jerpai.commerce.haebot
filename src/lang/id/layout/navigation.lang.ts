interface NavigationLang {
  // Links
  linkProducts: string;
  linkPromotions: string;
  linkAbout: string;
  linkAccount: string;
  linkSettings: string;
  linkLogout: string;
  // Header
  searchPlaceholder: string;
  cartAriaLabel: string;
  profileAriaLabel: string;
  wishlistAriaLabel: string;
  linkCartHistory: string;
  profileName: string;
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
  searchPlaceholder: "Cari produk...",
  cartAriaLabel: "Keranjang",
  profileAriaLabel: "Profil",
  wishlistAriaLabel: "Daftar Keinginan",
  linkCartHistory: "Riwayat Belanja",
  profileName: "Nama Pengguna",
  // Sidebar
  navigationLabel: "Navigasi",
};

export type { NavigationLang };
export default lang;
