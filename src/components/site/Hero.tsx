import Image from "next/image";
import Link from "next/link";

import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { ScrollCue } from "@/components/site/ScrollCue";
import { BLUR_SAND, resolveImage } from "@/lib/images";

/**
 * Fullscreen opening frame.
 *
 * Art direction note: the best architectural photograph the client has of the
 * old town is portrait, 720x960. Stretched edge-to-edge across a desktop hero
 * it would be a 2.2x upscale and visibly soft, so the hero is composed as a
 * split instead — a charcoal title panel beside a full-height architectural
 * plate, which holds the image near its native size. On phones, where the
 * viewport is itself portrait, the same image goes full-bleed and stays sharp.
 *
 * A slow Ken Burns push, a warm scrim and a grain layer do the cinematic work.
 */
export function Hero() {
  const image = resolveImage({
    src: "/img/locales-plaza-victoria/edificio-plaza-de-la-victoria.jpg",
    alt: "Fachada encalada con tejas vidriadas y balcones de forja en la Plaza de la Victoria, Casco Antiguo de Marbella",
  });

  return (
    <section className="relative flex h-[100svh] min-h-[36rem] overflow-hidden bg-charcoal text-paper">
      {/* ── photographic plate ──────────────────────────────────────────── */}
      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[56%]">
        <div className="grain relative h-full w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 56vw, 100vw"
            quality={92}
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={BLUR_SAND}
            className="ken-burns h-full w-full object-cover object-[58%_38%] will-change-transform lg:object-[center_35%]"
          />

          {/* Mobile: the type sits on the image, so it needs a full scrim. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/94 via-ink/72 to-ink/30 lg:hidden"
          />
          {/* Desktop: only a soft feather where the plate meets the panel. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-px hidden w-40 bg-gradient-to-r from-charcoal to-transparent lg:block"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-ink/14 lg:block"
          />
          {/* Grounds the foot of the plate and carries the scroll cue */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-56 bg-gradient-to-t from-ink/75 to-transparent lg:block"
          />
        </div>
      </div>

      {/* Top scrim across the whole hero so the header stays legible where it
          crosses the bright upper half of the photograph. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-44 bg-gradient-to-b from-ink/72 via-ink/32 to-transparent"
      />

      {/* ── title panel ─────────────────────────────────────────────────── */}
      <div className="shell relative z-10 flex w-full flex-col justify-end pt-28 pb-20 lg:justify-center lg:pt-24 lg:pb-16">
        <div className="lg:w-[46%] lg:pr-10">
          <div
            className="fade-up flex items-center gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <span aria-hidden className="h-px w-10 bg-terracotta-soft" />
            <p className="label text-paper/75">Casco Antiguo · Marbella</p>
          </div>

          <AnimatedTitle
            as="h1"
            delay={0.5}
            lines={["Espacios únicos", "en el corazón", "de Marbella."]}
            className="display-xl mt-7 text-paper"
          />

          <p
            className="lede fade-up mt-8 max-w-md text-paper/75"
            style={{ animationDelay: "1.6s" }}
          >
            Locales comerciales y apartamentos en propiedad, en el mejor
            emplazamiento del centro histórico. Una cartera familiar, cuidada
            desde el año 2000.
          </p>

          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "1.85s" }}
          >
            <Link
              href="/propiedades"
              className="group/h label flex items-center gap-3 border border-paper/30 px-6 py-4 transition-colors duration-700 hover:border-paper hover:bg-paper hover:text-charcoal"
            >
              Ver la cartera
              <svg
                aria-hidden
                viewBox="0 0 24 10"
                className="h-2 w-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/h:translate-x-1.5 motion-reduce:transition-none"
                fill="none"
              >
                <path
                  d="M0 5h22M17.5 0.5 22 5l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </Link>
            <Link
              href="/contacto"
              className="label text-paper/70 underline decoration-paper/25 underline-offset-8 transition-colors duration-500 hover:text-paper"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
