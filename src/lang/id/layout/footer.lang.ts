interface FooterLang {
  companyName: string;
  companyTagline: string;
  copyright: (year: number, company: string) => string;
  followUs: string;
  footerNavigationAriaLabel: string;
  socialAria: (name: string) => string;
  quickLinksTitle: string;
  linkHome: string;
  linkContact: string;
  contactTitle: string;
  contactEmailLabel: string;
  contactPhoneLabel: string;
  contactWhatsAppLabel: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterEmailPlaceholder: string;
  newsletterSubmitLabel: string;
  newsletterSuccess: string;
  newsletterError: string;
  newsletterInvalidEmail: string;
}

const lang: FooterLang = {
  companyName: "HaeBot",
  companyTagline: "Solusi industri dan suku cadang berkualitas.",
  copyright: (year: number, company: string) => `© ${year} ${company}`,
  followUs: "Ikuti kami",
  footerNavigationAriaLabel: "Navigasi footer",
  socialAria: (name: string) => `Buka ${name} HaeBot`,
  quickLinksTitle: "Tautan Cepat",
  linkHome: "Beranda",
  linkContact: "Kontak",
  contactTitle: "Kontak",
  contactEmailLabel: "Email",
  contactPhoneLabel: "Telepon",
  contactWhatsAppLabel: "WhatsApp",
  newsletterTitle: "Berlangganan Buletin",
  newsletterDescription:
    "Dapatkan update produk dan promo terbaru langsung ke email Anda.",
  newsletterEmailPlaceholder: "Masukkan email Anda",
  newsletterSubmitLabel: "Daftar",
  newsletterSuccess: "Terima kasih! Anda berhasil berlangganan.",
  newsletterError: "Maaf, terjadi kesalahan. Coba lagi nanti.",
  newsletterInvalidEmail: "Format email tidak valid",
};

export type { FooterLang };
export default lang;
