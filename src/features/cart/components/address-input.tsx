"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { Control } from "react-hook-form";
import { MapPinIcon, Loader2Icon } from "lucide-react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { lang as cartLang } from "@/lang/id/cart/cart.lang";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

/**
 * Coordinates type for latitude and longitude
 */
type LatLng = {
  lat: number;
  lng: number;
};

/**
 * Props for the AddressInput component
 */
type AddressInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  className?: string;
};

/**
 * Props for the Map component (dynamically imported)
 */
type MapComponentProps = {
  position: LatLng;
  onPositionChange: (pos: LatLng, address: string) => void;
};

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./address-map"), {
  ssr: false,
  loading: () => (
    <div className="border-border bg-muted flex h-64 w-full items-center justify-center rounded-lg border">
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon className="text-muted-foreground h-8 w-8 animate-spin" />
        <p className="text-muted-foreground text-sm">{cartLang.loadingMap}</p>
      </div>
    </div>
  ),
});

/**
 * AddressInput component with map-based location picker
 * Integrates with react-hook-form and provides geocoding/reverse geocoding
 */
function AddressInput({ control, name, className }: AddressInputProps) {
  const [showMap, setShowMap] = React.useState(false);
  const [position, setPosition] = React.useState<LatLng>({
    lat: -8.0952, // Blitar, Indonesia
    lng: 112.1609,
  });
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<
    Array<{ lat: number; lng: number; label: string }>
  >([]);

  // Debounced search function
  const searchAddress = React.useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
        {
          headers: {
            "Accept-Language": "id",
          },
        }
      );
      const data = await response.json();
      const results = data.map(
        (item: { lat: string; lon: string; display_name: string }) => ({
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          label: item.display_name,
        })
      );
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce timer
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const textarea = document.querySelector(
        `textarea[name="${name}"]`
      ) as HTMLTextAreaElement;
      if (textarea?.value) {
        searchAddress(textarea.value);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name, searchAddress]);

  const handlePositionChange = (
    newPos: LatLng,
    address: string,
    onChange: (value: string) => void
  ) => {
    setPosition(newPos);
    if (address) {
      onChange(address);
      setSearchResults([]); // Clear search results when position is set from map
    }
  };

  const handleSearchResultClick = (
    result: { lat: number; lng: number; label: string },
    onChange: (value: string) => void
  ) => {
    setPosition({ lat: result.lat, lng: result.lng });
    onChange(result.label);
    setSearchResults([]);
    setShowMap(true);
  };

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(newPos);
          // Trigger reverse geocoding in the map component
          setShowMap(true);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4" />
            {cartLang.addressLabel} *
          </FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Textarea
                    {...field}
                    required
                    aria-required="true"
                    placeholder={cartLang.addressPlaceholder}
                    className="flex-1"
                    onChange={(e) => {
                      field.onChange(e);
                      searchAddress(e.target.value);
                    }}
                    onFocus={() => {
                      if (field.value) {
                        searchAddress(field.value);
                      }
                    }}
                    rows={3}
                  />
                  {isSearching && (
                    <div className="absolute top-3 right-3">
                      <Loader2Icon className="text-muted-foreground h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="bg-popover text-popover-foreground animate-in fade-in-50 slide-in-from-top-2 absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-md">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          type="button"
                          className="hover:bg-accent hover:text-accent-foreground w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors"
                          onClick={() =>
                            handleSearchResultClick(result, field.onChange)
                          }
                        >
                          {result.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowMap(!showMap)}
                      className="flex-1"
                    >
                      <MapPinIcon className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {showMap ? "Tutup Peta" : cartLang.selectLocationOnMap}
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleGetCurrentLocation()}
                      className="w-full sm:w-auto"
                      title={cartLang.currentLocation}
                    >
                      <MapPinIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {showMap && (
                <div className="animate-in fade-in-50 slide-in-from-top-2 duration-200">
                  <MapComponent
                    position={position}
                    onPositionChange={(newPos: LatLng, address: string) =>
                      handlePositionChange(newPos, address, field.onChange)
                    }
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { AddressInput };
export type { AddressInputProps, MapComponentProps, LatLng };
