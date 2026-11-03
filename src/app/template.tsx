import type { ReactNode } from "react";

/**
 * Route-level entry transition. `template.tsx` remounts on every navigation,
 * which is what makes this fire per page rather than once per session.
 *
 * CSS rather than Motion, on purpose: a JS-driven wrapper renders the whole
 * page at opacity:0 in the server markup, so nothing is visible until
 * hydration finishes. This paints on the first frame and still animates.
 * Reduced motion is handled by the global media query in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
