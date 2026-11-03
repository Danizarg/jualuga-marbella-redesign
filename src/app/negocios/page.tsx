import Image from "next/image";
import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowLink, SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { INSTALLED_BUSINESSES, INSTALLED_BUSINESSES_NOTE } from "@/data/businesses";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Negocios instalados",
  description:
    "Los negocios que operan hoy en los locales comerciales de JULUGA en el Casco Antiguo de Marbella: moda, comercio y servicios profesionales.",
  path: "/negocios",
  image: "/img/locales-plaza-victoria/sam-newman-foto-web-3.jpg",
});

export default function NegociosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Negocios instalados", path: "/negocios" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Negocios instalados"
        titleLines={["Quienes ya trabajan", "en nuestros locales"]}
        lede={INSTALLED_BUSINESSES_NOTE}
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Negocios instalados", path: "/negocios" },
        ]}
      />

      <section className="shell pb-20 md:pb-28">
        <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {INSTALLED_BUSINESSES.map((business, i) => (
            <Reveal
              as="li"
              key={business.name}
              delay={i * 0.06}
              className="grid items-center gap-6 py-10 md:grid-cols-12 md:gap-10"
            >
              <span className="label text-terracotta md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="md:col-span-4">
                <h2 className="display-sm">{business.name}</h2>
                <p className="label mt-3 text-stone">{business.trade}</p>
                {business.street ? (
                  <p className="label mt-2 text-stone/70">{business.street}</p>
                ) : null}
              </div>

              <div className="md:col-span-5 md:col-start-8">
                <div className="flex h-20 items-center md:justify-end">
                  <Image
                    src={business.logo}
                    alt={business.logoAlt}
                    width={260}
                    height={130}
                    sizes="(min-width: 768px) 20vw, 50vw"
                    className="max-h-full w-auto mix-blend-multiply"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-16">
          <SectionLabel index="01">Su negocio aquí</SectionLabel>
          <p className="display-md mt-6 max-w-2xl">
            Ofrecemos el mejor emplazamiento para que su negocio sea punto de
            referencia en Marbella.
          </p>
          <ArrowLink href="/locales-comerciales" className="mt-9">
            Ver locales disponibles
          </ArrowLink>
        </Reveal>
      </section>

      <ContactBand
        title="¿Quiere ser el siguiente?"
        body="Consúltenos qué locales hay disponibles y en qué condiciones."
      />
    </>
  );
}
