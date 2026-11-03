import Link from "next/link";

import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Photo } from "@/components/ui/Photo";
import type { PropertyImage } from "@/data/properties";

interface Crumb {
  name: string;
  path: string;
}

interface PageHeaderProps {
  label: string;
  /** One entry per visual line. */
  titleLines: string[];
  lede?: string;
  crumbs?: Crumb[];
  /** With an image the header renders dark and full-bleed. */
  image?: PropertyImage;
}

export function PageHeader({
  label,
  titleLines,
  lede,
  crumbs,
  image,
}: PageHeaderProps) {
  if (image) {
    return (
      <header className="scrim grain relative flex min-h-[70svh] flex-col justify-end overflow-hidden bg-charcoal pt-32 pb-14 md:min-h-[78svh] md:pb-20">
        <div className="absolute inset-0">
          <Photo
            image={image}
            sizes="100vw"
            priority
            grain={false}
            className="h-full w-full"
          />
        </div>
        <div className="shell relative z-10">
          {crumbs ? <Breadcrumbs crumbs={crumbs} tone="paper" /> : null}
          <p className="label fade-up mt-6 text-paper/70">{label}</p>
          <AnimatedTitle
            delay={0.2}
            lines={titleLines}
            className="display-lg mt-5 max-w-4xl text-paper"
          />
          {lede ? (
            <p
              className="lede fade-up mt-7 max-w-2xl text-paper/80"
              style={{ animationDelay: "0.9s" }}
            >
              {lede}
            </p>
          ) : null}
        </div>
      </header>
    );
  }

  return (
    <header className="shell pt-32 pb-14 md:pt-44 md:pb-20">
      {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
      <p className="label mt-6 text-stone">{label}</p>
      <AnimatedTitle
        delay={0.1}
        lines={titleLines}
        className="display-lg mt-5 max-w-4xl"
      />
      {lede ? (
        <p
          className="lede fade-up mt-8 max-w-2xl"
          style={{ animationDelay: "0.7s" }}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}

export function Breadcrumbs({
  crumbs,
  tone = "ink",
}: {
  crumbs: Crumb[];
  tone?: "ink" | "paper";
}) {
  const muted = tone === "paper" ? "text-paper/50" : "text-stone";
  const strong = tone === "paper" ? "text-paper/80" : "text-charcoal";
  return (
    <nav aria-label="Migas de pan">
      <ol className="label flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span className={muted} aria-current="page">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.path}
                    className={`${strong} transition-opacity duration-500 hover:opacity-65`}
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden className={muted}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
