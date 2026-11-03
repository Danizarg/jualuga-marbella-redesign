import type { CSSProperties, ReactNode } from "react";

type Direction = "up" | "none" | "left";

interface RevealProps {
  children: ReactNode;
  /**
   * Stagger hint, in the same seconds-ish units the old JS version used.
   * Translated into a later start on the scroll timeline rather than a
   * wall-clock delay, since scroll-driven animations have no notion of time.
   */
  delay?: number;
  direction?: Direction;
  className?: string;
  /** Finishes later in the entry range, for large architectural imagery. */
  slow?: boolean;
  as?: "div" | "section" | "li" | "article" | "header" | "figure" | "ol";
}

const CLASS: Record<Direction, string> = {
  up: "reveal-up",
  left: "reveal-left",
  none: "reveal-fade",
};

/**
 * Scroll-triggered reveal.
 *
 * Pure CSS (see the reveal-* utilities in globals.css). This used to be a
 * Motion `whileInView`, which rendered the server markup at opacity 0 and left
 * every section blank until hydration. The CSS view() timeline paints the
 * correct state on the first frame, animates without JavaScript, and keeps
 * this off the client bundle entirely.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  slow = false,
  as: Tag = "div",
}: RevealProps) {
  // Each 0.1 of "delay" pushes the start ~7% later into the entry range.
  const from = Math.min(Math.round(delay * 70), 34);
  const to = Math.min(from + (slow ? 72 : 58), 100);

  const style = {
    "--reveal-from": `${from}%`,
    "--reveal-to": `${to}%`,
  } as CSSProperties;

  return (
    <Tag className={`${CLASS[direction]} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
