import Pokemon from '../types/Pokemon';
import BattlingPokemon from '../types/BattlingPokemon';

export const moveMock = {
  id: '0',
  name: 'Vine Whip',
  description: 'long string',
  type: 'Grass',
  power: 40,
  accuracy: 80,
  pp: 10,
};

export const move2Mock = {
  id: '1',
  name: 'Poison Sting',
  description: 'long string for poison string description',
  type: 'Bug',
  power: 20,
  accuracy: 100,
  pp: 40,
};

export const statsMock = {
  hp: 0,
  atk: 0,
  def: 0,
  sAtk: 0,
  sDef: 0,
  speed: 0,
};

const pokemonMock1: Pokemon = {
  ndex: '001',
  name: 'Bulbasaur',
  types: ['Poison', 'Grass'],
  image: 'https://projectpokemon.org/images/normal-sprite/bulbasaur.gif',
  imageBack: 'https://projectpokemon.org/images/sprites-models/normal-back/bulbasaur.gif',
  moves: [moveMock, move2Mock],
  stats: statsMock,
};

const pokemonMock2: Pokemon = {
  ndex: '002',
  name: 'Charmander',
  types: ['Fire'],
  image: 'https://projectpokemon.org/images/normal-sprite/charmander.gif',
  imageBack: 'https://projectpokemon.org/images/sprites-models/normal-back/charmander.gif',
  moves: [moveMock, move2Mock],
  stats: statsMock,
};

const pokemonMock3: Pokemon = {
  ndex: '003',
  name: 'Squirtle',
  types: ['Water'],
  image: 'https://projectpokemon.org/images/normal-sprite/squirtle.gif',
  imageBack: 'https://projectpokemon.org/images/sprites-models/normal-back/squirtle.gif',
  moves: [moveMock, move2Mock],
  stats: statsMock,
};

const pokemonMock4: Pokemon = {
  ndex: '110',
  name: 'Weezing',
  types: ['Poison'],
  image: 'https://projectpokemon.org/images/normal-sprite/weezing.gif',
  imageBack: 'https://projectpokemon.org/images/sprites-models/normal-back/weezing.gif',
  moves: [moveMock, move2Mock],
  stats: statsMock,
};

export const pokemonMock5: Pokemon = {
  ndex: '024',
  name: 'Arbok',
  types: ['Poison'],
  image: 'https://projectpokemon.org/images/normal-sprite/arbok.gif',
  imageBack: 'https://projectpokemon.org/images/sprites-models/normal-back/arbok.gif',
  moves: [moveMock, move2Mock],
  stats: statsMock,
};

const pokemonMock6: Pokemon = {
  ndex: '052',
  name: 'Meowth',
  types: ['Normal'],
  image: 'https://projectpokemon.org/images/normal-sprite/meowth.gif',
  imageBack: 'https://projectpokemon.org/images/sprites-models/normal-back/meowth.gif',
  moves: [moveMock, move2Mock],
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
};

const battlingPokemonMock2: BattlingPokemon = {
  pokemon: pokemonMock2,
  health: 100,
};

const battlingPokemonMock3: BattlingPokemon = {
  pokemon: pokemonMock3,
  health: 100,
};

const battlingPokemonMock4: BattlingPokemon = {
  pokemon: pokemonMock4,
  health: 100,
};

const battlingPokemonMock5: BattlingPokemon = {
  pokemon: pokemonMock5,
  health: 100,
};

const battlingPokemonMock6: BattlingPokemon = {
  pokemon: pokemonMock6,
  health: 100,
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
