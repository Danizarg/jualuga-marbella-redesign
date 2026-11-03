import Link from "next/link";

import { BusinessStrip } from "@/components/site/BusinessStrip";
import { ContactBand } from "@/components/site/ContactBand";
import { FeatureRow } from "@/components/site/FeatureRow";
import { Hero } from "@/components/site/Hero";
import { LocationsSection } from "@/components/map/LocationsSection";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ArrowLink, SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { INSTALLED_BUSINESSES_NOTE } from "@/data/businesses";
import { FOUNDED_YEAR } from "@/data/site";
import { PROPERTIES, getProperty } from "@/data/properties";

/** One of each kind, so the home page shows the full shape of the portfolio. */
const FEATURED = [
  "locales-comerciales-plaza-de-la-victoria",
  "atico-plaza-de-la-victoria",
  "inmueble-en-venta-casco-antiguo",
]
  .map(getProperty)
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function HomePage() {
  const apartamentos = PROPERTIES.filter((p) => p.kind === "apartamento").length;
  const locales = PROPERTIES.filter((p) => p.kind === "local-comercial").length;

  return (
    <>
      <Hero />

      {/* ─────────────────────────────────────────────────────── statement ── */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01">La casa</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="display-md max-w-3xl text-balance">
              Una empresa familiar que arrienda sus propios inmuebles en el
              Casco Antiguo de Marbella, punto de referencia comercial y
              turístico de la ciudad.
            </p>
            <div className="prose-editorial mt-10 max-w-xl">
              <p>
                Desde {FOUNDED_YEAR} cuidamos una cartera pequeña y escogida:
                locales en obligado punto de paso y apartamentos que gozan de la
                tranquilidad de una zona peatonal y céntrica.
              </p>
              <p>
                Tratará siempre con la propiedad. Es la segunda generación
                quien lleva hoy el día a día del negocio.
              </p>
            </div>
            <ArrowLink href="/sobre-nosotros" className="mt-10">
              Nuestra historia
            </ArrowLink>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-20 md:mt-28">
          <dl className="grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
            {[
              { k: "Fundada", v: String(FOUNDED_YEAR) },
              { k: "Locales comerciales", v: String(locales) },
              { k: "Apartamentos", v: String(apartamentos) },
              { k: "Ubicaciones", v: "3" },
            ].map((stat) => (
              <div key={stat.k} className="bg-paper px-5 py-8 md:px-7 md:py-10">
                <dt className="label text-stone">{stat.k}</dt>
                <dd className="font-display mt-4 text-4xl font-light md:text-5xl">
                  {stat.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ─────────────────────────────────────────────────────── portfolio ── */}
      <section className="bg-paper-warm py-24 md:py-36">
        <div className="shell">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="02">Cartera</SectionLabel>
              <h2 className="display-lg mt-6 max-w-2xl">
                Una selección de la cartera
              </h2>
            </div>
            <ArrowLink href="/propiedades" className="shrink-0">
              Todas las propiedades
            </ArrowLink>
          </Reveal>

          <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {FEATURED.map((property, i) => (
              <Reveal as="li" key={property.slug} delay={i * 0.1}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────────────────────────────── editorial features ── */}
      <section className="shell flex flex-col gap-32 py-24 md:gap-48 md:py-36">
        <FeatureRow
          index="03"
          label="Locales comerciales"
          title="El mejor emplazamiento del Casco Antiguo"
          body={[
            "Locales en la Plaza de la Victoria y en la Calle Padre Francisco Echamendi: dos de los puntos de referencia comercial del centro histórico.",
            "Situados en obligado punto de paso de miles de personas diariamente, en una zona comercial con el mejor potencial y una oferta comercial inigualable.",
          ]}
          image={{
            src: "/img/locales-plaza-victoria/edificio-plaza-de-la-victoria.jpg",
            alt: "Edificio de JULUGA en la Plaza de la Victoria, Marbella",
          }}
          secondImage={{
            src: "/img/locales-echamendi/calle-padre-fco-ecchamendi-foto-2.jpg",
            alt: "Calle Padre Francisco Echamendi, Casco Antiguo de Marbella",
          }}
          href="/locales-comerciales"
          linkLabel="Ver locales"
          align="left"
          meta={["Plaza de la Victoria", "Calle Padre Francisco Echamendi"]}
        />

        <FeatureRow
          index="04"
          label="Apartamentos"
          title="Coquetos, equipados, en zona peatonal"
          body={[
            "Apartamentos de uno y dos dormitorios, más un ático, en pleno Casco Antiguo y con vistas a la Plaza de la Victoria.",
            "Un tranquilo edificio familiar con sólo cinco viviendas. Todos se ofrecen totalmente amueblados y equipados para entrar a residir desde el primer momento.",
          ]}
          image={{
            src: "/img/atico/terraza-foto-2.jpg",
            alt: "Terraza del ático de JULUGA en la Plaza de la Victoria",
          }}
          secondImage={{
            src: "/img/apartamento-3/apto-3-salon.jpg",
            alt: "Salón del apartamento nº 3",
          }}
          href="/apartamentos"
          linkLabel="Ver apartamentos"
          align="right"
          meta={["1 y 2 dormitorios", "Ático con terraza", "Edificio de 5 viviendas"]}
        />

        <FeatureRow
          index="05"
          label="En venta"
          title="Una parcela con cinco viviendas por hacer"
          body={[
            "Inmueble en el Casco Antiguo: parcela de 80 m² de forma triangular, actualmente planta baja más una, con posibilidad de elevar segunda planta y ático retranqueado.",
            "Orientación sur y muy luminoso, a escasos 100 m de la Plaza de los Naranjos, en calle peatonal y muy tranquila.",
          ]}
          image={{
            src: "/img/en-venta/fachada-luz-manana-11-30am.jpg",
            alt: "Fachada del inmueble en venta en el Casco Antiguo de Marbella",
          }}
          href="/en-venta"
          linkLabel="Ver la oportunidad"
          align="left"
          meta={["Parcela de 80 m²", "Hasta 5 viviendas", "Orientación sur"]}
        />
      </section>

      {/* ───────────────────────────────────────────────────────── tenants ── */}
      <section className="bg-paper-warm py-24 md:py-32">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionLabel index="06">Negocios instalados</SectionLabel>
            <h2 className="display-md mt-6">
              Quienes ya trabajan en nuestros locales
            </h2>
            <p className="prose-editorial mt-6">{INSTALLED_BUSINESSES_NOTE}</p>
          </Reveal>

          <div className="mt-16">
            <BusinessStrip />
          </div>

          <Reveal delay={0.2} className="mt-14">
            <ArrowLink href="/negocios">Conocer los negocios</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────── locations ── */}
      <section className="shell py-24 md:py-36">
        <Reveal className="max-w-2xl">
          <SectionLabel index="07">Ubicaciones</SectionLabel>
          <h2 className="display-lg mt-6">Todo dentro del centro histórico</h2>
          <p className="prose-editorial mt-6">
            Tres emplazamientos, todos a pocos minutos a pie entre sí, dentro
            del Casco Antiguo de Marbella.
          </p>
        </Reveal>

        <div className="mt-16">
          <LocationsSection />
        </div>
      </section>

      <ContactBand />

      {/* A plain crawlable index of every property, below the interactive UI */}
      <nav aria-label="Índice de propiedades" className="shell py-14">
        <h2 className="label text-stone">Todas las propiedades</h2>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {PROPERTIES.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/propiedades/${p.slug}`}
                className="text-[0.875rem] font-light text-stone underline decoration-sand-deep underline-offset-4 transition-colors duration-500 hover:text-charcoal"
              >
                {p.title} — {p.kicker}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
