import Link from "next/link";

import {
  KIND_LABELS,
  TENURE_LABELS,
  type Property,
} from "@/data/properties";
import { getLocation } from "@/data/locations";
import { Photo } from "@/components/ui/Photo";
import { ConceptFlag } from "@/components/ui/Bits";

interface PropertyCardProps {
  property: Property;
  /** Cards in the first row of a grid get eager loading. */
  priority?: boolean;
  sizes?: string;
  /** "tall" for portfolio grids, "wide" for feature rows. */
  shape?: "tall" | "wide";
}

/**
 * Portfolio card. The hover reveal is pure CSS — the cover image lifts on a
 * long ease while a second frame from the same gallery crossfades beneath it,
 * so the card shows two views of the property without any JavaScript.
 */
export function PropertyCard({
  property,
  priority = false,
  sizes = "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw",
  shape = "tall",
}: PropertyCardProps) {
  const location = getLocation(property.location);
  const second = property.gallery.find((g) => g.src !== property.cover.src);
  const ratio = shape === "tall" ? "4 / 5" : "16 / 11";

  return (
    <article className="group relative flex h-full flex-col">
      <Link
        href={`/propiedades/${property.slug}`}
        className="flex h-full flex-col focus-visible:outline-offset-8"
        aria-label={`${property.title} — ${property.kicker}`}
      >
        <div className="relative overflow-hidden">
          <Photo
            image={property.cover}
            ratio={ratio}
            sizes={sizes}
            priority={priority}
            hoverZoom
          />

          {second ? (
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 motion-reduce:hidden"
            >
              <Photo
                image={second}
                ratio={ratio}
                sizes={sizes}
                className="h-full w-full"
                hoverZoom
              />
            </span>
          ) : null}

          {/* Chrome sits above both frames */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/35 via-transparent to-transparent"
          />
          <span className="label pointer-events-none absolute top-4 left-4 z-10 text-paper/85">
            {property.index}
          </span>
          <span className="pointer-events-none absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
            {property.tenure.map((t) => (
              <span
                key={t}
                className="label border border-paper/35 bg-charcoal/35 px-2.5 py-1.5 text-paper backdrop-blur-sm"
              >
                {TENURE_LABELS[t]}
              </span>
            ))}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-6">
          <p className="label text-stone">
            {KIND_LABELS[property.kind]} · {location.shortName}
          </p>

          <h3 className="display-sm mt-3 inline-block">
            <span className="relative">
              {property.title}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </span>
          </h3>
          <p className="mt-1.5 text-[0.9375rem] font-light text-stone">
            {property.kicker}
          </p>

          <p className="prose-editorial mt-4 flex-1 text-[0.9375rem]">
            {property.summary}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
            <span className="label text-stone">{property.priceNote}</span>
            <span className="label flex items-center gap-2.5 text-charcoal">
              Ver
              <svg
                aria-hidden
                viewBox="0 0 24 10"
                className="h-2 w-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 motion-reduce:transition-none"
                fill="none"
              >
                <path
                  d="M0 5h22M17.5 0.5 22 5l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>

      {!property.verified ? (
        <ConceptFlag className="absolute bottom-[calc(100%-1rem)] left-4 z-20" />
      ) : null}
    </article>
  );
}
