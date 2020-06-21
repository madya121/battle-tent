export default interface Pokemon {
  ndex: string; // National Dex number
  name: string;
  types: Types;
  image: string; // image url
  imageBack: string; // image url
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
  atk: number;
  def: number;
  sAtk: number;
  sDef: number;
  speed: number;
}
