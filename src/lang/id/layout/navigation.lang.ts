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
  // Sidebar
  navigationLabel: "Navigasi",
};

export type { NavigationLang };
export default lang;
