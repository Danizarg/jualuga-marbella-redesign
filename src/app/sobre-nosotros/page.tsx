import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowLink, SectionLabel } from "@/components/ui/Bits";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { COMMITMENT, HISTORIAN_QUOTE, MILESTONES } from "@/data/history";
import {
  BRAND_NAME,
  FOUNDED_YEAR,
  LEGAL_NAME,
  TAX_ID,
} from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sobre nosotros",
  description:
    "JULUGA (JUALUGA, SL) es una empresa familiar creada en el año 2000 que arrienda sus propios locales comerciales y apartamentos en el Casco Antiguo de Marbella. Más de un siglo de historia hotelera y comercial en la ciudad.",
  path: "/sobre-nosotros",
  image: "/img/historia/hotel-salduba-1.jpg",
});

export default function SobreNosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Sobre nosotros", path: "/sobre-nosotros" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Sobre nosotros"
        titleLines={["Cuatro generaciones", "en Marbella"]}
        lede="Una empresa familiar creada en el año 2000, con raíces en el primer hotel que tuvo la ciudad."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Sobre nosotros", path: "/sobre-nosotros" },
        ]}
        image={{
          src: "/img/historia/hotel-salduba-1.jpg",
          alt: "El histórico Hotel Salduba de Marbella, regentado por la familia",
        }}
      />

      {/* ─────────────────────────────────────────────────── who we are ── */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01">Quiénes somos</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="display-md">
              {LEGAL_NAME} es una empresa familiar creada en el año{" "}
              {FOUNDED_YEAR}, dedicada al arrendamiento de inmuebles en
              propiedad.
            </p>
            <div className="prose-editorial mt-10 max-w-xl">
              <p>
                Entre ellos, tanto locales comerciales como apartamentos,
                situados todos en el Casco Antiguo de Marbella: punto de
                referencia comercial y turístico dentro de una ciudad conocida
                mundialmente.
              </p>
              <p>
                Fundada por el matrimonio formado por{" "}
                <strong>Juan Luis Gámez Sánchez</strong> y{" "}
                <strong>Mª Begoña Ortúzar Inunciaga</strong>. Desde finales de
                2014 asume la gerencia{" "}
                <strong>Juan Luis Gámez Ortúzar</strong>, abogado, siempre
                contando con la presencia de su progenitor en la llevanza de la
                entidad. También se incorpora a la gestión{" "}
                <strong>Ibón Gámez Ortúzar</strong>, de manera que la segunda
                generación asume el día a día de la empresa.
              </p>
            </div>

            {/* The naming question, answered in the company's own words */}
            <div className="mt-12 border-l-2 border-terracotta/60 pl-6">
              <p className="label text-terracotta">Sobre el nombre</p>
              <p className="prose-editorial mt-3 max-w-xl">
                El nombre comercial es <strong>{BRAND_NAME}</strong>; la entidad
                es <strong>{LEGAL_NAME}</strong> (CIF {TAX_ID}). {BRAND_NAME} es
                el nombre por el que aún se conoce a Juan Luis Gámez en Marbella,
                y el de su primera tienda en la Plaza de África.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── the timeline ── */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionLabel index="02">Historia</SectionLabel>
            <h2 className="display-lg mt-6">Desde 1919</h2>
            <p className="prose-editorial mt-6">
              Los antepasados familiares ya habían destacado dentro del
              empresariado local mucho antes de que existiera la empresa.
            </p>
          </Reveal>

          <ol className="mt-16 flex flex-col">
            {MILESTONES.map((m, i) => (
              <Reveal
                as="li"
                key={m.year}
                delay={0.05}
                className="grid gap-6 border-t border-[var(--line)] py-10 md:grid-cols-12 md:gap-10 md:py-14"
              >
                <div className="md:col-span-3">
                  <p className="font-display text-4xl leading-none font-light text-terracotta md:text-5xl">
                    {m.year}
                  </p>
                  <p className="label mt-4 text-stone">
                    {String(i + 1).padStart(2, "0")} / {MILESTONES.length}
                  </p>
                </div>

                <div className={m.image ? "md:col-span-5" : "md:col-span-8"}>
                  <h3 className="display-sm">{m.title}</h3>
                  <p className="prose-editorial mt-4">{m.body}</p>
                </div>

                {m.image ? (
                  <div className="md:col-span-4">
                    <Photo
                      image={{ src: m.image, alt: m.imageAlt ?? m.title }}
                      ratio="4 / 3"
                      sizes="(min-width: 768px) 30vw, 92vw"
                    />
                  </div>
                ) : null}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── quotation ── */}
      <section className="shell py-20 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel className="justify-center">Crónica local</SectionLabel>
          <blockquote className="mt-8">
            <p className="display-md text-balance">“{HISTORIAN_QUOTE.text}”</p>
            <footer className="label mt-8 text-stone">
              — {HISTORIAN_QUOTE.attribution}
            </footer>
          </blockquote>
        </Reveal>

        <Reveal delay={0.15} className="mt-20">
          <ul className="grid gap-4 sm:grid-cols-3">
            {[
              {
                src: "/img/historia/hotel-comercial-1950-60-125.jpg",
                alt: "El Hotel Comercial de Marbella entre 1950 y 1960",
              },
              {
                src: "/img/historia/hotel-salduba-2.jpg",
                alt: "El Hotel Salduba de Marbella",
              },
              {
                src: "/img/historia/hotel-salduba-3.jpg",
                alt: "La terraza del Hotel Salduba, la célebre acera del Salduba",
              },
            ].map((img) => (
              <li key={img.src}>
                <Photo
                  image={img}
                  ratio="4 / 3"
                  sizes="(min-width: 640px) 31vw, 92vw"
                />
              </li>
            ))}
          </ul>
          <p className="label mt-5 text-stone/70">
            Archivo familiar · Hotel Comercial y Hotel Salduba, Marbella
          </p>
        </Reveal>
      </section>

      {/* ────────────────────────────────────────────────────── commitment ── */}
      <section className="relative overflow-hidden bg-charcoal py-20 text-paper md:py-28">
        <span aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionLabel index="03" tone="paper">
                Compromiso
              </SectionLabel>
              <h2 className="display-md mt-6 text-paper">{COMMITMENT.title}</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <div className="prose-editorial max-w-xl text-paper/75">
                {COMMITMENT.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ArrowLink href="/proyectos" tone="paper" className="mt-10">
                Nuestro próximo proyecto
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactBand
        title="Contáctenos para tener el gusto de atenderle"
        body="Hablará con la propiedad: la segunda generación lleva hoy el día a día."
      />
    </>
  );
}
