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
  used?: boolean;
}

export enum Type {
  normal = 'normal',
  fire = 'fire',
  fighting = 'fighting',
  water = 'water',
  flying = 'flying',
  grass = 'grass',
  poison = 'poison',
  electric = 'electric',
  ground = 'ground',
  psychic = 'psychic',
  rock = 'rock',
  ice = 'ice',
  bug = 'bug',
  dragon = 'dragon',
  ghost = 'ghost',
  dark = 'dark',
  steel = 'steel',
  fairy = 'fairy',
  '???' = '???'
}

export type Types = [Type] | [Type, Type];

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}
