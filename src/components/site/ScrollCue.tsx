"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Hairline scroll cue in the hero. It fades out as the visitor leaves the
 * first screen, so it never lingers over the content below.
 */
export function ScrollCue() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      // Kept to the right, clear of the title panel's buttons. The foot of
      // the photographic plate carries a gradient so it always reads.
      className="pointer-events-none absolute right-[var(--gutter)] bottom-16 z-10 hidden flex-col items-center gap-4 md:bottom-20 md:flex"
    >
      <span className="label [writing-mode:vertical-rl] text-paper/55">
        Desplazar
      </span>
      <span className="relative block h-16 w-px overflow-hidden bg-paper/25">
        <motion.span
          className="absolute inset-x-0 top-0 block h-1/2 bg-paper"
          animate={reduced ? undefined : { y: ["-100%", "200%"] }}
          transition={
            reduced
              ? undefined
              : { duration: 2.6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }
          }
        />
      </span>
    </motion.div>
  );
}
