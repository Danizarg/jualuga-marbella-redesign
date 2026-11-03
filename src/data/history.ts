/**
 * Company history, as published on the client's "¿Quiénes somos?" page.
 *
 * The long quotation is attributed there to the local historian Ana Mª Mata.
 * It is kept short here and clearly marked as a quotation; the full passage
 * remains on the client's own site.
 */

export interface Milestone {
  year: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: "1919",
    title: "El primer hotel de Marbella",
    body: "Antonio Sánchez Ortiz y María Cuevas —bisabuelos y abuelos de la familia— instalan el que habría de ser el primer hotel de la ciudad: el Hotel Comercial, en la calle Valdés, junto a la actual Plaza de los Naranjos. Tenía doce habitaciones.",
    image: "/img/historia/hotel-comercial-plaza-africa-primero.png",
    imageAlt: "El Hotel Comercial en la Plaza de África, Marbella",
  },
  {
    year: "1952",
    title: "El Hotel Salduba",
    body: "El Comercial cambia de emplazamiento y de nombre: pasa a la Avenida Ramón y Cajal, frente a la Alameda, y se llama Hotel Salduba. Su cafetería, regentada por Pepe Sánchez Cuevas y Luis Gámez Piña, hizo de la «acera del Salduba» el punto de encuentro de la Marbella que empezaba a hablar en otros idiomas. Desapareció en 1975.",
    image: "/img/historia/hotel-salduba-1.jpg",
    imageAlt: "El Hotel Salduba de Marbella",
  },
  {
    year: "Años 60",
    title: "JULUGA, la primera tienda",
    body: "Juan Luis Gámez Sánchez, industrial desde los diez años en negocios de venta de ropa y textil, instala su primer comercio en la actual Plaza de África del Casco Antiguo. Lo llamó JULUGA: el nombre por el que todavía hoy se le conoce en Marbella.",
    image: "/img/historia/primera-tienda-de-juluga.jpg",
    imageAlt: "La primera tienda JULUGA en Marbella",
  },
  {
    year: "Años 70–80",
    title: "La Meca de los Pantalones",
    body: "Juan Luis Gámez Sánchez regenta La Meca de los Pantalones, una de las primeras franquicias de moda en España, a finales de los setenta y comienzos de los ochenta.",
    image: "/img/historia/la-meca-logo.jpg",
    imageAlt: "Logotipo de La Meca de los Pantalones",
  },
  {
    year: "2000",
    title: "Se constituye JUALUGA, SL",
    body: "Juan Luis Gámez Sánchez y Mª Begoña Ortúzar Inunciaga fundan la empresa familiar, dedicada al arrendamiento de inmuebles en propiedad: locales comerciales y apartamentos, todos en el Casco Antiguo de Marbella.",
  },
  {
    year: "2014",
    title: "La segunda generación",
    body: "Juan Luis Gámez Ortúzar, abogado, asume la gerencia, siempre contando con la presencia de su progenitor en la llevanza de la entidad. Ibón Gámez Ortúzar se incorpora a la gestión, de manera que la segunda generación asume el día a día de la empresa.",
  },
];

export const HISTORIAN_QUOTE = {
  text: "En 1919 don Antonio Sánchez Ortiz instala el que habría de ser el primer hotel en la ciudad, el Hotel Comercial, situado en la calle Valdés, junto a la actual Plaza de los Naranjos.",
  attribution: "Ana Mª Mata, historiadora local",
};

export const COMMITMENT = {
  title: "Nuestro compromiso",
  body: [
    "Ofrecemos el mejor emplazamiento y situación para que su negocio pueda ser punto de referencia dentro del tejido comercial de una ciudad como Marbella.",
    "De igual forma, los apartamentos se ofrecen totalmente equipados para residir desde el primer momento.",
  ],
};

/**
 * Current project, from the client's "Proyectos" page. Deliberately vague
 * because the client's own copy is: they have acquired a new building in the
 * Casco Antiguo and are still shaping the plan for it. No specifics invented.
 */
export const CURRENT_PROJECT = {
  title: "Un proyecto en marcha",
  body: [
    "Tras la adquisición de un nuevo inmueble en el Casco Antiguo de Marbella, nos encontramos dándole forma al proyecto empresarial para dicho lugar.",
    "Aunque se tiene bastante claro lo que se pretende en ese punto, llamado a ser —creemos— un nuevo lugar de moda en Marbella, dentro del encantador centro histórico de la ciudad.",
  ],
  images: [
    {
      src: "/img/proyectos/proyectos.jpg",
      alt: "El nuevo inmueble adquirido en el Casco Antiguo de Marbella",
    },
    {
      src: "/img/proyectos/viendo-posibilidades-reforma-1.jpg",
      alt: "Estudiando las posibilidades de reforma del nuevo inmueble",
    },
    {
      src: "/img/proyectos/viendo-posibilidades-reforma-2.jpg",
      alt: "Estudiando las posibilidades de reforma, segunda vista",
    },
    {
      src: "/img/proyectos/viendo-posibilidades-reforma-3.jpg",
      alt: "Estudiando las posibilidades de reforma, tercera vista",
    },
  ],
};
