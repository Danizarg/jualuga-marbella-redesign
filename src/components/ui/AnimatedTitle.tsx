interface AnimatedTitleProps {
  /** One string per visual line, so line breaks stay art-directed. */
  lines: string[];
  className?: string;
  /** Seconds before the first line starts. */
  delay?: number;
  as?: "h1" | "h2" | "p";
}

/**
 * Masked line-by-line reveal: each line sits in an overflow-hidden box and
 * rises into place, staggered.
 *
 * Deliberately CSS rather than Motion. A JS-driven version renders the server
 * markup with the lines translated out of their mask, which means the heading
 * is invisible until hydration — a blank hero on a slow connection, and a
 * permanently blank one if the bundle fails. The CSS version paints correctly
 * on the first frame and animates without JavaScript.
 *
 * Reduced motion is handled globally: the media query in globals.css collapses
 * the duration, and `animation-fill-mode: both` lands the text in its final
 * position immediately.
 */
export function AnimatedTitle({
  lines,
  className,
  delay = 0,
  as = "h1",
}: AnimatedTitleProps) {
  const Tag = as;

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line} className="line-mask">
          <span
            className="line-rise"
            style={{ animationDelay: `${delay + i * 0.16}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
