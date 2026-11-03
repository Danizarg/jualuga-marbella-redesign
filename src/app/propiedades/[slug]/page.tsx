import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Gallery } from "@/components/property/Gallery";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ContactBand } from "@/components/site/ContactBand";
import { Breadcrumbs } from "@/components/site/PageHeader";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { ArrowLink, ConceptFlag, SectionLabel } from "@/components/ui/Bits";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { getLocation } from "@/data/locations";
import {
  EN_VENTA_DISTRIBUTION,
  KIND_LABELS,
  PROPERTIES,
  TENURE_LABELS,
  getProperty,
} from "@/data/properties";
import { CONTACTS, EMAIL, EMAIL_HREF } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata, propertyJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Propiedad no encontrada" };

  return pageMetadata({
    title: `${property.title} — ${property.kicker}`,
    description: property.summary,
    path: `/propiedades/${property.slug}`,
    image: property.cover.src,
  });
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const location = getLocation(property.location);
  const others = PROPERTIES.filter((p) => p.slug !== property.slug).slice(0, 3);
  const isForSale = property.tenure.includes("venta");

  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Propiedades", path: "/propiedades" },
    { name: `${property.title} — ${property.kicker}`, path: `/propiedades/${property.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd(property)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />

      {/* ──────────────────────────────────────────── fullscreen opening ── */}
      <header className="scrim grain relative flex min-h-[86svh] flex-col justify-end overflow-hidden bg-charcoal pt-32 pb-14 md:pb-20">
        <div className="absolute inset-0">
          <Photo
            image={property.cover}
            sizes="100vw"
            priority
            grain={false}
            className="h-full w-full"
          />
        </div>

        <div className="shell relative z-10">
          <Breadcrumbs crumbs={crumbs} tone="paper" />

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <span className="label border border-paper/35 px-2.5 py-1.5 text-paper">
              {KIND_LABELS[property.kind]}
            </span>
            {property.tenure.map((t) => (
              <span
                key={t}
                className="label border border-paper/35 bg-paper/10 px-2.5 py-1.5 text-paper backdrop-blur-sm"
              >
                {TENURE_LABELS[t]}
              </span>
            ))}
            {!property.verified ? <ConceptFlag /> : null}
          </div>

          <AnimatedTitle
            delay={0.25}
            lines={[property.title]}
            className="display-lg mt-6 text-paper"
          />
          <p
            className="lede fade-up mt-4 max-w-2xl text-paper/80"
            style={{ animationDelay: "0.9s" }}
          >
            {property.kicker} · {location.name}
          </p>
        </div>
      </header>

      {/* ─────────────────────────────────────────────── copy + spec table ── */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionLabel index="01">La propiedad</SectionLabel>
            <div className="prose-editorial mt-8 max-w-xl text-[1.0625rem]">
              {property.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="label mt-14 text-stone">Características</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {property.features.map((f) => (
                <li key={f} className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="mt-2 block size-1 shrink-0 rounded-full bg-terracotta"
                  />
                  <span className="text-[0.9375rem] font-light">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {property.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-5 py-4"
                  >
                    <dt className="label text-stone">{fact.label}</dt>
                    <dd className="text-right text-[0.9375rem] font-light">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="label mt-5 text-stone/70">
                Precios y disponibilidad, a consultar
              </p>

              <div className="mt-8 flex flex-col gap-2.5">
                {CONTACTS.map((c) => (
                  <a
                    key={c.phoneHref}
                    href={c.phoneHref}
                    className="group/c flex items-center justify-between gap-4 border border-charcoal/15 px-4 py-4 transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-paper"
                  >
                    <span>
                      <span className="label block opacity-60">{c.name}</span>
                      <span className="mt-1.5 block font-display text-lg font-light">
                        {c.phoneDisplay}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="label transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/c:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </a>
                ))}
                <a
                  href={`${EMAIL_HREF}?subject=${encodeURIComponent(
                    `Consulta: ${property.title} — ${property.kicker}`,
                  )}`}
                  className="label border border-charcoal/15 px-4 py-4 text-center transition-colors duration-500 hover:border-terracotta hover:bg-terracotta hover:text-paper"
                >
                  Escribir a {EMAIL}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── distribution (the plot for sale only) ── */}
      {isForSale ? (
        <section className="bg-paper-warm py-20 md:py-28">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <SectionLabel index="02">Posibilidades</SectionLabel>
              <h2 className="display-md mt-6">Distribución propuesta</h2>
              <p className="prose-editorial mt-6">
                Reparto publicado por la propiedad para una promoción de hasta
                cinco viviendas de diversa tipología.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-14">
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {EN_VENTA_DISTRIBUTION.map((row, i) => (
                  <li
                    key={row.floor}
                    className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8"
                  >
                    <span className="label text-terracotta md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-sm md:col-span-3">{row.floor}</span>
                    <span className="prose-editorial md:col-span-8">{row.use}</span>
                  </li>
                ))}
              </ul>
              <p className="label mt-6 text-stone/70">
                Sujeto a licencia y normativa urbanística municipal
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ───────────────────────────────────────────────────────── gallery ── */}
      <section className="shell py-20 md:py-28">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={isForSale ? "03" : "02"}>Galería</SectionLabel>
            <h2 className="display-md mt-6">
              {property.gallery.length} imágenes
            </h2>
          </div>
          <p className="label shrink-0 text-stone">
            Pulse cualquier imagen para ampliarla
          </p>
        </Reveal>

        <div className="mt-12">
          <Gallery
            images={property.gallery}
            title={`${property.title} — ${property.kicker}`}
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── location ── */}
      <section className="shell pb-20 md:pb-28">
        <Reveal className="grid gap-10 border-t border-[var(--line)] pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index={isForSale ? "04" : "03"}>Ubicación</SectionLabel>
            <h2 className="display-md mt-6">{location.name}</h2>
            <p className="prose-editorial mt-6">{location.note}</p>
            <ArrowLink href="/ubicaciones" className="mt-9">
              Ver en el plano
            </ArrowLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Photo
              image={{ src: location.image, alt: location.name }}
              ratio="16 / 10"
              sizes="(min-width: 1024px) 48vw, 92vw"
            />
          </div>
        </Reveal>
      </section>

      {/* ─────────────────────────────────────────────────────────── others ── */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="display-md">Otras propiedades</h2>
            <ArrowLink href="/propiedades" className="shrink-0">
              Toda la cartera
            </ArrowLink>
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {others.map((other, i) => (
              <Reveal as="li" key={other.slug} delay={i * 0.08}>
                <PropertyCard property={other} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand
        title={`¿Quiere ver ${property.title.toLowerCase()}?`}
        body="Concertamos la visita directamente. Hablará con la propiedad, no con un intermediario."
      />

      <nav aria-label="Volver" className="shell py-12">
        <Link
          href="/propiedades"
          className="label inline-flex items-center gap-3 text-stone transition-colors duration-500 hover:text-charcoal"
        >
          <span aria-hidden>←</span> Volver a propiedades
        </Link>
      </nav>
    </>
  );
}
