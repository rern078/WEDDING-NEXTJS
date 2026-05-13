"use client";

import { useMemo } from "react";

import { DEFAULT_MAP_LAT_LNG, DEFAULT_MAP_LAT_LNG_HINT, normalizeMapSearchQuery } from "@/lib/map-defaults";

type Props = {
  venue: string;
  /** Override search text for Google Maps; empty falls back to venue. */
  mapQuery: string;
  /** When false, guests do not see the map on the invite (preview shows a notice). */
  mapEnabled: boolean;
};

/**
 * Google Maps embed preview for the dashboard (no API key).
 * Uses `mapQuery` when set, otherwise `venue`, otherwise default coordinates (Phnom Penh area).
 */
export function AdminGoogleMapPreview({ venue, mapQuery, mapEnabled }: Props) {
  const { src, openHref } = useMemo(() => {
    const fromFields = normalizeMapSearchQuery(mapQuery) || normalizeMapSearchQuery(venue);
    const q = fromFields || DEFAULT_MAP_LAT_LNG;
    const z = 15;
    return {
      src: `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${z}&output=embed&hl=en`,
      openHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
    };
  }, [mapQuery, venue]);

  if (!mapEnabled) {
    return (
      <div className="mt-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center text-sm text-stone-600">
        <p className="font-medium text-stone-800">Map is off for guests</p>
        <p className="mt-1 text-xs text-stone-500">
          Turn <strong>Show map on invite</strong> on to display the map on the public invitation. You can still edit the
          map search text below.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs text-stone-500">
        Uses map search if set, otherwise venue (preview defaults to {DEFAULT_MAP_LAT_LNG_HINT} when both are empty).
      </p>
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-inner">
        <iframe
          title="Venue map preview"
          src={src}
          className="h-56 w-full border-0 sm:h-64"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs font-medium text-rose-900 underline hover:text-rose-950"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
