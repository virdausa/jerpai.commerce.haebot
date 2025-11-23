"use client";

import { useState, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import lang from "@/lang/id/home/hero-carousel.lang";

import banner1 from "@/assets/images/banner-1.jpg";
import banner2 from "@/assets/images/banner-2.jpg";
import banner3 from "@/assets/images/banner-3.jpg";
import banner4 from "@/assets/images/banner-4.jpg";
import banner5 from "@/assets/images/banner-5.jpg";

// Hero slide data structure
interface HeroSlide {
  id: number;
  image: StaticImageData;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

// Static hero slides data
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: banner1,
    heading: lang.slides.slide1.heading,
    description: lang.slides.slide1.description,
    ctaText: lang.slides.slide1.ctaText,
    ctaLink: "/products",
  },
  {
    id: 2,
    image: banner2,
    heading: lang.slides.slide2.heading,
    description: lang.slides.slide2.description,
    ctaText: lang.slides.slide2.ctaText,
    ctaLink: "/products",
  },
  {
    id: 3,
    image: banner3,
    heading: lang.slides.slide3.heading,
    description: lang.slides.slide3.description,
    ctaText: lang.slides.slide3.ctaText,
    ctaLink: "/products",
  },
  {
    id: 4,
    image: banner4,
    heading: lang.slides.slide4.heading,
    description: lang.slides.slide4.description,
    ctaText: lang.slides.slide4.ctaText,
    ctaLink: "/products",
  },
  {
    id: 5,
    image: banner5,
    heading: lang.slides.slide5.heading,
    description: lang.slides.slide5.description,
    ctaText: lang.slides.slide5.ctaText,
    ctaLink: "/products",
  },
];

/**
 * Hero Carousel Component
 *
 * A visually striking carousel for homepage hero section with:
 * - Autoplay functionality (5 seconds per slide)
 * - Navigation controls (arrows and dots)
 * - Touch/swipe support
 * - Accessibility features (ARIA labels, keyboard navigation)
 * - Responsive design (mobile-first)
 * - Performance optimizations (lazy loading)
 *
 * @returns {JSX.Element} Hero carousel component
 */
export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Update current slide and total count
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Navigate to specific slide (for dot navigation)
  const scrollToSlide = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section
      className="relative w-full"
      aria-label={lang.carouselLabel}
      aria-roledescription="carousel"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[300px] w-full overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 sm:h-[400px] md:h-[500px] lg:h-[600px]">
                {/* Hero Image */}
                <Image
                  src={slide.image}
                  alt={slide.heading}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="max-w-xl space-y-3 md:space-y-4 lg:max-w-2xl">
                      {/* Heading */}
                      <h2 className="text-2xl leading-tight font-extrabold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                        {slide.heading}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-gray-100 sm:text-base md:text-lg lg:text-xl">
                        {slide.description}
                      </p>

                      {/* CTA Button */}
                      <div className="pt-2">
                        <Button
                          asChild
                          size="lg"
                          className="w-full bg-white text-gray-900 transition-all hover:bg-gray-100 sm:w-auto"
                        >
                          <a href={slide.ctaLink}>{slide.ctaText}</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screen Reader Announcement */}
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                  {lang.slideAnnouncement(current + 1, count)}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious
          className="left-2 hidden size-10 border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 sm:flex md:left-4 lg:size-12"
          aria-label={lang.previousSlideAriaLabel}
        />
        <CarouselNext
          className="right-2 hidden size-10 border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 sm:flex md:right-4 lg:size-12"
          aria-label={lang.nextSlideAriaLabel}
        />
      </Carousel>

      {/* Dot Navigation Indicators */}
      {count > 0 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={cn(
                "size-2 rounded-full transition-all duration-300 md:size-3",
                current === index
                  ? "w-6 bg-white md:w-8"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={lang.goToSlide(index + 1)}
              aria-current={current === index ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
