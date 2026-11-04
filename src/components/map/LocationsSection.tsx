"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { LOCATIONS, type LocationId } from "@/data/locations";
import { PROPERTIES } from "@/data/properties";
import { Photo } from "@/components/ui/Photo";

/**
 * Leaflet touches `window` at import time, so the map is loaded only in the
 * browser. The placeholder keeps the same height to avoid a layout shift.
 */
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-sand">
      <span className="label text-stone">Cargando plano…</span>
    </div>
  ),
});

export function LocationsSection() {
  const [selected, setSelected] = useState<LocationId | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start lg:gap-14">
      <div>
        <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {LOCATIONS.map((location) => {
            const count = PROPERTIES.filter((p) => p.location === location.id).length;
            const active = selected === location.id;
            return (
              <li key={location.id}>
                <button
                  type="button"
                  onClick={() => setSelected(active ? null : location.id)}
                  aria-pressed={active}
                  className="group w-full py-6 text-left"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <h3
                        className={`display-sm transition-colors duration-500 ${
                          active ? "text-terracotta" : "text-charcoal"
                        }`}
                      >
                        {location.name}
                      </h3>
                      <p className="label mt-2.5 text-stone">
                        {count === 1 ? "1 propiedad" : `${count} propiedades`}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className={`mt-2 block size-2.5 shrink-0 rounded-full transition-all duration-500 ${
                        active
                          ? "bg-terracotta ring-4 ring-terracotta/20"
                          : "bg-sand-deep group-hover:bg-stone"
                      }`}
                    />
                  </div>

                  <div
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      active
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <span className="block w-full shrink-0 sm:w-40">
                          <Photo
                            image={{ src: location.image, alt: location.name }}
                            ratio="4 / 3"
                            sizes="(min-width: 640px) 10rem, 92vw"
                          />
                        </span>
                        <p className="prose-editorial text-[0.9375rem]">
                          {location.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/propiedades"
            className="label group/l inline-flex items-center gap-3"
          >
            <span className="relative">
              Ver toda la cartera
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-700 group-hover/l:scale-x-100 motion-reduce:transition-none"
              />
            </span>
            <span aria-hidden>→</span>
          </Link>
          <p className="label text-stone/70">Ubicaciones aproximadas</p>
        </div>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-sand-deep/50 lg:aspect-[5/4]">
          <LocationMap selected={selected} onSelect={setSelected} />
        </div>
        {/* Width-capped so it never runs under the floating enquiry button */}
        <p className="label mt-4 max-w-sm text-stone/70">
          Casco Antiguo de Marbella · pulse un punto
        </p>
      </div>
    </div>
  );
}
