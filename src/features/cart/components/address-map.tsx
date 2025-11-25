"use client";

import * as React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import type { LatLng, MapComponentProps } from "./address-input";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

/**
 * Fix for default marker icons in React-Leaflet
 * Leaflet's default icon paths don't work with webpack
 */
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = icon;

/**
 * Simple reverse geocoding using Nominatim API (OpenStreetMap)
 */
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "id",
        },
      }
    );
    const data = await response.json();
    return data.display_name || `${lat}, ${lng}`;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return `${lat}, ${lng}`;
  }
}

/**
 * Component to handle map click events and reverse geocoding
 */
function MapEvents({
  onPositionChange,
}: {
  onPositionChange: (pos: LatLng, address: string) => void;
}) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const address = await reverseGeocode(lat, lng);
      onPositionChange({ lat, lng }, address);
    },
  });

  return null;
}

/**
 * Component to update map center when position changes externally
 */
function ChangeView({ center }: { center: LatLng }) {
  const map = useMap();

  React.useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom());
  }, [center, map]);

  return null;
}

/**
 * Draggable marker with reverse geocoding on drag end
 */
function DraggableMarker({
  position,
  onPositionChange,
}: {
  position: LatLng;
  onPositionChange: (pos: LatLng, address: string) => void;
}) {
  const markerRef = React.useRef<L.Marker>(null);

  const eventHandlers = React.useMemo(
    () => ({
      dragend: async () => {
        const marker = markerRef.current;
        if (marker) {
          const latLng = marker.getLatLng();
          const newPos = { lat: latLng.lat, lng: latLng.lng };
          const address = await reverseGeocode(newPos.lat, newPos.lng);
          onPositionChange(newPos, address);
        }
      },
    }),
    [onPositionChange]
  );

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={[position.lat, position.lng]}
      ref={markerRef}
    />
  );
}

/**
 * Map component with Leaflet integration
 * Provides interactive map with reverse geocoding (no external search libs needed)
 */
function AddressMap({ position, onPositionChange }: MapComponentProps) {
  return (
    <div className="border-border h-64 w-full overflow-hidden rounded-lg border md:h-80">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={position} />
        <MapEvents onPositionChange={onPositionChange} />
        <DraggableMarker
          position={position}
          onPositionChange={onPositionChange}
        />
      </MapContainer>
    </div>
  );
}

export default AddressMap;
