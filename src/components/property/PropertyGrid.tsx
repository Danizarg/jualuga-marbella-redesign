import type { Property } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";
import { Reveal } from "@/components/ui/Reveal";

/** Static portfolio grid, for the category pages that need no filter rail. */
export function PropertyGrid({
  properties,
  columns = 3,
}: {
  properties: Property[];
  columns?: 2 | 3;
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10";

  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-16 ${cols}`}>
      {properties.map((property, i) => (
        <Reveal as="li" key={property.slug} delay={Math.min(i, 4) * 0.08}>
          <PropertyCard
            property={property}
            priority={i < 2}
            sizes={
              columns === 2
                ? "(min-width: 640px) 46vw, 92vw"
                : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
            }
          />
        </Reveal>
      ))}
    </ul>
  );
}
