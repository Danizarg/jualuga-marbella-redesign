"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { PropertyImage } from "@/data/properties";
import { BLUR_SAND, resolveImages } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Column spans that cycle to give the grid a magazine rhythm. */
const SPANS = [7, 5, 5, 7, 12];

const SPAN_CLASS: Record<number, string> = {
  5: "md:col-span-5",
  7: "md:col-span-7",
  12: "md:col-span-12",
};

export function Gallery({
  images,
  title,
}: {
  images: PropertyImage[];
  title: string;
}) {
  const resolved = resolveImages(images);
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + resolved.length) % resolved.length;
      });
    },
    [resolved.length],
  );

  const isOpen = openIndex !== null;

  // Remember which thumbnail opened the lightbox so focus can go back to it.
  useEffect(() => {
    if (openIndex !== null) lastOpened.current = openIndex;
  }, [openIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (lastOpened.current !== null) {
        triggers.current[lastOpened.current]?.focus();
        lastOpened.current = null;
      }
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  const current = openIndex !== null ? resolved[openIndex] : null;

  // The page-transition wrapper animates `transform`, which creates a
  // stacking context: a `fixed` overlay rendered inside it is positioned
  // against that wrapper rather than the viewport, and its z-index cannot
  // out-rank the header. The lightbox therefore goes straight to <body>.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
        {resolved.map((image, i) => {
          const span = SPANS[i % SPANS.length];
          const portrait = image.height > image.width;
          return (
            <li key={`${image.src}-${i}`} className={SPAN_CLASS[span]}>
              {/* CSS reveal, so thumbnails are never blank pre-hydration */}
              <div
                className="reveal-up"
                style={
                  {
                    "--reveal-from": `${(i % 3) * 8}%`,
                    "--reveal-to": `${(i % 3) * 8 + 58}%`,
                  } as React.CSSProperties
                }
              >
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group grain relative block w-full cursor-zoom-in overflow-hidden bg-sand"
                  style={{
                    aspectRatio: span === 12 ? "16 / 9" : portrait ? "4 / 5" : "4 / 3",
                  }}
                  aria-label={`Ampliar imagen ${i + 1} de ${resolved.length}: ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={
                      span === 12
                        ? "(min-width: 768px) 92vw, 94vw"
                        : "(min-width: 768px) 46vw, 94vw"
                    }
                    quality={88}
                    placeholder="blur"
                    blurDataURL={BLUR_SAND}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/10"
                  />
                  <span
                    aria-hidden
                    className="label pointer-events-none absolute bottom-3 left-3 translate-y-2 text-paper opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {isOpen && current ? (
                <motion.div
                  ref={dialogRef}
                  role="dialog"
            aria-modal="true"
            aria-label={`Galería de ${title}`}
            className="fixed inset-0 z-[100] flex flex-col bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-[var(--gutter)] md:h-20">
              <p className="label text-paper/60">
                <span className="text-paper">
                  {String(openIndex + 1).padStart(2, "0")}
                </span>
                {" / "}
                {String(resolved.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={close}
                className="label flex items-center gap-3 text-paper/70 transition-colors duration-500 hover:text-paper"
              >
                Cerrar
                <span aria-hidden className="relative block size-4">
                  <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                  <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-[var(--gutter)] pb-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.src}
                  className="relative flex h-full w-full items-center justify-center"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.995 }}
                  transition={{ duration: reduced ? 0.12 : 0.55, ease: EASE }}
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    width={current.width}
                    height={current.height}
                    sizes="92vw"
                    quality={92}
                    priority
                    className="max-h-full w-auto object-contain"
                    // The originals are small (many are 640x480). Let them
                    // grow to fill the frame, but never past 1.6x native,
                    // beyond which the softness starts to show.
                    style={{
                      maxWidth: `min(100%, ${Math.round(current.width * 1.6)}px)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-6 px-[var(--gutter)] pb-6">
              <p className="max-w-xl text-[0.8125rem] leading-relaxed font-light text-paper/60">
                {current.alt}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="label border border-paper/25 px-4 py-3 text-paper/80 transition-colors duration-500 hover:border-paper hover:text-paper"
                  aria-label="Imagen anterior"
                >
                  <svg aria-hidden viewBox="0 0 24 10" className="h-2 w-5 rotate-180" fill="none">
                    <path d="M0 5h22M17.5 0.5 22 5l-4.5 4.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="label border border-paper/25 px-4 py-3 text-paper/80 transition-colors duration-500 hover:border-paper hover:text-paper"
                  aria-label="Imagen siguiente"
                >
                  <svg aria-hidden viewBox="0 0 24 10" className="h-2 w-5" fill="none">
                    <path d="M0 5h22M17.5 0.5 22 5l-4.5 4.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </div>
            </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
