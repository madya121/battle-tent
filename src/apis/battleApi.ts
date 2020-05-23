import socketIOClient from 'socket.io-client';
import { SOCKET_ENDPOINT } from './constants';
import Pokemon from '../types/Pokemon';
import Trainer from '../types/Trainer';

const socket = socketIOClient(SOCKET_ENDPOINT);

interface ApiResponse<T = never> {
  data: T
  error?: any;
}

enum Event {
  PlayerSelectsPokemon = 'player_selects_pokemon',
}

export function fetchOpponent(): Promise<ApiResponse<Trainer>> {
  return new Promise((resolve, reject) => {
    socket.on('get_opponent', (ACK: boolean, data: Trainer) => {
      socket.removeListener(Event.PlayerSelectsPokemon);
      ACK ? resolve({ data }) : reject({ error: true });
    });
  });
}

export function sendChoosenParty(pokemonNdexs: Array<Pokemon['ndex']>): Promise<ApiResponse> {
  socket.emit(Event.PlayerSelectsPokemon, pokemonNdexs);
  return new Promise((resolve, reject) => {
    socket.on(Event.PlayerSelectsPokemon, (ACK: boolean) => {
      socket.removeListener(Event.PlayerSelectsPokemon);
      ACK ? resolve() : reject({ error: true });
    });
  });
}
