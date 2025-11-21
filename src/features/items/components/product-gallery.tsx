"use client";

import { useState, useEffect } from "react";
import { cn, getFullImageUrl } from "@/lib/utils";
import Image from "next/image";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProductGalleryProps {
  images?: {
    name: string;
    path: string;
    size: number;
  }[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-muted flex aspect-square w-full items-center justify-center rounded-lg">
        <span className="text-muted-foreground">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full overflow-hidden rounded-lg border bg-white">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full">
                  <ImageZoom>
                    <Image
                      src={getFullImageUrl(image.path)}
                      alt={`${productName} - Image ${index + 1}`}
                      className="aspect-square h-full w-full object-cover"
                      height={600}
                      width={600}
                      priority={index === 0}
                    />
                  </ImageZoom>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>
      </div>

      {images.length > 1 && (
        <div className="scrollbar-hide flex w-full gap-2 overflow-x-scroll p-1">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-white transition-all",
                current === index
                  ? "ring-primary ring-2"
                  : "hover:ring-primary/50 hover:ring-2"
              )}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={getFullImageUrl(image.path)}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                height={100}
                width={100}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
