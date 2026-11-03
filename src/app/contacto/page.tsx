import type { Metadata } from "next";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { LocationsSection } from "@/components/map/LocationsSection";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import {
  ADDRESS,
  BRAND_NAME,
  CONTACTS,
  EMAIL,
  EMAIL_HREF,
  LEGAL_NAME,
  TAX_ID,
} from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description:
    "Contacte con JULUGA en Marbella: Juan Luis Gámez 616 31 29 30, Ibón Gámez 636 36 27 14, info@juanluisgamez.com. Casco Antiguo de Marbella, 29601.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Contacto", path: "/contacto" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Contacto"
        titleLines={["Hablemos de", "su espacio"]}
        lede="Hablará directamente con la propiedad. Sin intermediarios y sin comisiones de agencia."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ]}
      />

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ───────────────────────────────────────────── direct contact ── */}
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01">Directo</SectionLabel>

            <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {CONTACTS.map((c) => (
                <li key={c.phoneHref} className="py-7">
                  <p className="label text-stone">{c.role}</p>
                  <p className="display-sm mt-2">{c.name}</p>
                  <a
                    href={c.phoneHref}
                    className="mt-3 block font-display text-2xl font-light text-terracotta transition-opacity duration-500 hover:opacity-70"
                  >
                    {c.phoneDisplay}
                  </a>
                  <a
                    href={c.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-4 inline-flex items-center gap-2 border border-charcoal/15 px-3 py-2.5 transition-colors duration-500 hover:border-terracotta hover:bg-terracotta hover:text-paper"
                  >
                    WhatsApp
                    <span aria-hidden>→</span>
                  </a>
                </li>
              ))}

              <li className="py-7">
                <p className="label text-stone">Correo</p>
                <a
                  href={EMAIL_HREF}
                  className="mt-2 block font-display text-xl font-light break-words transition-opacity duration-500 hover:opacity-70"
                >
                  {EMAIL}
                </a>
              </li>

              <li className="py-7">
                <p className="label text-stone">Dónde estamos</p>
                <address className="prose-editorial mt-3 text-[0.9375rem] not-italic">
                  {ADDRESS.area}
                  <br />
                  {ADDRESS.locality} {ADDRESS.postalCode}
                  <br />
                  {ADDRESS.region}, {ADDRESS.countryName}
                </address>
              </li>

              <li className="py-7">
                <p className="label text-stone">Entidad</p>
                <p className="prose-editorial mt-3 text-[0.9375rem]">
                  {LEGAL_NAME}
                  <br />
                  CIF {TAX_ID}
                  <br />
                  <span className="text-stone">Nombre comercial {BRAND_NAME}</span>
                </p>
              </li>
            </ul>
          </Reveal>

          {/* ──────────────────────────────────────────────────────── form ── */}
          <Reveal delay={0.12} className="lg:col-span-7 lg:col-start-6">
            <SectionLabel index="02">Escríbanos</SectionLabel>
            <h2 className="display-md mt-6">Cuéntenos qué necesita</h2>
            <p className="prose-editorial mt-5 max-w-xl">
              Indíquenos qué propiedad le interesa y cómo prefiere que le
              contactemos. Le responderemos a la mayor brevedad.
            </p>

            <div className="mt-10">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionLabel index="03">Ubicaciones</SectionLabel>
            <h2 className="display-lg mt-6">Dónde encontrarnos</h2>
          </Reveal>
          <div className="mt-14">
            <LocationsSection />
          </div>
        </div>
      </section>
    </>
  );
}
