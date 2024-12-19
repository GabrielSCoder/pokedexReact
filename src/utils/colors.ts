export type PokemonType = 
  | "bug"
  | "dark"
  | "dragon"
  | "ice"
  | "grass"
  | "fire"
  | "electric"
  | "fighting"
  | "fairy"
  | "ghost"
  | "steel"
  | "poison"
  | "water"
  | "normal"
  | "flying"
  | "ground"
  | "psychic"
  | "rock";

export const typeColors: Record<PokemonType, string> = {
  bug: "bg-bug",
  dark: "bg-dark",
  dragon: "bg-dragon",
  ice: "bg-ice",
  grass: "bg-grass",
  fire: "bg-fire",
  electric: "bg-electric",
  fighting: "bg-fighting",
  fairy: "bg-fairy",
  ghost: "bg-ghost",
  steel: "bg-steel",
  poison: "bg-poison",
  water: "bg-water",
  normal: "bg-normal",
  flying: "bg-flying",
  ground: "bg-ground",
  psychic: "bg-psychic",
  rock: "bg-rock",
};