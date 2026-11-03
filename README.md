# JULUGA — Marbella

Redesign of the website for **JULUGA** (legal entity **JUALUGA, SL**), a family
property company letting commercial units and apartments it owns in the Casco
Antiguo of Marbella.

Replaces the existing Webnode site at `jualuga.webnode.es`. Built as a separate
project: it touches nothing belonging to the old site and is not connected to
any production domain.

---

## ⚠️ One thing the client needs to confirm

The old site shows **two spellings**, and they are *not* a typo — the
"¿Quiénes somos?" page explains it:

> "Aunque el nombre comercial es JULUGA, la entidad JUALUGA SL es una empresa
> familiar creada en el año 2000…"

So:

| | |
|---|---|
| **JULUGA** | trading name — the nickname of founder Juan Luis Gámez, and the name of his first shop in Plaza de África |
| **JUALUGA, SL** | registered company, CIF B-92125665 |

This site uses **JULUGA** as the brand (header, nav, page titles) and
**JUALUGA, SL** in legal contexts (footer, company details). That matches the
company's own explanation.

**But the old site is inconsistent in practice**: its contact block and page
title both display "JUALUGA" as the brand name, while the logo reads "JULUGA",
and the domain is `jualuga`. Please confirm which should appear as the
public-facing brand. Changing it is a one-line edit in
[`src/data/site.ts`](src/data/site.ts).

---

## Content: what is real and what is not

**Nothing on this site is invented.** Every property, description, room list,
measurement and photograph comes from the client's own published pages.

- **7 properties**, all verified: 2 commercial locations, 4 apartments, 1
  building for sale. No demo or placeholder listings exist in the data.
- **No prices.** The original site publishes none, so none are stated. Every
  listing shows "Consultar". Add a real figure only when the client provides one.
- **No availability dates**, for the same reason.
- **68 photographs**, all the client's own, downloaded from their existing site.
  7 more were referenced by the old site but return HTTP 403 from its CDN — they
  appear to have been removed at source, and every property still has full
  photographic coverage without them.
- **Tenant names** (Baloo, Sam Newman, Fugaro, Cannabis Store Amsterdam, JLG)
  and the family history are reproduced from the client's own pages. Streets are
  given only where the original states one.
- **Map pins are approximate**, at street/square level, and the UI says so.

If a future listing is ever unconfirmed, set `verified: false` on it and the
site renders a visible "Ejemplo de concepto" flag.

---

## Editing the content

Almost everything lives in [`src/data/`](src/data/):

| File | What it holds |
|---|---|
| `properties.ts` | **The main one.** All listings, copy, features, galleries. |
| `site.ts` | Brand and legal names, phone numbers, email, address. |
| `locations.ts` | The three locations and their map coordinates. |
| `businesses.ts` | Tenants shown under "Negocios instalados". |
| `history.ts` | Company timeline and the current project. |
| `nav.ts` | Navigation structure. |
| `image-dimensions.ts` | **Generated — do not edit.** |

### Adding a property

Append an object to `PROPERTIES` in `properties.ts`. The `slug` becomes the URL
at `/propiedades/<slug>`; everything else (listing pages, filters, sitemap,
structured data) picks it up automatically.

### Adding photographs

1. Drop the files into `public/img/<property-folder>/`.
2. Run `npm run measure:images` to regenerate `image-dimensions.ts`.
3. Reference them in the property's `gallery` with a `src` and a Spanish `alt`.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

---

## Technical notes

**Stack** — Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind
CSS v4, Motion, Leaflet. All 23 routes are statically prerendered.

**A note on the photography.** The source images are modest resolution — the
largest is 1280×960 and many are 640×480. That shaped several decisions:

- The home hero is a **split composition** rather than a full-bleed image.
  The best architectural photograph is portrait (720×960); stretching it across
  a desktop hero would be a 2.2× upscale and visibly soft. It sits as a
  full-height plate beside the title instead, and goes full-bleed on phones
  where the viewport is itself portrait.
- A **film-grain layer** sits over photography. It gives the images a printed,
  archival character rather than letting them read as soft upscales.
- The lightbox caps enlargement at **1.6× native** so images never go mushy.
- `next.config.ts` caps `deviceSizes` so the optimiser is never asked for a
  size the source cannot support.

**Entrance and scroll animations are CSS, not JavaScript.** An earlier
JS-driven version rendered the server markup at `opacity: 0`, so the page was
blank until Motion hydrated — and would have stayed blank if the bundle failed.
Reveals now use the CSS `view()` scroll timeline; browsers without support show
the content immediately, unanimated. Motion is still used for the things that
genuinely need state: the nav overlay, the filter transitions and the lightbox.

**Reduced motion** is honoured throughout, via a global media query plus
per-component handling. Nothing is ever left invisible by it.

**The map** uses OpenStreetMap tiles, recoloured with a CSS filter to sit in the
site palette. CARTO's free basemap — the usual choice for a light style — now
returns "API KEY REQUIRED" watermarks, so it is not used. To move to a keyed
provider (Stadia, MapTiler, Thunderforest) set these in the Vercel project; no
code change is needed:

```
NEXT_PUBLIC_MAP_TILE_URL
NEXT_PUBLIC_MAP_TILE_ATTRIBUTION
```

**The contact form has no backend.** Rather than pretend to send a message, it
composes one and hands it to the visitor's mail client, which is stated plainly
next to the button. Phone and WhatsApp links sit alongside it. If the client
wants real form submissions, that needs a mail service (Resend, Formspree) and
an API route.

**SEO** — per-page metadata and canonicals, Spanish locale, `RealEstateAgent`
and per-property structured data, breadcrumbs, generated `sitemap.xml` and
`robots.txt`, and local Marbella keywords. No prices are asserted in structured
data, since none are published.

**Accessibility** — one `h1` per page with no heading-level jumps, alt text on
every image, labelled form controls, focus traps and Escape handling on the nav
overlay and lightbox, focus restoration, a skip link, and visible focus rings.

---

© JUALUGA, SL (B-92125665). Photography and copy belong to the client.
