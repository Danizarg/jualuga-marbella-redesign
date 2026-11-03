"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { PROPERTIES, type Property } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";

type FilterKey =
  | "todas"
  | "local-comercial"
  | "apartamento"
  | "alquiler"
  | "venta";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "local-comercial", label: "Locales comerciales" },
  { key: "apartamento", label: "Apartamentos" },
  { key: "alquiler", label: "En alquiler" },
  { key: "venta", label: "En venta" },
];

function matches(property: Property, filter: FilterKey): boolean {
  switch (filter) {
    case "todas":
      return true;
    case "local-comercial":
    case "apartamento":
      return property.kind === filter;
    case "alquiler":
    case "venta":
      return property.tenure.includes(filter);
  }
}

const EASE = [0.16, 1, 0.3, 1] as const;

interface PropertyExplorerProps {
  /** Which chip is active on first paint. */
  initialFilter?: FilterKey;
  properties?: Property[];
}

/**
 * The portfolio grid with its filter rail.
 *
 * Filtering animates with Motion's layout engine: cards that stay in the
 * result set slide to their new position rather than snapping, and the ones
 * leaving fade out of the flow. Under reduced motion the same code path
 * renders a plain list swap.
 */
export function PropertyExplorer({
  initialFilter = "todas",
  properties = PROPERTIES,
}: PropertyExplorerProps) {
  const [filter, setFilter] = useState<FilterKey>(initialFilter);
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => properties.filter((p) => matches(p, filter)),
    [filter, properties],
  );

  // Only offer a filter that would actually return something.
  const available = useMemo(
    () => FILTERS.filter((f) => properties.some((p) => matches(p, f.key))),
    [properties],
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-[var(--line)] py-5 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filtrar propiedades"
          className="-mx-1 flex flex-wrap items-center gap-x-1 gap-y-2"
        >
          {available.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={[
                  "label relative px-3 py-2.5 transition-colors duration-500",
                  active ? "text-charcoal" : "text-stone hover:text-charcoal",
                ].join(" ")}
              >
                {active ? (
                  <motion.span
                    layoutId="filtro-activo"
                    className="absolute inset-0 border border-charcoal/18 bg-paper-warm"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 0.6, ease: EASE }
                    }
                  />
                ) : null}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="label text-stone">
          {visible.length === 1
            ? "1 propiedad"
            : `${String(visible.length).padStart(2, "0")} propiedades`}
        </p>
      </div>

      <motion.ul
        layout={!reduced}
        className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((property, i) => (
            <motion.li
              key={property.slug}
              layout={!reduced}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{
                duration: reduced ? 0.2 : 0.8,
                delay: reduced ? 0 : Math.min(i, 5) * 0.05,
                ease: EASE,
              }}
            >
              <PropertyCard property={property} priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 ? (
        <p className="prose-editorial mt-16 text-center">
          No hay propiedades en esta categoría en este momento.
        </p>
      ) : null}
    </div>
  );
}
