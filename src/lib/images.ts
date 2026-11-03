import { IMAGE_DIMENSIONS } from "@/data/image-dimensions";
import type { PropertyImage } from "@/data/properties";

export interface ResolvedImage extends PropertyImage {
  width: number;
  height: number;
}

/**
 * Attaches intrinsic dimensions to an image reference so next/image can
 * reserve layout space and never request an upscale.
 *
 * The client's photography is modest resolution (largest is 1280px wide), so
 * knowing the true size matters: it lets us cap `sizes` and avoid blurry
 * stretched renders.
 */
export function resolveImage(image: PropertyImage): ResolvedImage {
  const dims = IMAGE_DIMENSIONS[image.src];
  if (!dims) {
    // A missing entry means `npm run measure:images` has not been run since
    // the photograph was added. Fall back to 4:3 rather than crashing a page.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[images] no measured dimensions for ${image.src}`);
    }
    return { ...image, width: 1200, height: 900 };
  }
  return { ...image, ...dims };
}

export function resolveImages(images: PropertyImage[]): ResolvedImage[] {
  return images.map(resolveImage);
}

export function isPortrait(image: ResolvedImage): boolean {
  return image.height > image.width;
}

/**
 * A flat warm-sand swatch used as the blur placeholder under photography, so
 * images resolve out of the palette instead of out of grey. Pre-encoded as a
 * literal rather than built with Buffer, so client components can import it.
 */
export const BLUR_SAND =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNkZWQyYzAiLz48L3N2Zz4=";
