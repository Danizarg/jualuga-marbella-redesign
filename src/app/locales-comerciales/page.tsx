import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { BusinessStrip } from "@/components/site/BusinessStrip";
import { SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { INSTALLED_BUSINESSES_NOTE } from "@/data/businesses";
import { propertiesByKind } from "@/data/properties";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Locales comerciales en alquiler en el Casco Antiguo de Marbella: Plaza de la Victoria y Calle Padre Francisco Echamendi, en obligado punto de paso.";

export const metadata: Metadata = pageMetadata({
  title: "Locales comerciales en el Casco Antiguo de Marbella",
  description: DESCRIPTION,
  path: "/locales-comerciales",
  image: "/img/locales-plaza-victoria/locales-comerciales-plaza-de-la-victoria.jpg",
});

export default function LocalesPage() {
  const locales = propertiesByKind("local-comercial");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Locales comerciales", path: "/locales-comerciales" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Locales comerciales"
        titleLines={["El mejor emplazamiento", "del Casco Antiguo"]}
        lede="Dos de los puntos de referencia comercial del centro histórico de Marbella, en obligado punto de paso de miles de personas diariamente."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Locales comerciales", path: "/locales-comerciales" },
        ]}
        image={{
          src: "/img/locales-plaza-victoria/locales-comerciales-plaza-de-la-victoria.jpg",
          alt: "Locales comerciales de JULUGA en la Plaza de la Victoria, Casco Antiguo de Marbella",
        }}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01">La oferta</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <h2 className="display-md">
              Ofrecemos el mejor emplazamiento para que su negocio sea punto de
              referencia en el tejido comercial de Marbella.
            </h2>
            <p className="prose-editorial mt-8 max-w-xl">
              Nuestros locales se encuentran en una zona comercial con el mejor
              potencial y una oferta comercial inigualable, dentro de un centro
              histórico que es a la vez referencia turística de la ciudad.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-28">
          <PropertyGrid properties={locales} columns={2} />
        </div>
      </section>

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionLabel index="02">Negocios instalados</SectionLabel>
            <h2 className="display-md mt-6">En buena compañía</h2>
            <p className="prose-editorial mt-6">{INSTALLED_BUSINESSES_NOTE}</p>
          </Reveal>
          <div className="mt-14">
            <BusinessStrip />
          </div>
        </div>
      </section>

      <ContactBand
        title="¿Busca local en el centro histórico?"
        body="Consúltenos la disponibilidad actual. Hablará directamente con la propiedad."
      />
    </>
  );
}
