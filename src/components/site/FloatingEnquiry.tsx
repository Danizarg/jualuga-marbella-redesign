"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CONTACTS, EMAIL, EMAIL_HREF } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Floating enquiry control, bottom-right. Collapsed it is a single button;
 * expanded it lists the two real contacts with phone and WhatsApp, plus email.
 *
 * It appears only after the visitor has scrolled past the first screen, so it
 * never competes with the hero.
 */
export function FloatingEnquiry() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss on Escape or on a click outside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed right-[var(--gutter)] bottom-6 z-[70] flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            id="panel-consulta"
            className="pointer-events-auto w-[min(21rem,calc(100vw-2*var(--gutter)))] border border-sand-deep/50 bg-paper shadow-[0_24px_60px_-28px_rgba(27,25,23,0.4)]"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease: EASE }}
          >
            <div className="border-b border-[var(--line)] px-5 py-4">
              <p className="label text-stone">Consultar disponibilidad</p>
            </div>
            <ul className="divide-y divide-[var(--line)]">
              {CONTACTS.map((c) => (
                <li key={c.phoneHref} className="px-5 py-4">
                  <p className="font-display text-lg leading-tight font-light">{c.name}</p>
                  <p className="label mt-1 text-stone">{c.role}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={c.phoneHref}
                      className="label flex-1 border border-charcoal/15 px-3 py-2.5 text-center transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-paper"
                    >
                      {c.phoneDisplay}
                    </a>
                    <a
                      href={c.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label border border-charcoal/15 px-3 py-2.5 transition-colors duration-500 hover:border-terracotta hover:bg-terracotta hover:text-paper"
                    >
                      WhatsApp
                    </a>
                  </div>
                </li>
              ))}
              <li className="px-5 py-4">
                <a
                  href={EMAIL_HREF}
                  className="label flex items-center justify-between text-stone transition-colors duration-500 hover:text-charcoal"
                >
                  <span>{EMAIL}</span>
                  <span aria-hidden>→</span>
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {visible ? (
          <motion.button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="panel-consulta"
            className="group/f label pointer-events-auto flex items-center gap-3 bg-charcoal px-5 py-4 text-paper shadow-[0_18px_44px_-22px_rgba(27,25,23,0.65)] transition-colors duration-500 hover:bg-terracotta"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: reduced ? 0.15 : 0.7, ease: EASE }}
          >
            {open ? "Cerrar" : "Consultar"}
            <span aria-hidden className="relative block size-3.5">
              <span
                className={`absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-500 ${
                  open ? "rotate-45" : "rotate-0"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-500 ${
                  open ? "-rotate-45" : "rotate-90"
                }`}
              />
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
