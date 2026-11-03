"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";

import { HEADER_NAV } from "@/data/nav";
import { BRAND_NAME } from "@/data/site";

import { NavOverlay } from "./NavOverlay";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress, scrollY } = useScroll();
  // Spring-smoothed so the rule glides rather than tracking every wheel tick.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0008,
  });

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  // The home page opens on a full-bleed hero, so the header starts inverted
  // there and only picks up a background once it leaves the image.
  const overHero = pathname === "/" && !scrolled;

  return (
    <>
      <a
        href="#contenido"
        className="label fixed top-3 left-3 z-[120] -translate-y-24 bg-charcoal px-4 py-3 text-paper transition-transform duration-300 focus-visible:translate-y-0"
      >
        Saltar al contenido
      </a>

      <header
        className={[
          "fixed inset-x-0 top-0 z-[80] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          overHero
            ? "bg-transparent text-paper"
            : "bg-paper/88 text-charcoal backdrop-blur-md",
        ].join(" ")}
      >
        <div className="shell flex h-20 items-center justify-between md:h-24">
          <Link
            href="/"
            aria-label={`${BRAND_NAME} — inicio`}
            className="font-display text-xl leading-none tracking-[0.24em] md:text-2xl"
          >
            {BRAND_NAME}
          </Link>

          <nav aria-label="Navegación abreviada" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {HEADER_NAV.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group/h label relative py-2"
                    >
                      <span className={active ? "" : "opacity-70 transition-opacity duration-500 group-hover/h:opacity-100"}>
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className={[
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                          active ? "scale-x-100" : "scale-x-0 group-hover/h:scale-x-100",
                        ].join(" ")}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="group/m label flex items-center gap-3"
          >
            <span className="hidden sm:inline">Menú</span>
            <span aria-hidden className="relative block h-3 w-7">
              <span className="absolute top-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/m:translate-y-px motion-reduce:transition-none" />
              <span className="absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/m:-translate-y-px motion-reduce:transition-none" />
            </span>
          </button>
        </div>

        {/* Scroll-linked reading rule along the bottom edge of the header */}
        <div
          aria-hidden
          className={`relative h-px w-full ${overHero ? "bg-paper/15" : "bg-[var(--line)]"}`}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left bg-terracotta"
            style={{ scaleX: progress }}
          />
        </div>
      </header>

      <NavOverlay
        open={open}
        onClose={() => setOpen(false)}
        returnFocusTo={menuButtonRef}
        currentPath={pathname}
      />
    </>
  );
}
