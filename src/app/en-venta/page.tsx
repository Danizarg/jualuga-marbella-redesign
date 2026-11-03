import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { ArrowLink, SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { EN_VENTA_DISTRIBUTION, propertiesByTenure } from "@/data/properties";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inmueble en venta en el Casco Antiguo de Marbella",
  description:
    "Inmueble en venta en el Casco Antiguo de Marbella: parcela de 80 m² para promoción de hasta 5 viviendas, a 100 m de la Plaza de los Naranjos. Orientación sur.",
  path: "/en-venta",
  image: "/img/en-venta/fachada-luz-manana-11-30am.jpg",
});

export default function EnVentaPage() {
  const forSale = propertiesByTenure("venta");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "En venta", path: "/en-venta" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="En venta"
        titleLines={["Una parcela con cinco", "viviendas por hacer"]}
        lede="Excelente inversión para la construcción y promoción de hasta cinco viviendas de diversa tipología, en pleno centro histórico."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "En venta", path: "/en-venta" },
        ]}
        image={{
          src: "/img/en-venta/fachada-luz-manana-11-30am.jpg",
          alt: "Fachada del inmueble en venta en el Casco Antiguo de Marbella con luz de mañana",
        }}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="01">La oportunidad</SectionLabel>
            <h2 className="display-md mt-6">80 m² de forma triangular</h2>
            <div className="prose-editorial mt-7">
              <p>
                Actualmente planta baja más una, con posibilidad de elevar
                segunda planta y ático retranqueado.
              </p>
              <p>
                Orientación sur, muy luminoso, a escasos 100 m de la Plaza de
                los Naranjos y en calle peatonal y muy tranquila.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <SectionLabel>Distribución propuesta</SectionLabel>
            <ul className="mt-7 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {EN_VENTA_DISTRIBUTION.map((row) => (
                <li key={row.floor} className="py-5">
                  <p className="display-sm">{row.floor}</p>
                  <p className="prose-editorial mt-2 text-[0.9375rem]">{row.use}</p>
                </li>
              ))}
            </ul>
            <p className="label mt-5 text-stone/70">
              Sujeto a licencia y normativa urbanística municipal
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionLabel index="02">La propiedad</SectionLabel>
            <h2 className="display-lg mt-6">Ver el detalle completo</h2>
          </Reveal>
          <div className="mt-14 max-w-md">
            <PropertyGrid properties={forSale} columns={2} />
          </div>
          <Reveal delay={0.15} className="mt-12">
            <ArrowLink href="/en-alquiler">Ver también lo disponible en alquiler</ArrowLink>
          </Reveal>
        </div>
      </section>

      <ContactBand
        title="¿Le interesa la inversión?"
        body="Podemos facilitarle el detalle urbanístico y concertar una visita al inmueble."
      />
    </>
  );
}
