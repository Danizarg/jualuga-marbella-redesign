/**
 * The three locations where JULUGA holds property, all inside Marbella's
 * Casco Antiguo.
 *
 * Coordinates are approximate, at street/square level — they place each
 * building within the old town rather than pinpointing a doorway. Labelled as
 * such in the UI.
 */

export type LocationId =
  | "plaza-de-la-victoria"
  | "calle-padre-francisco-echamendi"
  | "casco-antiguo";

export interface Location {
  id: LocationId;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  /** Taken from the client's own descriptions of each location. */
  note: string;
  image: string;
}

export const LOCATIONS: Location[] = [
  {
    id: "plaza-de-la-victoria",
    name: "Plaza de la Victoria",
    shortName: "Pl. de la Victoria",
    lat: 36.5104,
    lng: -4.8847,
    note: "El mejor emplazamiento dentro del Casco Antiguo de Marbella, y centro neurálgico de la ciudad. Plaza peatonal.",
    image: "/img/locales-plaza-victoria/locales-comerciales-plaza-de-la-victoria.jpg",
  },
  {
    id: "calle-padre-francisco-echamendi",
    name: "Calle Padre Francisco Echamendi",
    shortName: "C/ Padre Fco. Echamendi",
    lat: 36.5099,
    lng: -4.8862,
    note: "Otro de los puntos de referencia comercial en el Casco Antiguo de Marbella.",
    image: "/img/locales-echamendi/calle-padre-fco-ecchamendi-foto-2.jpg",
  },
  {
    id: "casco-antiguo",
    name: "Casco Antiguo",
    shortName: "Casco Antiguo",
    lat: 36.5093,
    lng: -4.8864,
    note: "A escasos 100 m de la Plaza de los Naranjos, en calle peatonal y muy tranquila, con orientación sur.",
    image: "/img/en-venta/fachada-luz-manana-11-30am.jpg",
  },
];

export function getLocation(id: LocationId): Location {
  const found = LOCATIONS.find((l) => l.id === id);
  if (!found) throw new Error(`Unknown location: ${id}`);
  return found;
}
