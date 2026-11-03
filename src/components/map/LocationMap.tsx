"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";

import { LOCATIONS, type LocationId } from "@/data/locations";
import { OLD_TOWN_CENTRE } from "@/data/site";

/**
 * Basemap tiles.
 *
 * Defaults to the OpenStreetMap standard layer, which needs no key and is fine
 * for a site at this traffic level. CARTO's free basemap, the usual choice for
 * a light palette, now returns "API KEY REQUIRED" watermarks.
 *
 * To move to a keyed provider (Stadia, MapTiler, Thunderforest) set
 * NEXT_PUBLIC_MAP_TILE_URL and NEXT_PUBLIC_MAP_TILE_ATTRIBUTION in the Vercel
 * project — no code change needed. The palette filter in globals.css is applied
 * to whatever layer is used.
 */
const TILE_URL =
  process.env.NEXT_PUBLIC_MAP_TILE_URL ??
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const TILE_ATTRIBUTION =
  process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ??
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

/**
 * Markers are built as divIcons rather than Leaflet's default pin, so they
 * take the site palette and need no image assets.
 */
function marker(active: boolean) {
  return L.divIcon({
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    html: `<span style="
      display:block; width:18px; height:18px; border-radius:9999px;
      background:${active ? "#a9573c" : "#1b1917"};
      box-shadow:0 0 0 4px ${active ? "rgba(169,87,60,0.22)" : "rgba(27,25,23,0.16)"},
                 0 2px 10px rgba(27,25,23,0.35);
      transition:background 400ms ease, box-shadow 400ms ease;
    "></span>`,
  });
}

/** Pans the map when the selected location changes. */
function Recentre({ selected }: { selected: LocationId | null }) {
  const map = useMap();
  useEffect(() => {
    const target = LOCATIONS.find((l) => l.id === selected);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (target) {
      map.flyTo([target.lat, target.lng], 17, {
        duration: reduced ? 0 : 1.4,
        animate: !reduced,
      });
    } else {
      map.flyTo([OLD_TOWN_CENTRE.lat, OLD_TOWN_CENTRE.lng], 16, {
        duration: reduced ? 0 : 1.2,
        animate: !reduced,
      });
    }
  }, [selected, map]);
  return null;
}

export default function LocationMap({
  selected,
  onSelect,
}: {
  selected: LocationId | null;
  onSelect: (id: LocationId) => void;
}) {
  return (
    <MapContainer
      center={[OLD_TOWN_CENTRE.lat, OLD_TOWN_CENTRE.lng]}
      zoom={16}
      // Wheel zoom off so the map never steals the page scroll; it turns on
      // once the visitor clicks into the map.
      scrollWheelZoom={false}
      className="h-full w-full bg-sand"
      attributionControl
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} maxZoom={19} />
      <Recentre selected={selected} />
      {LOCATIONS.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={marker(selected === location.id)}
          title={location.name}
          alt={location.name}
          eventHandlers={{ click: () => onSelect(location.id) }}
          keyboard
        >
          <Tooltip direction="top" offset={[0, -12]} opacity={1}>
            <span className="label">{location.name}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
