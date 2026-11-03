import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { LocationsSection } from "@/components/map/LocationsSection";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { SectionLabel } from "@/components/ui/Bits";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { LOCATIONS } from "@/data/locations";
import { propertiesByLocation } from "@/data/properties";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ubicaciones en el Casco Antiguo de Marbella",
  description:
    "Las tres ubicaciones de JULUGA en el Casco Antiguo de Marbella: Plaza de la Victoria, Calle Padre Francisco Echamendi y el entorno de la Plaza de los Naranjos.",
  path: "/ubicaciones",
  image: "/img/marbella/plaza-victoria-3.jpg",
});

export default function UbicacionesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Ubicaciones", path: "/ubicaciones" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Ubicaciones"
        titleLines={["Todo dentro del", "centro histórico"]}
        lede="Tres emplazamientos a pocos minutos a pie entre sí, dentro del Casco Antiguo de Marbella."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Ubicaciones", path: "/ubicaciones" },
        ]}
      />

      <section className="shell pb-20 md:pb-28">
        {/* Keeps the heading order h1 → h2 → h3 (the location names). */}
        <h2 className="sr-only">Nuestras ubicaciones</h2>
        <LocationsSection />
      </section>

      {/* ───────────────────────────────────────── the old town, in context ── */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionLabel index="01">El entorno</SectionLabel>
            <h2 className="display-lg mt-6">El Casco Antiguo de Marbella</h2>
            <p className="prose-editorial mt-6">
              Punto de referencia comercial y turístico dentro de una ciudad
              conocida mundialmente. Zona peatonal, con la Plaza de los Naranjos
              a pocos metros y un tejido comercial consolidado.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-14">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  src: "/img/marbella/plaza-victoria-3.jpg",
                  alt: "La Plaza de la Victoria en el Casco Antiguo de Marbella",
                },
                {
                  src: "/img/marbella/img-7071.jpg",
                  alt: "Calle del Casco Antiguo de Marbella",
                },
                {
                  src: "/img/marbella/casco-antiguo-cartel-2.jpg",
                  alt: "Cartel del Casco Antiguo de Marbella",
                },
                {
                  src: "/img/marbella/marbella-desde-mar-playa-pto-banus.jpg",
                  alt: "Marbella vista desde el mar",
                },
              ].map((img) => (
                <li key={img.src}>
                  <Photo
                    image={img}
                    ratio="4 / 5"
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────── properties, grouped by place ── */}
      {LOCATIONS.map((location, i) => {
        const properties = propertiesByLocation(location.id);
        if (properties.length === 0) return null;
        return (
          <section key={location.id} className="shell py-20 md:py-24">
            <Reveal className="border-t border-[var(--line)] pt-12">
              <SectionLabel index={String(i + 2).padStart(2, "0")}>
                {location.shortName}
              </SectionLabel>
              <h2 className="display-md mt-6">{location.name}</h2>
              <p className="prose-editorial mt-5 max-w-xl">{location.note}</p>
            </Reveal>
            <div className="mt-14">
              <PropertyGrid properties={properties} />
            </div>
          </section>
        );
      })}

      <ContactBand
        title="¿Quiere verlo en persona?"
        body="Estamos en el Casco Antiguo. Concertamos la visita cuando le convenga."
      />
    </>
  );
}
