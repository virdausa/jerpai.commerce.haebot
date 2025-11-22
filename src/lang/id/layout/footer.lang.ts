interface FooterLang {
  companyName: string;
  companyTagline: string;
  copyright: (year: number, company: string) => string;
  followUs: string;
  footerNavigationAriaLabel: string;
  socialFacebookAria: string;
  socialTwitterAria: string;
  socialInstagramAria: string;
  socialLinkedInAria: string;
  quickLinksTitle: string;
  linkHome: string;
  linkContact: string;
  contactTitle: string;
  contactEmailLabel: string;
  contactPhoneLabel: string;
  contactEmailValue: string;
  contactPhoneValue: string;
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
  socialFacebookAria: "Buka Facebook HaeBot",
  socialTwitterAria: "Buka Twitter HaeBot",
  socialInstagramAria: "Buka Instagram HaeBot",
  socialLinkedInAria: "Buka LinkedIn HaeBot",
  quickLinksTitle: "Tautan Cepat",
  linkHome: "Beranda",
  linkContact: "Kontak",
  contactTitle: "Kontak",
  contactEmailLabel: "Email",
  contactPhoneLabel: "Telepon",
  contactEmailValue: "info@haebot.com",
  contactPhoneValue: "+62 852 4642 8746",
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
