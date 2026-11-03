import type { MetadataRoute } from "next";

import { PROPERTIES } from "@/data/properties";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/propiedades", priority: 0.9, freq: "weekly" },
    { path: "/locales-comerciales", priority: 0.9, freq: "weekly" },
    { path: "/apartamentos", priority: 0.9, freq: "weekly" },
    { path: "/en-alquiler", priority: 0.8, freq: "weekly" },
    { path: "/en-venta", priority: 0.8, freq: "weekly" },
    { path: "/ubicaciones", priority: 0.7, freq: "monthly" },
    { path: "/sobre-nosotros", priority: 0.6, freq: "yearly" },
    { path: "/negocios", priority: 0.6, freq: "monthly" },
    { path: "/proyectos", priority: 0.5, freq: "monthly" },
    { path: "/contacto", priority: 0.8, freq: "yearly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...PROPERTIES.map((property) => ({
      url: `${SITE_URL}/propiedades/${property.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
