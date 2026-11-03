import type { Metadata } from "next";

import {
  ADDRESS,
  BRAND_NAME,
  EMAIL,
  CONTACTS,
  LEGAL_NAME,
  OLD_TOWN_CENTRE,
  SITE_URL,
  SHORT_DESCRIPTION,
} from "@/data/site";
import { LOCATIONS } from "@/data/locations";
import { KIND_LABELS, PROPERTIES, type Property } from "@/data/properties";

const SUFFIX = `${BRAND_NAME} · Casco Antiguo de Marbella`;

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? "/img/locales-plaza-victoria/locales-comerciales-plaza-de-la-victoria.jpg";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${SUFFIX}`,
      description,
      url,
      siteName: BRAND_NAME,
      locale: "es_ES",
      type: "website",
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SUFFIX}`,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Organisation-level structured data. Modelled as RealEstateAgent because the
 * business lets its own property portfolio — the closest accurate schema.org
 * type. No aggregate ratings or prices are asserted, since none are published.
 */
export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organisation`,
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    description: SHORT_DESCRIPTION,
    url: SITE_URL,
    email: EMAIL,
    telephone: CONTACTS.map((c) => c.phoneHref.replace("tel:", "")),
    foundingDate: "2000",
    areaServed: {
      "@type": "Place",
      name: "Casco Antiguo de Marbella",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OLD_TOWN_CENTRE.lat,
      longitude: OLD_TOWN_CENTRE.lng,
    },
    knowsLanguage: ["es-ES"],
    makesOffer: PROPERTIES.map((p) => ({
      "@type": "Offer",
      name: `${p.title} — ${p.kicker}`,
      url: `${SITE_URL}/propiedades/${p.slug}`,
      availability: "https://schema.org/InStock",
      // No price is published by the client, so none is asserted here.
      businessFunction: p.tenure.includes("venta")
        ? "https://schema.org/Sell"
        : "https://schema.org/LeaseOut",
    })),
  };
}

export function propertyJsonLd(property: Property) {
  const location = LOCATIONS.find((l) => l.id === property.location);
  return {
    "@context": "https://schema.org",
    "@type": property.kind === "local-comercial" ? "Store" : "Accommodation",
    name: `${property.title} — ${property.kicker}`,
    description: property.summary,
    url: `${SITE_URL}/propiedades/${property.slug}`,
    image: [`${SITE_URL}${property.cover.src}`],
    additionalType: KIND_LABELS[property.kind],
    address: {
      "@type": "PostalAddress",
      streetAddress: location?.name,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    ...(location
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.lat,
            longitude: location.lng,
          },
        }
      : {}),
    amenityFeature: property.features.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}
