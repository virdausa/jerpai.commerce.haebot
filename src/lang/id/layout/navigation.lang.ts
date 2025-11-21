interface NavigationLang {
  // Links
  linkProducts: string;
  linkPromotions: string;
  linkAbout: string;
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
