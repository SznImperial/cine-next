import { Movie, Person, TV } from "tmdb-ts";

export function isMovie(entity: Movie | TV | Person): entity is Movie {
  return "title" in entity && "release_date" in entity;
}

export function isTV(entity: Movie | TV | Person): entity is TV {
  return "name" in entity && "first_air_date" in entity;
}

export function isPerson(entity: Movie | TV | Person): entity is Person {
  return "name" in entity && "known_for_department" in entity;
}
