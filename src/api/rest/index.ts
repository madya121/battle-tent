import Pokemon from '../../types/Pokemon';

export function fetchPokemonList(): Promise<ApiResponse<Pokemon[]>> {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data: dummyPokemonList }), 2000);
  });
}

type ApiResponse<T = void> = T extends void ? {
  error?: any;
} : {
  data: T
  error?: any;
};

const dummyMove = {
  name: 'Vine Whip',
  description: 'long string',
  type: 'Grass',
  power: 40,
  accuracy: 80,
  pp: 10,
};
const dummyPokemonList: Pokemon[] = [
  {
    ndex: '001',
    name: 'Bulbasaur',
    types: ['Poison', 'Grass'],
    image: 'https://projectpokemon.org/images/normal-sprite/bulbasaur.gif',
    moves: [dummyMove],
    stats: {},
  },
  {
    ndex: '001',
    name: 'Charmander',
    types: ['Poison', 'Grass'],
    image: 'https://projectpokemon.org/images/normal-sprite/charmander.gif',
    moves: [dummyMove],
    stats: {},
  },
  {
    ndex: '001',
    name: 'Squirtle',
    types: ['Poison', 'Grass'],
    image: 'https://projectpokemon.org/images/normal-sprite/squirtle.gif',
    moves: [dummyMove],
    stats: {},
  },
];
