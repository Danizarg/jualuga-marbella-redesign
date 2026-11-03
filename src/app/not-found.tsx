import Link from "next/link";

import { PRIMARY_NAV } from "@/data/nav";
import { ArrowLink } from "@/components/ui/Bits";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="label text-stone">Error 404</p>
      <h1 className="display-lg mt-6 max-w-2xl">
        Esta página no existe o ha cambiado de sitio.
      </h1>
      <p className="lede mt-7 max-w-xl">
        Puede volver al inicio o ir directamente a la cartera de propiedades.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
        <ArrowLink href="/">Volver al inicio</ArrowLink>
        <ArrowLink href="/propiedades">Ver propiedades</ArrowLink>
      </div>

      <nav aria-label="Páginas del sitio" className="mt-20 border-t border-[var(--line)] pt-10">
        <p className="label text-stone">Todas las páginas</p>
        <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[0.9375rem] font-light text-stone underline decoration-sand-deep underline-offset-4 transition-colors duration-500 hover:text-charcoal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
