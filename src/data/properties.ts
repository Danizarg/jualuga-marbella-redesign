/**
 * ============================================================================
 * PROPERTY DATA — the single file to edit when listings change.
 * ============================================================================
 *
 * PROVENANCE
 * Every property, description, room list and photograph below is taken from
 * the client's own published website (jualuga.webnode.es), page by page.
 * Nothing is invented: there are no demo listings in this file.
 *
 * PRICES
 * The original site publishes no prices or availability dates for any
 * property, so none are stated here. `priceNote` renders as "Consultar".
 * Add a `price` field only when the client supplies real figures.
 *
 * PHOTOGRAPHY
 * All images are the client's own, downloaded from their existing site.
 * Intrinsic sizes live in the generated `image-dimensions.ts` — run
 * `npm run measure:images` after adding new photographs.
 *
 * TO ADD A PROPERTY
 * Append an object to PROPERTIES. `slug` becomes the URL at
 * /propiedades/<slug>. Set `verified: false` on anything not yet confirmed by
 * the client and it renders with a visible "Ejemplo de concepto" flag.
 */

import type { LocationId } from "./locations";

/** Rent, sale, or both. Drives the En alquiler / En venta filtering. */
export type Tenure = "alquiler" | "venta";

export type PropertyKind = "local-comercial" | "apartamento" | "inmueble";

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface PropertyFact {
  label: string;
  value: string;
}

export interface Property {
  slug: string;
  /** Editorial index shown as 01, 02 … Purely a display device. */
  index: string;
  title: string;
  /** Short qualifier under the title, e.g. "Plaza de la Victoria". */
  kicker: string;
  kind: PropertyKind;
  tenure: Tenure[];
  location: LocationId;
  /** One sentence for cards and meta descriptions. */
  summary: string;
  /** Body copy, one string per paragraph. */
  description: string[];
  /** Rooms and attributes, only those the client states. */
  features: string[];
  /** Key/value pairs for the detail page spec table. */
  facts: PropertyFact[];
  cover: PropertyImage;
  gallery: PropertyImage[];
  /** false → renders a visible "concept example" flag. */
  verified: boolean;
  priceNote: string;
}

export const KIND_LABELS: Record<PropertyKind, string> = {
  "local-comercial": "Local comercial",
  apartamento: "Apartamento",
  inmueble: "Inmueble",
};

export const TENURE_LABELS: Record<Tenure, string> = {
  alquiler: "En alquiler",
  venta: "En venta",
};

const CONSULTAR = "Consultar";

export const PROPERTIES: Property[] = [
  // ───────────────────────────────────────────────── locales comerciales ───
  {
    slug: "locales-comerciales-plaza-de-la-victoria",
    index: "01",
    title: "Locales comerciales",
    kicker: "Plaza de la Victoria",
    kind: "local-comercial",
    tenure: ["alquiler"],
    location: "plaza-de-la-victoria",
    summary:
      "Locales comerciales en el mejor emplazamiento dentro del Casco Antiguo de Marbella.",
    description: [
      "Locales comerciales en el mejor emplazamiento dentro del Casco Antiguo de Marbella, sobre la Plaza de la Victoria: centro neurálgico de la ciudad y plaza peatonal.",
      "Situados en obligado punto de paso de miles de personas diariamente, en una zona comercial con el mejor potencial y una oferta comercial inigualable.",
      "Ofrecemos el mejor emplazamiento y situación para que su negocio pueda ser punto de referencia dentro del tejido comercial de una ciudad como Marbella.",
    ],
    features: [
      "Plaza peatonal",
      "Centro neurálgico del Casco Antiguo",
      "Punto de paso diario de miles de personas",
      "Entorno comercial consolidado",
    ],
    facts: [
      { label: "Operación", value: "Alquiler" },
      { label: "Ubicación", value: "Plaza de la Victoria, Casco Antiguo" },
      { label: "Tipología", value: "Local comercial" },
      { label: "Precio", value: CONSULTAR },
    ],
    cover: {
      src: "/img/locales-plaza-victoria/locales-comerciales-plaza-de-la-victoria.jpg",
      alt: "Locales comerciales de JULUGA en la Plaza de la Victoria, Casco Antiguo de Marbella",
    },
    gallery: [
      {
        src: "/img/locales-plaza-victoria/locales-comerciales-plaza-de-la-victoria.jpg",
        alt: "Locales comerciales de JULUGA en la Plaza de la Victoria",
      },
      {
        src: "/img/locales-plaza-victoria/edificio-plaza-de-la-victoria.jpg",
        alt: "Edificio de JULUGA en la Plaza de la Victoria",
      },
      {
        src: "/img/locales-plaza-victoria/plaza-victoria-junio-2020-2.jpg",
        alt: "La Plaza de la Victoria, plaza peatonal del Casco Antiguo de Marbella",
      },
      {
        src: "/img/locales-plaza-victoria/sam-newman-foto-web-3.jpg",
        alt: "Local comercial en la Plaza de la Victoria ocupado por la tienda Sam Newman",
      },
      {
        src: "/img/locales-plaza-victoria/plaza-de-la-victoria.jpg",
        alt: "Vista de la Plaza de la Victoria",
      },
      {
        src: "/img/locales-plaza-victoria/plaza-de-la-victoria-2.png",
        alt: "Vista de la Plaza de la Victoria desde la calle",
      },
    ],
    verified: true,
    priceNote: CONSULTAR,
  },
  {
    slug: "locales-comerciales-calle-padre-francisco-echamendi",
    index: "02",
    title: "Locales comerciales",
    kicker: "Calle Padre Francisco Echamendi",
    kind: "local-comercial",
    tenure: ["alquiler"],
    location: "calle-padre-francisco-echamendi",
    summary:
      "Locales comerciales situados en otro de los puntos de referencia comercial en el Casco Antiguo de Marbella.",
    description: [
      "Locales comerciales situados en otro de los puntos de referencia comercial en el Casco Antiguo de Marbella: la Calle Padre Francisco Echamendi.",
      "Locales en obligado punto de paso, dentro de una zona comercial con el mejor potencial y una oferta comercial inigualable.",
    ],
    features: [
      "Punto de referencia comercial del Casco Antiguo",
      "Zona de paso",
      "Entorno comercial consolidado",
    ],
    facts: [
      { label: "Operación", value: "Alquiler" },
      {
        label: "Ubicación",
        value: "Calle Padre Francisco Echamendi, Casco Antiguo",
      },
      { label: "Tipología", value: "Local comercial" },
      { label: "Precio", value: CONSULTAR },
    ],
    cover: {
      src: "/img/locales-echamendi/calle-padre-fco-ecchamendi-foto-2.jpg",
      alt: "Locales comerciales de JULUGA en la Calle Padre Francisco Echamendi, Marbella",
    },
    gallery: [
      {
        src: "/img/locales-echamendi/calle-padre-fco-ecchamendi-foto-2.jpg",
        alt: "Calle Padre Francisco Echamendi, Casco Antiguo de Marbella",
      },
      {
        src: "/img/locales-echamendi/cannabis-store-amsterdam-marbella.jpg",
        alt: "Local comercial en la Calle Padre Francisco Echamendi",
      },
      {
        src: "/img/locales-echamendi/cannabis-store-amsterdam-1.jpg",
        alt: "Fachada de un local comercial en la Calle Padre Francisco Echamendi",
      },
      {
        src: "/img/locales-echamendi/jlg-en-calle-padre-fco-echamendi.jpg",
        alt: "Local comercial en la Calle Padre Francisco Echamendi",
      },
    ],
    verified: true,
    priceNote: CONSULTAR,
  },

  // ────────────────────────────────────────────────────────── apartamentos ───
  {
    slug: "apartamento-1-dormitorio-planta-primera",
    index: "03",
    title: "Apartamento nº 1",
    kicker: "Un dormitorio · Planta 1ª",
    kind: "apartamento",
    tenure: ["alquiler"],
    location: "plaza-de-la-victoria",
    summary:
      "Coqueto apartamento de un dormitorio, recientemente reformado y amueblado, con vistas a la Plaza de la Victoria.",
    description: [
      "Confortable y coqueto apartamento en planta 1ª que consta de salón, cocina, dormitorio y cuarto de baño. Recientemente reformado y amueblado.",
      "Totalmente amueblado y equipado para entrar a residir, con vistas a la Plaza de la Victoria (peatonal).",
      "Edificio familiar que consta únicamente de 5 viviendas, en zona peatonal y muy tranquila, pero situado en la mejor ubicación del Casco Antiguo de Marbella.",
    ],
    features: [
      "Salón",
      "Cocina",
      "Dormitorio",
      "Cuarto de baño",
      "Recientemente reformado",
      "Totalmente amueblado y equipado",
      "Vistas a la Plaza de la Victoria",
    ],
    facts: [
      { label: "Operación", value: "Alquiler" },
      { label: "Dormitorios", value: "1" },
      { label: "Baños", value: "1" },
      { label: "Planta", value: "1ª" },
      { label: "Edificio", value: "Sólo 5 viviendas" },
      { label: "Precio", value: CONSULTAR },
    ],
    cover: {
      src: "/img/apartamento-1/salon.jpg",
      alt: "Salón del apartamento nº 1 de JULUGA en la Plaza de la Victoria",
    },
    gallery: [
      { src: "/img/apartamento-1/salon.jpg", alt: "Salón del apartamento nº 1" },
      { src: "/img/apartamento-1/img-3655.jpg", alt: "Interior del apartamento nº 1" },
      { src: "/img/apartamento-1/img-3656.jpg", alt: "Interior del apartamento nº 1" },
      { src: "/img/apartamento-1/dormitorio.jpg", alt: "Dormitorio del apartamento nº 1" },
      { src: "/img/apartamento-1/img-3654.jpg", alt: "Interior del apartamento nº 1" },
      { src: "/img/apartamento-1/cocina-apto-1.jpg", alt: "Cocina del apartamento nº 1" },
      {
        src: "/img/apartamento-1/cuarto-de-bano.jpg",
        alt: "Cuarto de baño del apartamento nº 1",
      },
      { src: "/img/apartamento-1/entrada.jpg", alt: "Entrada del apartamento nº 1" },
      { src: "/img/apartamento-1/img-3652.jpg", alt: "Interior del apartamento nº 1" },
      {
        src: "/img/apartamento-1/vistas-a-calle.jpg",
        alt: "Vistas desde el apartamento nº 1 a la Plaza de la Victoria",
      },
    ],
    verified: true,
    priceNote: CONSULTAR,
  },
  {
    slug: "apartamento-3-dormitorio-planta-segunda",
    index: "04",
    title: "Apartamento nº 3",
    kicker: "Un dormitorio · Planta 2ª",
    kind: "apartamento",
    tenure: ["alquiler"],
    location: "plaza-de-la-victoria",
    summary:
      "Confortable apartamento de un dormitorio en planta 2ª, amueblado y equipado, con vistas a la Plaza de la Victoria.",
    description: [
      "Confortable y coqueto apartamento en planta 2ª que consta de salón, cocina, dormitorio y cuarto de baño.",
      "Totalmente amueblado y equipado para entrar a residir, con vistas a la Plaza de la Victoria (peatonal).",
      "Tranquilo edificio con sólo 5 viviendas, en pleno Casco Antiguo de Marbella.",
    ],
    features: [
      "Salón",
      "Cocina",
      "Dormitorio",
      "Cuarto de baño",
      "Totalmente amueblado y equipado",
      "Vistas a la Plaza de la Victoria",
    ],
    facts: [
      { label: "Operación", value: "Alquiler" },
      { label: "Dormitorios", value: "1" },
      { label: "Baños", value: "1" },
      { label: "Planta", value: "2ª" },
      { label: "Edificio", value: "Sólo 5 viviendas" },
      { label: "Precio", value: CONSULTAR },
    ],
    cover: {
      src: "/img/apartamento-3/apto-3-salon.jpg",
      alt: "Salón del apartamento nº 3 de JULUGA en la Plaza de la Victoria",
    },
    gallery: [
      { src: "/img/apartamento-3/apto-3-salon.jpg", alt: "Salón del apartamento nº 3" },
      {
        src: "/img/apartamento-3/apto-3-salon-2.jpg",
        alt: "Salón del apartamento nº 3, segunda vista",
      },
      {
        src: "/img/apartamento-3/apto-3-dormitorio.jpg",
        alt: "Dormitorio del apartamento nº 3",
      },
      { src: "/img/apartamento-3/apto-3-cocina.jpg", alt: "Cocina del apartamento nº 3" },
      {
        src: "/img/apartamento-3/apto-3-cocina-2.jpg",
        alt: "Cocina del apartamento nº 3, segunda vista",
      },
      { src: "/img/apartamento-3/apto-3-bano.jpg", alt: "Cuarto de baño del apartamento nº 3" },
      {
        src: "/img/apartamento-3/apto-3-bano-2.jpg",
        alt: "Cuarto de baño del apartamento nº 3, segunda vista",
      },
    ],
    verified: true,
    priceNote: CONSULTAR,
  },
  {
    slug: "apartamento-dos-dormitorios",
    index: "05",
    title: "Apartamento de dos dormitorios",
    kicker: "Dos dormitorios · Patio interior",
    kind: "apartamento",
    tenure: ["alquiler"],
    location: "plaza-de-la-victoria",
    summary:
      "Apartamento de dos dormitorios con patio interior privado y salón con vistas a la Plaza de la Victoria.",
    description: [
      "Confortable y coqueto apartamento que consta de salón, cocina, dos dormitorios, cuarto de baño y patio interior. Totalmente amueblado y equipado para entrar a residir.",
      "El salón tiene vistas a la Plaza de la Victoria (peatonal), y los dormitorios vistas a patio interior privado.",
      "Tranquilo edificio con sólo 5 viviendas, en pleno Casco Antiguo de Marbella.",
    ],
    features: [
      "Salón con vistas a la plaza",
      "Cocina",
      "Dos dormitorios",
      "Cuarto de baño",
      "Patio interior privado",
      "Totalmente amueblado y equipado",
    ],
    facts: [
      { label: "Operación", value: "Alquiler" },
      { label: "Dormitorios", value: "2" },
      { label: "Baños", value: "1" },
      { label: "Exterior", value: "Patio interior privado" },
      { label: "Edificio", value: "Sólo 5 viviendas" },
      { label: "Precio", value: CONSULTAR },
    ],
    cover: {
      src: "/img/apartamento-2-dormitorios/img-4786.jpg",
      alt: "Apartamento de dos dormitorios de JULUGA en la Plaza de la Victoria",
    },
    gallery: [
      {
        src: "/img/apartamento-2-dormitorios/img-4786.jpg",
        alt: "Apartamento de dos dormitorios en la Plaza de la Victoria",
      },
      {
        src: "/img/apartamento-2-dormitorios/img-4813.jpg",
        alt: "Apartamento de dos dormitorios, segunda vista",
      },
      {
        src: "/img/apartamento-2-dormitorios/dormitorio-1-fondo.jpg",
        alt: "Primer dormitorio del apartamento de dos dormitorios",
      },
      {
        src: "/img/apartamento-2-dormitorios/dormitorio-1-fondo-foto-2.jpg",
        alt: "Primer dormitorio, segunda vista",
      },
      {
        src: "/img/apartamento-2-dormitorios/dormitorio-2-apto-4.jpg",
        alt: "Segundo dormitorio del apartamento de dos dormitorios",
      },
      {
        src: "/img/apartamento-2-dormitorios/dormitorio-2-apto-4-foto-2.jpg",
        alt: "Segundo dormitorio, segunda vista",
      },
      {
        src: "/img/apartamento-2-dormitorios/cocina-apto-4.jpg",
        alt: "Cocina del apartamento de dos dormitorios",
      },
      {
        src: "/img/apartamento-2-dormitorios/bano-apto-4-con-mampara-nueva.jpg",
        alt: "Cuarto de baño del apartamento de dos dormitorios",
      },
    ],
    verified: true,
    priceNote: CONSULTAR,
  },
  {
    slug: "atico-plaza-de-la-victoria",
    index: "06",
    title: "Ático",
    kicker: "Un dormitorio · Terraza",
    kind: "apartamento",
    tenure: ["alquiler"],
    location: "plaza-de-la-victoria",
    summary:
      "Apartamento-ático con terraza propia y vistas a la Plaza de la Victoria, amueblado y equipado.",
    description: [
      "Confortable y coqueto apartamento-ático que consta de salón, cocina, dormitorio, cuarto de baño y terraza. Totalmente amueblado y equipado para entrar a residir.",
      "Con vistas a la Plaza de la Victoria (peatonal).",
      "Tranquilo edificio con sólo 5 viviendas, en pleno Casco Antiguo de Marbella.",
    ],
    features: [
      "Salón",
      "Cocina",
      "Dormitorio",
      "Cuarto de baño",
      "Terraza",
      "Totalmente amueblado y equipado",
      "Vistas a la Plaza de la Victoria",
    ],
    facts: [
      { label: "Operación", value: "Alquiler" },
      { label: "Dormitorios", value: "1" },
      { label: "Baños", value: "1" },
      { label: "Planta", value: "Ático" },
      { label: "Exterior", value: "Terraza" },
      { label: "Precio", value: CONSULTAR },
    ],
    cover: {
      src: "/img/atico/terraza-foto-1.jpg",
      alt: "Terraza del ático de JULUGA en la Plaza de la Victoria, Marbella",
    },
    gallery: [
      { src: "/img/atico/terraza-foto-1.jpg", alt: "Terraza del ático" },
      { src: "/img/atico/terraza-foto-2.jpg", alt: "Terraza del ático, segunda vista" },
      { src: "/img/atico/salon-foto-1.jpg", alt: "Salón del ático" },
      { src: "/img/atico/salon-foto-2.jpg", alt: "Salón del ático, segunda vista" },
      { src: "/img/atico/dormitorio-foto-1.jpg", alt: "Dormitorio del ático" },
      { src: "/img/atico/dormitorio-foto-2.jpg", alt: "Dormitorio del ático, segunda vista" },
      { src: "/img/atico/bano-atico.jpg", alt: "Cuarto de baño del ático" },
    ],
    verified: true,
    priceNote: CONSULTAR,
  },

  // ─────────────────────────────────────────────────────────────── en venta ───
  {
    slug: "inmueble-en-venta-casco-antiguo",
    index: "07",
    title: "Inmueble en el Casco Antiguo",
    kicker: "En venta · Parcela de 80 m²",
    kind: "inmueble",
    tenure: ["venta"],
    location: "casco-antiguo",
    summary:
      "Excelente inversión para la construcción y promoción de hasta 5 viviendas de diversa tipología, a 100 m de la Plaza de los Naranjos.",
    description: [
      "Inmueble en el Casco Antiguo de Marbella: excelente inversión para la construcción y promoción de hasta 5 viviendas de diversa tipología. Parcela de 80 m², de forma triangular.",
      "Actualmente planta baja + 1, con posibilidad de elevar 2ª planta y ático (retranqueado).",
      "Orientación sur, muy luminoso, a escasos 100 m de la Plaza de los Naranjos, en calle peatonal y muy tranquila.",
    ],
    features: [
      "Parcela de 80 m² de forma triangular",
      "Actualmente planta baja + 1",
      "Posibilidad de elevar 2ª planta y ático retranqueado",
      "Hasta 5 viviendas de diversa tipología",
      "Orientación sur, muy luminoso",
      "A 100 m de la Plaza de los Naranjos",
      "Calle peatonal y muy tranquila",
    ],
    facts: [
      { label: "Operación", value: "Venta" },
      { label: "Parcela", value: "80 m², triangular" },
      { label: "Edificabilidad actual", value: "Planta baja + 1" },
      { label: "Potencial", value: "Hasta 5 viviendas" },
      { label: "Orientación", value: "Sur" },
      { label: "Precio", value: CONSULTAR },
    ],
    cover: {
      src: "/img/en-venta/fachada-luz-manana-11-30am.jpg",
      alt: "Fachada del inmueble en venta en el Casco Antiguo de Marbella con luz de mañana",
    },
    gallery: [
      {
        src: "/img/en-venta/fachada-luz-manana-11-30am.jpg",
        alt: "Fachada del inmueble en venta con luz de mañana",
      },
      {
        src: "/img/en-venta/estado-actual-1.jpg",
        alt: "Estado actual del interior del inmueble en venta",
      },
      {
        src: "/img/en-venta/estado-actual-2.jpg",
        alt: "Estado actual del interior del inmueble en venta, segunda vista",
      },
    ],
    verified: true,
    priceNote: CONSULTAR,
  },
];

/**
 * Possible distribution of the plot above, as published by the client.
 * Rendered as a table on that property page.
 */
export const EN_VENTA_DISTRIBUTION: { floor: string; use: string }[] = [
  {
    floor: "Planta baja",
    use: "Apartamento de 2 habitaciones o bien local comercial",
  },
  { floor: "1ª planta", use: "Estudio y un apartamento de 1 habitación" },
  {
    floor: "2ª planta",
    use: "Apartamento de 1 habitación y planta baja de dúplex",
  },
  {
    floor: "Ático",
    use: "Dos habitaciones y baño del dúplex (en la planta inferior dispondría de cocina y salón)",
  },
];

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function propertiesByKind(kind: PropertyKind): Property[] {
  return PROPERTIES.filter((p) => p.kind === kind);
}

export function propertiesByTenure(tenure: Tenure): Property[] {
  return PROPERTIES.filter((p) => p.tenure.includes(tenure));
}

export function propertiesByLocation(id: LocationId): Property[] {
  return PROPERTIES.filter((p) => p.location === id);
}
