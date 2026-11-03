import Link from "next/link";

import { PRIMARY_NAV, SECONDARY_NAV } from "@/data/nav";
import {
  ADDRESS,
  BRAND_NAME,
  CONTACTS,
  EMAIL,
  EMAIL_HREF,
  FOUNDED_YEAR,
  LEGAL_NAME,
  TAX_ID,
} from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal text-paper">
      <span aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="shell relative py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="font-display text-3xl tracking-[0.22em]">{BRAND_NAME}</p>
            <p className="lede mt-6 max-w-sm text-paper/65">
              Locales comerciales y apartamentos en propiedad, todos en el Casco
              Antiguo de Marbella. Empresa familiar desde {FOUNDED_YEAR}.
            </p>
            <address className="label mt-8 block text-paper/45 not-italic">
              {ADDRESS.area} · {ADDRESS.locality} {ADDRESS.postalCode}
              <br />
              {ADDRESS.region}, {ADDRESS.countryName}
            </address>
          </div>

          <nav aria-label="Pie de página">
            <p className="label mb-6 text-paper/40">Navegación</p>
            <ul className="flex flex-col gap-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] font-light text-paper/70 transition-colors duration-500 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-col gap-3 border-t border-paper/10 pt-6">
              {SECONDARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] font-light text-paper/55 transition-colors duration-500 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-6 text-paper/40">Contacto</p>
            <ul className="flex flex-col gap-6">
              {CONTACTS.map((c) => (
                <li key={c.phoneHref}>
                  <p className="label text-paper/45">{c.name}</p>
                  <a
                    href={c.phoneHref}
                    className="mt-1.5 block font-display text-2xl font-light transition-colors duration-500 hover:text-sand"
                  >
                    {c.phoneDisplay}
                  </a>
                </li>
              ))}
              <li>
                <p className="label text-paper/45">Correo</p>
                <a
                  href={EMAIL_HREF}
                  className="mt-1.5 block text-[0.9375rem] font-light text-paper/80 transition-colors duration-500 hover:text-paper"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label text-paper/40">
            © {year} {LEGAL_NAME} · CIF {TAX_ID}
          </p>
          <p className="label text-paper/30">
            Nombre comercial {BRAND_NAME} · Entidad {LEGAL_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
