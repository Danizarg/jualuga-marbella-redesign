import { CONTACTS, EMAIL, EMAIL_HREF } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Bits";

/**
 * Closing contact band. Every enquiry route on the site resolves to the two
 * real phone numbers and the one real address published by the client.
 */
export function ContactBand({
  title = "Hablemos de su espacio",
  body = "Cuéntenos qué necesita y le atenderemos directamente. Sin intermediarios: hablará con la propiedad.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal text-paper">
      <span aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="shell relative py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel tone="paper">Contacto</SectionLabel>
            <h2 className="display-md mt-6 text-paper">{title}</h2>
            <p className="lede mt-6 max-w-md text-paper/70">{body}</p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-paper/12 border-y border-paper/12">
              {CONTACTS.map((c) => (
                <li
                  key={c.phoneHref}
                  className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="label text-paper/45">{c.role}</p>
                    <p className="display-sm mt-2 text-paper">{c.name}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={c.phoneHref}
                      className="label border border-paper/25 px-4 py-3 transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-charcoal"
                    >
                      {c.phoneDisplay}
                    </a>
                    <a
                      href={c.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label border border-paper/25 px-4 py-3 transition-colors duration-500 hover:border-terracotta-soft hover:bg-terracotta hover:text-paper"
                    >
                      WhatsApp
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={EMAIL_HREF}
              className="group/e mt-8 flex items-center justify-between gap-4 border-b border-paper/12 pb-5"
            >
              <span>
                <span className="label block text-paper/45">Correo</span>
                <span className="mt-2 block font-display text-xl font-light sm:text-2xl">
                  {EMAIL}
                </span>
              </span>
              <span
                aria-hidden
                className="label shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/e:translate-x-1.5 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
