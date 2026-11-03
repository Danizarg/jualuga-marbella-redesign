import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PropertyExplorer } from "@/components/property/PropertyExplorer";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Propiedades en el Casco Antiguo de Marbella",
  description:
    "Toda la cartera de JULUGA en el Casco Antiguo de Marbella: locales comerciales y apartamentos en alquiler, e inmueble en venta. Filtre por tipo y operación.",
  path: "/propiedades",
});

export default function PropiedadesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Propiedades", path: "/propiedades" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Cartera completa"
        titleLines={["Propiedades y", "detalles"]}
        lede="Locales comerciales y apartamentos en alquiler, e inmueble en venta. Todo dentro del Casco Antiguo de Marbella."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Propiedades", path: "/propiedades" },
        ]}
      />

      <section className="shell pb-24 md:pb-36">
        {/* Names the listing region for assistive tech and keeps the heading
            order h1 → h2 → h3 (the card titles). */}
        <h2 className="sr-only">Listado de propiedades</h2>
        <PropertyExplorer />
      </section>

      <ContactBand />
    </>
  );
}
