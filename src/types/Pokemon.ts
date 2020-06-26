export default interface Pokemon {
  id: string; // National Dex number
  name: string;
  types: Types;
  moves: Move[];
  stats: Stats;
}

export interface Move {
  id: string;
  name: string;
  description: string;
  type: Type;
  power: number;
  accuracy: number;
  pp: number;
  energy: number;
}

export type Type = string;
export type Types = [Type] | [Type, Type];

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}
