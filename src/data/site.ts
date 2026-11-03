/**
 * Company identity and contact details.
 *
 * Every value here is taken verbatim from the client's existing website
 * (jualuga.webnode.es). See NAMING below for the JULUGA / JUALUGA question.
 */

/**
 * NAMING — resolved from the client's own "¿Quiénes somos?" page, which states:
 *
 *   "Aunque el nombre comercial es JULUGA, la entidad JUALUGA SL es una
 *    empresa familiar creada en el año 2000..."
 *
 * So the two spellings are not a mistake: JULUGA is the trading name (it is
 * the nickname of founder Juan Luis Gámez and the name of his first shop in
 * Plaza de África), and JUALUGA, SL is the registered company. This site uses
 * JULUGA as the brand and JUALUGA, SL in legal contexts.
 *
 * → Still worth a one-line confirmation from the client, because the old site
 *   also used "JUALUGA" as the display name in its contact block.
 */
export const BRAND_NAME = "JULUGA";
export const LEGAL_NAME = "JUALUGA, SL";
export const TAX_ID = "B-92125665";
export const FOUNDED_YEAR = 2000;

export interface ContactPerson {
  name: string;
  role: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
}

export const CONTACTS: ContactPerson[] = [
  {
    name: "Juan Luis Gámez",
    role: "Gerencia",
    phoneDisplay: "616 31 29 30",
    phoneHref: "tel:+34616312930",
    whatsappHref: "https://wa.me/34616312930",
  },
  {
    name: "Ibón Gámez",
    role: "Gestión",
    phoneDisplay: "636 36 27 14",
    phoneHref: "tel:+34636362714",
    whatsappHref: "https://wa.me/34636362714",
  },
];

export const EMAIL = "info@juanluisgamez.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const ADDRESS = {
  locality: "Marbella",
  region: "Málaga",
  postalCode: "29601",
  country: "ES",
  countryName: "España",
  area: "Casco Antiguo",
} as const;

/** Approximate centre of Marbella's Casco Antiguo, used to frame the map. */
export const OLD_TOWN_CENTRE = { lat: 36.5097, lng: -4.8856 } as const;

export const SITE_URL = "https://jualuga-marbella-redesign.vercel.app";

export const TAGLINE = "Espacios únicos en el corazón de Marbella.";

export const SHORT_DESCRIPTION =
  "Empresa familiar de arrendamiento de locales comerciales y apartamentos en propiedad, todos en el Casco Antiguo de Marbella.";
