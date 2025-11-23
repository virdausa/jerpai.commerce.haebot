interface HeroCarouselLang {
  // Navigation
  previousSlide: string;
  nextSlide: string;
  previousSlideAriaLabel: string;
  nextSlideAriaLabel: string;

  // Dot Navigation
  goToSlide: (slideNumber: number) => string;

  // Autoplay Controls
  pauseAutoplay: string;
  playAutoplay: string;

  // Screen Reader Announcements
  carouselLabel: string;
  slideAnnouncement: (current: number, total: number) => string;

  // Slide Content
  slides: {
    slide1: {
      heading: string;
      description: string;
      ctaText: string;
    };
    slide2: {
      heading: string;
      description: string;
      ctaText: string;
    };
    slide3: {
      heading: string;
      description: string;
      ctaText: string;
    };
    slide4: {
      heading: string;
      description: string;
      ctaText: string;
    };
    slide5: {
      heading: string;
      description: string;
      ctaText: string;
    };
  };
}

const lang: HeroCarouselLang = {
  // Navigation
  previousSlide: "Sebelumnya",
  nextSlide: "Berikutnya",
  previousSlideAriaLabel: "Ke slide sebelumnya",
  nextSlideAriaLabel: "Ke slide berikutnya",

  // Dot Navigation
  goToSlide: (slideNumber: number) => `Ke slide ${slideNumber}`,

  // Autoplay Controls
  pauseAutoplay: "Jeda Otomatis",
  playAutoplay: "Putar Otomatis",

  // Screen Reader Announcements
  carouselLabel: "Korsel Hero Utama",
  slideAnnouncement: (current: number, total: number) =>
    `Slide ${current} dari ${total}`,

  // Slide Content
  slides: {
    slide1: {
      heading: "Koleksi Premium Terbaru",
      description: "Temukan produk terbaik dengan kualitas unggulan",
      ctaText: "Jelajahi Sekarang",
    },
    slide2: {
      heading: "Diskon Spesial Hari Ini",
      description: "Hemat hingga 50% untuk produk pilihan",
      ctaText: "Belanja Sekarang",
    },
    slide3: {
      heading: "Harga Terjangkau",
      description: "Harga terjangkau untuk produk pilihan",
      ctaText: "Lihat Koleksi",
    },
    slide4: {
      heading: "Kualitas Terjamin",
      description: "Produk berkualitas tinggi dengan harga terbaik",
      ctaText: "Mulai Belanja",
    },
    slide5: {
      heading: "Pengiriman Gratis",
      description: "Gratis ongkir untuk pembelian minimal tertentu",
      ctaText: "Info Selengkapnya",
    },
  },
};

export type { HeroCarouselLang };
export default lang;
