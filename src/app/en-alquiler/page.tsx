import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PropertyExplorer } from "@/components/property/PropertyExplorer";
import { ArrowLink } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { propertiesByTenure } from "@/data/properties";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "En alquiler en el Casco Antiguo de Marbella",
  description:
    "Locales comerciales y apartamentos en alquiler en el Casco Antiguo de Marbella. Plaza de la Victoria y Calle Padre Francisco Echamendi.",
  path: "/en-alquiler",
  image: "/img/locales-plaza-victoria/plaza-victoria-junio-2020-2.jpg",
});

export default function EnAlquilerPage() {
  const rentals = propertiesByTenure("alquiler");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "En alquiler", path: "/en-alquiler" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="En alquiler"
        titleLines={["Locales y apartamentos", "en el centro histórico"]}
        lede="Toda la cartera disponible en alquiler: locales en obligado punto de paso y apartamentos amueblados en zona peatonal."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "En alquiler", path: "/en-alquiler" },
        ]}
      />

      <section className="shell pb-20 md:pb-28">
        {/* Keeps the heading order h1 → h2 → h3 (the card titles). */}
        <h2 className="sr-only">Propiedades en alquiler</h2>
        <PropertyExplorer properties={rentals} />
        <Reveal delay={0.15} className="mt-16 border-t border-[var(--line)] pt-10">
          <ArrowLink href="/en-venta">Ver el inmueble en venta</ArrowLink>
        </Reveal>
      </section>

      <ContactBand />
    </>
  );
}
