import Image from "next/image";

import type { PropertyImage } from "@/data/properties";
import { BLUR_SAND, resolveImage } from "@/lib/images";

interface PhotoProps {
  image: PropertyImage;
  /** Required: the client's photography is small, so sizes must be honest. */
  sizes: string;
  priority?: boolean;
  /** CSS aspect-ratio for the frame, e.g. "4 / 5". Omit to use intrinsic. */
  ratio?: string;
  className?: string;
  objectPosition?: string;
  /** Film grain over the image — on by default for architectural shots. */
  grain?: boolean;
  /**
   * Slow zoom when the nearest `.group` ancestor is hovered. Pure CSS, so
   * this component stays a server component.
   */
  hoverZoom?: boolean;
  quality?: number;
}

/**
 * The single place photography is rendered.
 *
 * Two deliberate treatments, both responses to the source material: the
 * originals top out at 1280px, so (a) a fine grain layer gives them a printed,
 * archival character rather than letting them read as a soft upscale, and
 * (b) a warm sand placeholder keeps loading inside the palette.
 */
export function Photo({
  image,
  sizes,
  priority = false,
  ratio,
  className = "",
  objectPosition = "center",
  grain = true,
  hoverZoom = false,
  quality = 88,
}: PhotoProps) {
  const resolved = resolveImage(image);

  return (
    <span
      className={`relative block overflow-hidden bg-sand ${grain ? "grain" : ""} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        src={resolved.src}
        alt={resolved.alt}
        width={resolved.width}
        height={resolved.height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={BLUR_SAND}
        className={[
          "h-full w-full object-cover",
          hoverZoom
            ? "transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.055] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            : "",
        ].join(" ")}
        style={{ objectPosition }}
      />
      {/* Barely-there warm wash: unifies photos shot years apart on different cameras */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-terracotta/[0.045] mix-blend-multiply"
      />
    </span>
  );
}
