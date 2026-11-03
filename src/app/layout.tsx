import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { FloatingEnquiry } from "@/components/site/FloatingEnquiry";
import { BRAND_NAME, SHORT_DESCRIPTION, SITE_URL, TAGLINE } from "@/data/site";
import { organisationJsonLd } from "@/lib/seo";

import "./globals.css";

/** Display face: high-contrast garalde, used large and light. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

/** Text and UI face: geometric sans, carries the wide-tracked labels. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} — Locales comerciales y apartamentos en el Casco Antiguo de Marbella`,
    template: `%s — ${BRAND_NAME} Marbella`,
  },
  description: SHORT_DESCRIPTION,
  applicationName: BRAND_NAME,
  keywords: [
    "locales comerciales Marbella",
    "alquiler locales Casco Antiguo Marbella",
    "apartamentos Casco Antiguo Marbella",
    "alquiler apartamentos Marbella centro",
    "Plaza de la Victoria Marbella",
    "inmueble en venta Casco Antiguo Marbella",
    "locales comerciales Plaza de los Naranjos",
    "JULUGA Marbella",
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: {
    canonical: "/",
    languages: { "es-ES": "/" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} — ${TAGLINE}`,
    description: SHORT_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1917" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-ES" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          // Organisation-level structured data for local search.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
        />
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingEnquiry />
      </body>
    </html>
  );
}
