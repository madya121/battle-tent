import socketIOClient from 'socket.io-client';
import { SOCKET_ENDPOINT } from './constants';
import Pokemon from '../types/Pokemon';
import Trainer from '../types/Trainer';

const socket = socketIOClient(SOCKET_ENDPOINT);

type ApiResponse<T = void> = T extends void ? {
  error?: any;
} : {
  data: T
  error?: any;
};

enum Event {
  PlayerSelectsPokemon = 'player_selects_pokemon',
}

export function fetchPokemonList(): Promise<ApiResponse<Pokemon[]>> {
  return new Promise((resolve, reject) => {
    // socket.on('get_opponent', (ACK: boolean, data: Trainer) => {
    //   socket.removeListener(Event.PlayerSelectsPokemon);
    //   ACK ? resolve({ data }) : reject({ error: true });
    // });
    setTimeout(() => resolve({ data: dummyPokemonList }), 2000);
  });
}
export function fetchOpponent(): Promise<ApiResponse<Trainer>> {
  return new Promise((resolve, reject) => {
    // socket.on('get_opponent', (ACK: boolean, data: Trainer) => {
    //   socket.removeListener(Event.PlayerSelectsPokemon);
    //   ACK ? resolve({ data }) : reject({ error: true });
    // });
    setTimeout(() => resolve({ data: { name: 'opponentUsername' } }), 2000);
  });
}

export function sendChoosenParty(pokemonNdexs: Array<Pokemon['ndex']>): Promise<ApiResponse> {
  socket.emit(Event.PlayerSelectsPokemon, pokemonNdexs);
  return new Promise((resolve, reject) => {
    // socket.on(Event.PlayerSelectsPokemon, (ACK: boolean) => {
    //   socket.removeListener(Event.PlayerSelectsPokemon);
    //   ACK ? resolve() : reject({ error: true });
    // });
    setTimeout(() => resolve({}), 2000);
  });
}

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
    image: 'image-url',
    moves: [dummyMove],
    stats: {},
  },
  {
    ndex: '001',
    name: 'Bulbasaur-2',
    types: ['Poison', 'Grass'],
    image: 'image-url',
    moves: [dummyMove],
    stats: {},
  },
  {
    ndex: '001',
    name: 'Bulbasaur-3',
    types: ['Poison', 'Grass'],
    image: 'image-url',
    moves: [dummyMove],
    stats: {},
  },
];
