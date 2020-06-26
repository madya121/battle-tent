import Pokemon, { Stats } from './Pokemon';

export default interface BattlingPokemon {
  pokemon: Pokemon;
  health: number;
  maxHealth: number;
  statusCondition?: StatusCondition | null;
  statsModifier?: Record<
    keyof Stats,
    -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
  >;
}

enum StatusCondition {
  Poisoned,
  Burned,
  Paralyzed,
  Sleep,
  Frozen,
}
