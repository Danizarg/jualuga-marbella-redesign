/**
 * Businesses currently trading from JULUGA's commercial units
 * ("Negocios instalados" on the original site).
 *
 * Names, trades and streets are exactly as the client publishes them. Where
 * the original does not state a street, `street` is null rather than guessed.
 */

export interface InstalledBusiness {
  name: string;
  trade: string;
  street: string | null;
  logo: string;
  logoAlt: string;
}

export const INSTALLED_BUSINESSES: InstalledBusiness[] = [
  {
    name: "Baloo",
    trade: "Moda femenina",
    street: null,
    logo: "/img/negocios/baloo-logo.jpg",
    logoAlt: "Logotipo de Baloo",
  },
  {
    name: "Sam Newman",
    trade: "Moda masculina",
    street: "Calle Valdés",
    logo: "/img/negocios/sn-logo.jpg",
    logoAlt: "Logotipo de Sam Newman",
  },
  {
    name: "Fugaro",
    trade: "Moda masculina",
    street: "Calle Padre Francisco Echamendi",
    logo: "/img/negocios/logo-fugaro.jpg",
    logoAlt: "Logotipo de Fugaro",
  },
  {
    name: "Cannabis Store Amsterdam",
    trade: "Productos varios",
    street: null,
    logo: "/img/negocios/logo.jpg",
    logoAlt: "Logotipo de Cannabis Store Amsterdam",
  },
  {
    name: "JLG — Juan Luis Gámez",
    trade: "Despacho de abogado",
    street: null,
    logo: "/img/negocios/logo-jlg.jpg",
    logoAlt: "Logotipo de JLG, despacho de Juan Luis Gámez",
  },
];

/**
 * The client's own framing of why this list matters, from the same page:
 * "Una de las principales notas características es el tiempo que permanecen
 * en el mismo emplazamiento."
 */
export const INSTALLED_BUSINESSES_NOTE =
  "En nuestros locales se encuentran abiertos al público diversos negocios de distinta tipología. Una de las principales notas características es el tiempo que permanecen en el mismo emplazamiento.";
