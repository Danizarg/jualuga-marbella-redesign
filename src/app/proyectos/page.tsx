import type { Metadata } from "next";

import { ContactBand } from "@/components/site/ContactBand";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowLink, SectionLabel } from "@/components/ui/Bits";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { CURRENT_PROJECT } from "@/data/history";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Proyectos",
  description:
    "El próximo proyecto de JULUGA en el Casco Antiguo de Marbella: un nuevo inmueble adquirido, en fase de definición.",
  path: "/proyectos",
  image: "/img/proyectos/viendo-posibilidades-reforma-1.jpg",
});

export default function ProyectosPage() {
  const [hero, ...rest] = CURRENT_PROJECT.images;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Proyectos", path: "/proyectos" },
            ]),
          ),
        }}
      />

      <PageHeader
        label="Proyectos"
        titleLines={["Un proyecto", "en marcha"]}
        lede="Tras la adquisición de un nuevo inmueble en el Casco Antiguo, estamos dándole forma al proyecto empresarial para ese lugar."
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Proyectos", path: "/proyectos" },
        ]}
        image={{
          src: "/img/proyectos/viendo-posibilidades-reforma-1.jpg",
          alt: "Estudiando las posibilidades de reforma del nuevo inmueble en el Casco Antiguo de Marbella",
        }}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01">En definición</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <h2 className="display-md">{CURRENT_PROJECT.title}</h2>
            <div className="prose-editorial mt-8 max-w-xl">
              {CURRENT_PROJECT.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="label mt-10 border-l-2 border-sand-deep pl-5 text-stone">
              Publicaremos los detalles cuando el proyecto esté definido
            </p>
            <ArrowLink href="/contacto" className="mt-10">
              Interesado en el proyecto
            </ArrowLink>
          </Reveal>
        </div>

        <Reveal slow delay={0.15} className="mt-20">
          <Photo
            image={hero}
            ratio="16 / 9"
            sizes="(min-width: 1536px) 90rem, 92vw"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-4">
          <ul className="grid gap-4 sm:grid-cols-3">
            {rest.map((img) => (
              <li key={img.src}>
                <Photo
                  image={img}
                  ratio="4 / 3"
                  sizes="(min-width: 640px) 31vw, 92vw"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <ContactBand
        title="¿Le interesa colaborar?"
        body="Si cree que su negocio encaja en un nuevo espacio del centro histórico, hablemos."
      />
    </>
  );
}
