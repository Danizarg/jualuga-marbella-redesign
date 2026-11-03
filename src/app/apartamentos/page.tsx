import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { propertiesByKind } from "@/data/properties";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Apartamentos en alquiler en el Casco Antiguo de Marbella: uno y dos dormitorios y un ático con terraza, con vistas a la Plaza de la Victoria. Amueblados y equipados.";

export const metadata: Metadata = pageMetadata({
  title: "Apartamentos en alquiler en el Casco Antiguo de Marbella",
  description: DESCRIPTION,
  path: "/apartamentos",
  image: "/img/atico/terraza-foto-1.jpg",
});

export default function ApartamentosPage() {
  const apartamentos = propertiesByKind("apartamento");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Apartamentos", path: "/apartamentos" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Apartamentos en alquiler"
        titleLines={["Con vistas a la", "Plaza de la Victoria"]}
        lede="Apartamentos de uno y dos dormitorios, más un ático, en pleno Casco Antiguo. Un tranquilo edificio familiar con sólo cinco viviendas."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Apartamentos", path: "/apartamentos" },
        ]}
        image={{
          src: "/img/atico/terraza-foto-1.jpg",
          alt: "Terraza del ático de JULUGA con vistas al Casco Antiguo de Marbella",
        }}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="01">El edificio</SectionLabel>
            <h2 className="display-md mt-6">Sólo cinco viviendas</h2>
            <div className="prose-editorial mt-7">
              <p>
                Todos los apartamentos se encuentran en el mismo edificio, sobre
                la Plaza de la Victoria: una plaza peatonal que es a la vez
                centro neurálgico de la ciudad.
              </p>
              <p>
                Se ofrecen totalmente amueblados y equipados para entrar a
                residir desde el primer momento. Zona peatonal y muy tranquila,
                en la mejor ubicación del Casco Antiguo.
              </p>
            </div>

            <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {[
                ["Tipologías", "1 y 2 dormitorios, ático"],
                ["Estado", "Amueblados y equipados"],
                ["Entorno", "Plaza peatonal"],
                ["Edificio", "5 viviendas"],
              ].map(([k, v]) => (
                <li
                  key={k}
                  className="flex items-baseline justify-between gap-5 py-4"
                >
                  <span className="label text-stone">{k}</span>
                  <span className="text-right text-[0.9375rem] font-light">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal slow delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <Photo
              image={{
                src: "/img/locales-plaza-victoria/plaza-victoria-junio-2020-2.jpg",
                alt: "La Plaza de la Victoria, plaza peatonal del Casco Antiguo de Marbella",
              }}
              ratio="4 / 5"
              sizes="(min-width: 1024px) 48vw, 92vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionLabel index="02">Disponibles</SectionLabel>
            <h2 className="display-lg mt-6">Los apartamentos</h2>
          </Reveal>
          <div className="mt-16">
            <PropertyGrid properties={apartamentos} />
          </div>
        </div>
      </section>

      <ContactBand
        title="¿Le interesa alguno?"
        body="Consúltenos la disponibilidad y las condiciones. Le atenderemos directamente."
      />
    </>
  );
}
