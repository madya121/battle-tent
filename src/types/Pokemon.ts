export default interface Pokemon {
  ndex: string; // National Dex number
  name: string;
  types: Types;
  image: string; // image url
  moves: Move[];
  stats: {};
}

export interface Move {
  name: string;
  description: string;
  type: Type;
  power: number;
  accuracy: number;
  pp: number;
}

export type Type = string;
export type Types = [Type] | [Type, Type];
