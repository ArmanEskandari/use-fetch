export {};

declare global {
  interface Character {
    name: string;
    height: string;
    mass: string;
    hairColor: string;
    skinColor: string;
    eyeColor: string;
    birthYear: string;
    gender: string;
    homeWorld: string;
    films: string[];
    species: any[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  }
}
