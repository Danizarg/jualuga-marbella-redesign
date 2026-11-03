import type { PropertyImage } from "@/data/properties";
import { Photo } from "@/components/ui/Photo";
import { ArrowLink, SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";

interface FeatureRowProps {
  index: string;
  label: string;
  title: string;
  body: string[];
  image: PropertyImage;
  secondImage?: PropertyImage;
  href: string;
  linkLabel: string;
  /** "right" puts the photography on the right of the text. */
  align?: "left" | "right";
  meta?: string[];
}

/**
 * The editorial workhorse: an asymmetric two-column row of photography and
 * copy, flipped by `align` so consecutive rows alternate down the page.
 */
export function FeatureRow({
  index,
  label,
  title,
  body,
  image,
  secondImage,
  href,
  linkLabel,
  align = "left",
  meta,
}: FeatureRowProps) {
  const imageFirst = align === "left";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal
        slow
        className={[
          "lg:col-span-7",
          imageFirst ? "lg:order-1" : "lg:order-2 lg:col-start-6",
        ].join(" ")}
      >
        <div className="relative">
          <Photo
            image={image}
            ratio="16 / 11"
            sizes="(min-width: 1024px) 56vw, 92vw"
          />
          {secondImage ? (
            <div
              className={[
                "relative mt-4 w-1/2 lg:absolute lg:mt-0 lg:w-[38%]",
                imageFirst
                  ? "lg:-right-12 lg:-bottom-14"
                  : "lg:-bottom-14 lg:-left-12",
              ].join(" ")}
            >
              <Photo
                image={secondImage}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 22vw, 46vw"
                className="border-4 border-paper lg:border-8"
              />
            </div>
          ) : null}
        </div>
      </Reveal>

      <Reveal
        delay={0.12}
        className={[
          "lg:col-span-4",
          imageFirst ? "lg:order-2 lg:col-start-9" : "lg:order-1 lg:col-start-1",
        ].join(" ")}
      >
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="display-md mt-6">{title}</h2>
        <div className="prose-editorial mt-6">
          {body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {meta?.length ? (
          <ul className="mt-8 flex flex-col divide-y divide-[var(--line)] border-t border-[var(--line)]">
            {meta.map((m) => (
              <li key={m} className="label py-3 text-stone">
                {m}
              </li>
            ))}
          </ul>
        ) : null}

        <ArrowLink href={href} className="mt-9">
          {linkLabel}
        </ArrowLink>
      </Reveal>
    </div>
  );
}
