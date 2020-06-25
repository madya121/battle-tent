import Pokemon, { Stats } from '../types/Pokemon';
import BattlingPokemon from '../types/BattlingPokemon';

export const move1Mock = {
  id: '0',
  name: 'Tackle',
  description: 'description',
  type: 'Normal',
  power: 40,
  accuracy: 80,
  pp: 35,
  energy: 1,
};

export const move2Mock = {
  id: '1',
  name: 'poison Sting',
  description: 'long string for poison string description',
  type: 'Bug',
  power: 20,
  accuracy: 100,
  pp: 40,
  energy: 1,
};

export const move3Mock = {
  id: '2',
  name: 'Vine Whip',
  description: 'long string',
  type: 'Grass',
  power: 40,
  accuracy: 80,
  pp: 10,
  energy: 4,
};

export const move4Mock = {
  id: '3',
  name: 'Ember',
  description: 'long string',
  type: 'Fire',
  power: 40,
  accuracy: 80,
  pp: 35,
  energy: 3,
};

export const move5Mock = {
  id: '4',
  name: 'Bubble',
  description: 'long string',
  type: 'Water',
  power: 20,
  accuracy: 80,
  pp: 40,
  energy: 3,
};

export const statsMock: Stats = {
  hp: 20,
  attack: 20,
  defense: 20,
  'special-attack': 20,
  'special-defense': 20,
  speed: 20,
};

const pokemonMock1: Pokemon = {
  id: '001',
  name: 'bulbasaur',
  types: ['poison', 'grass'],
  moves: [move1Mock, move3Mock],
  stats: statsMock,
};

const pokemonMock2: Pokemon = {
  id: '002',
  name: 'charmander',
  types: ['fire'],
  moves: [move1Mock, move4Mock],
  stats: statsMock,
};

const pokemonMock3: Pokemon = {
  id: '003',
  name: 'squirtle',
  types: ['water'],
  moves: [move1Mock, move5Mock],
  stats: statsMock,
};

const pokemonMock4: Pokemon = {
  id: '110',
  name: 'weezing',
  types: ['poison'],
  moves: [move1Mock, move2Mock],
  stats: statsMock,
};

export const pokemonMock5: Pokemon = {
  id: '024',
  name: 'arbok',
  types: ['poison'],
  moves: [move1Mock, move2Mock],
  stats: statsMock,
};

const pokemonMock6: Pokemon = {
  id: '052',
  name: 'meowth',
  types: ['normal'],
  moves: [move1Mock, move2Mock],
  stats: statsMock,
};

export const pokemonListMock: Pokemon[] = [
  pokemonMock1,
  pokemonMock2,
  pokemonMock3,
];

const battlingPokemonMock1: BattlingPokemon = {
  pokemon: pokemonMock1,
  health: 100,
  maxHealth: 100,
};

const battlingPokemonMock2: BattlingPokemon = {
  pokemon: pokemonMock2,
  health: 100,
  maxHealth: 100,
};

const battlingPokemonMock3: BattlingPokemon = {
  pokemon: pokemonMock3,
  health: 100,
  maxHealth: 100,
};

const battlingPokemonMock4: BattlingPokemon = {
  pokemon: pokemonMock4,
  health: 100,
  maxHealth: 100,
};

const battlingPokemonMock5: BattlingPokemon = {
  pokemon: pokemonMock5,
  health: 100,
  maxHealth: 100,
};

const battlingPokemonMock6: BattlingPokemon = {
  pokemon: pokemonMock6,
  health: 100,
  maxHealth: 100,
};

export const battlingPartyMock: BattlingPokemon[] = [
  battlingPokemonMock1,
  battlingPokemonMock2,
  battlingPokemonMock3,
];

export const opponentPartyMock: BattlingPokemon[] = [
  battlingPokemonMock4,
  battlingPokemonMock5,
  battlingPokemonMock6,
];
