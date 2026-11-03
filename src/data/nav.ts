export interface NavItem {
  index: string;
  label: string;
  href: string;
}

/** Primary navigation, in the order the brief sets out. */
export const PRIMARY_NAV: NavItem[] = [
  { index: "01", label: "Inicio", href: "/" },
  { index: "02", label: "Sobre nosotros", href: "/sobre-nosotros" },
  { index: "03", label: "Locales comerciales", href: "/locales-comerciales" },
  { index: "04", label: "Apartamentos", href: "/apartamentos" },
  { index: "05", label: "Propiedades", href: "/propiedades" },
  { index: "06", label: "Ubicaciones", href: "/ubicaciones" },
  { index: "07", label: "Contacto", href: "/contacto" },
];

/** Secondary links: the two tenure views plus the portfolio background pages. */
export const SECONDARY_NAV: NavItem[] = [
  { index: "", label: "En alquiler", href: "/en-alquiler" },
  { index: "", label: "En venta", href: "/en-venta" },
  { index: "", label: "Negocios instalados", href: "/negocios" },
  { index: "", label: "Proyectos", href: "/proyectos" },
];

/** Compact set shown inline in the desktop header. */
export const HEADER_NAV: NavItem[] = [
  { index: "", label: "Locales", href: "/locales-comerciales" },
  { index: "", label: "Apartamentos", href: "/apartamentos" },
  { index: "", label: "Propiedades", href: "/propiedades" },
  { index: "", label: "Contacto", href: "/contacto" },
];
