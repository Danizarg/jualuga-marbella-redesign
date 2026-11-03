"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { PRIMARY_NAV, SECONDARY_NAV } from "@/data/nav";
import { BRAND_NAME, CONTACTS, EMAIL, EMAIL_HREF } from "@/data/site";

interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
  /** Focus returns here on close. */
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
  currentPath: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function NavOverlay({
  open,
  onClose,
  returnFocusTo,
  currentPath,
}: NavOverlayProps) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock the page behind the overlay, compensating for the scrollbar so the
  // layout underneath does not jump.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open]);

  // Escape to close, and keep Tab inside the dialog while it is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => firstLinkRef.current?.focus(), reduced ? 0 : 450);
      return () => window.clearTimeout(t);
    }
    returnFocusTo.current?.focus();
  }, [open, reduced, returnFocusTo]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navegación principal"
          className="fixed inset-0 z-[90] flex flex-col bg-charcoal text-paper"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduced ? 0.2 : 0.95, ease: EASE }}
        >
          {/* Grain keeps the flat charcoal from looking like a digital panel */}
          <span aria-hidden className="grain pointer-events-none absolute inset-0" />

          <div className="shell relative flex h-20 shrink-0 items-center justify-between md:h-24">
            <Link
              href="/"
              onClick={onClose}
              className="font-display text-2xl tracking-[0.22em] text-paper"
            >
              {BRAND_NAME}
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="label flex items-center gap-3 text-paper/70 transition-colors duration-500 hover:text-paper"
            >
              Cerrar
              <span aria-hidden className="relative block size-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="shell relative flex flex-1 flex-col justify-center overflow-y-auto py-10">
            <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
              <nav aria-label="Páginas">
                <ul>
                  {PRIMARY_NAV.map((item, i) => {
                    const active =
                      item.href === "/"
                        ? currentPath === "/"
                        : currentPath.startsWith(item.href);
                    return (
                      <li key={item.href} className="border-b border-paper/10">
                        <span className="block overflow-hidden">
                          <motion.span
                            className="block"
                            initial={reduced ? { opacity: 0 } : { y: "110%" }}
                            animate={reduced ? { opacity: 1 } : { y: "0%" }}
                            transition={{
                              duration: reduced ? 0.3 : 1,
                              delay: reduced ? i * 0.03 : 0.3 + i * 0.07,
                              ease: EASE,
                            }}
                          >
                            <Link
                              ref={i === 0 ? firstLinkRef : undefined}
                              href={item.href}
                              onClick={onClose}
                              aria-current={active ? "page" : undefined}
                              className="group/nav flex items-baseline gap-5 py-3.5 md:py-5"
                            >
                              <span
                                className={`label w-6 shrink-0 ${
                                  active ? "text-terracotta-soft" : "text-paper/40"
                                }`}
                              >
                                {item.index}
                              </span>
                              <span
                                className={`font-display text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.05] font-light transition-colors duration-500 ${
                                  active
                                    ? "text-terracotta-soft"
                                    : "text-paper group-hover/nav:text-sand"
                                }`}
                              >
                                {item.label}
                              </span>
                            </Link>
                          </motion.span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                className="flex flex-col gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: reduced ? 0.1 : 0.75 }}
              >
                <div>
                  <p className="label mb-5 text-paper/45">Más</p>
                  <ul className="flex flex-col gap-3">
                    {SECONDARY_NAV.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="text-[0.9375rem] font-light text-paper/70 transition-colors duration-500 hover:text-paper"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px w-full bg-paper/10" />

                <div>
                  <p className="label mb-5 text-paper/45">Contacto directo</p>
                  <ul className="flex flex-col gap-4">
                    {CONTACTS.map((c) => (
                      <li key={c.phoneHref}>
                        <a
                          href={c.phoneHref}
                          className="group/tel block transition-colors duration-500 hover:text-sand"
                        >
                          <span className="block font-display text-xl font-light">
                            {c.phoneDisplay}
                          </span>
                          <span className="label text-paper/45">{c.name}</span>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href={EMAIL_HREF}
                        className="block text-[0.9375rem] font-light text-paper/70 transition-colors duration-500 hover:text-paper"
                      >
                        {EMAIL}
                      </a>
                    </li>
                  </ul>
                </div>

                <p className="label text-paper/35">
                  Casco Antiguo · Marbella 29601
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
