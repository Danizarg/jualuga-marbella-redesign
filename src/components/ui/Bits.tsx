import Link from "next/link";
import type { ReactNode } from "react";

/** Wide-tracked uppercase label with an optional index, e.g. "01 — Cartera". */
export function SectionLabel({
  children,
  index,
  className = "",
  tone = "ink",
}: {
  children: ReactNode;
  index?: string;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const colour = tone === "paper" ? "text-paper/70" : "text-stone";
  return (
    <p className={`label flex items-center gap-3 ${colour} ${className}`}>
      {index ? (
        <>
          <span className={tone === "paper" ? "text-paper/50" : "text-terracotta"}>
            {index}
          </span>
          <span
            aria-hidden
            className={`h-px w-8 ${tone === "paper" ? "bg-paper/30" : "bg-sand-deep"}`}
          />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

/** Text link with a rule that draws itself in on hover. */
export function ArrowLink({
  href,
  children,
  className = "",
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const base =
    tone === "paper"
      ? "text-paper decoration-paper/30"
      : "text-charcoal decoration-sand-deep";
  return (
    <Link
      href={href}
      className={`group/link label inline-flex items-center gap-3 ${base} ${className}`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-x-100 motion-reduce:transition-none ${
            tone === "paper" ? "bg-paper" : "bg-terracotta"
          }`}
        />
      </span>
      <svg
        aria-hidden
        viewBox="0 0 24 10"
        className="h-[0.5rem] w-6 overflow-visible transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1.5 motion-reduce:transition-none"
        fill="none"
      >
        <path d="M0 5h22M17.5 0.5 22 5l-4.5 4.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    </Link>
  );
}

/** Thin sand rule used between editorial blocks. */
export function Hairline({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-[var(--line)] ${className}`} />;
}

/** Flag for any listing not yet confirmed by the client. */
export function ConceptFlag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`label inline-flex items-center gap-2 border border-terracotta/40 bg-terracotta/5 px-2.5 py-1.5 text-terracotta ${className}`}
    >
      <span aria-hidden className="size-1 rounded-full bg-terracotta" />
      Ejemplo de concepto
    </span>
  );
}
