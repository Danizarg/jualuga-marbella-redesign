import Image from "next/image";

import { INSTALLED_BUSINESSES } from "@/data/businesses";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Logos of the businesses currently trading from the portfolio. On the
 * original site this is the strongest trust signal the company has — the
 * tenants stay put for years — so it earns a place on the home page.
 */
export function BusinessStrip() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
      {INSTALLED_BUSINESSES.map((business, i) => (
        <Reveal as="li" key={business.name} delay={i * 0.07} className="group">
          <div className="flex h-16 items-center justify-center md:h-20">
            <Image
              src={business.logo}
              alt={business.logoAlt}
              width={220}
              height={110}
              sizes="(min-width: 1024px) 14vw, 40vw"
              // Tenant logos arrive on assorted white backgrounds; multiply
              // blends them into the paper, and they lift to full contrast
              // on hover.
              className="max-h-full w-auto opacity-55 mix-blend-multiply grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
            />
          </div>
          <div className="mt-5 border-t border-[var(--line)] pt-4 text-center">
            <p className="label text-charcoal">{business.name}</p>
            <p className="label mt-2 text-stone/80">{business.trade}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
