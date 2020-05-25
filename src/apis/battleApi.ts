import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from './constants';
import Pokemon from '../types/Pokemon';
import Trainer from '../types/Trainer';

const socket = io(SOCKET_ENDPOINT);

type ApiResponse<T = void> = T extends void ? {
  error?: any;
} : {
  data: T
  error?: any;
};

enum OutboundEvent {
  Login = 'login',
  FindMatch = 'find_match',
  SelectsPokemon = 'player_selects_pokemon',
}

enum InboundEvent {
  ListPlayers = 'list_players',
  LoggedIn = 'player_login',
  FindingMatch = 'player_find_match',
  JoinedTheRoom = 'joining_room',
  LeftTheRoom = 'leaving_room',
  PlayerJoinedTheRoom = 'player_joining_room',
  PlayerLeftTheRoom = 'player_leaving_room',
}

interface InboundEventValue {
  ListPlayers: Array<{
    state: PlayerState;
    name: string; // player's name
  }>;
  LoggedIn: {
    state: PlayerState.MainMenu;
    name: string;
  };
  FindingMatch: {
    state: PlayerState.FindingMatch;
  };
  JoinedTheRoom: {
    state: PlayerState.InRoom;
    roomName: string // Room's ID
  }
  LeftTheRoom: {
    state: PlayerState.MainMenu;
  }
  PlayerJoinedTheRoom: {
    name: string; // another player's name that joined the room
  }
  PlayerLeftTheRoom: {
    name: string; // another player's name that left the room
  }
}

export function subscribePlayers(callback: (players: InboundEventValue['ListPlayers']) => void) {
  socket.on(InboundEvent.ListPlayers, callback);
  return { off: () => socket.off(InboundEvent.ListPlayers) };
}
export function subscribeLoggedIn(callback: (status: InboundEventValue['LoggedIn']) => void) {
  socket.on(InboundEvent.LoggedIn, callback);
  return { off: () => socket.off(InboundEvent.LoggedIn) };
}
export function subscribeFindingMatch(callback: (status: InboundEventValue['FindingMatch']) => void) {
  socket.on(InboundEvent.FindingMatch, callback);
  return { off: () => socket.off(InboundEvent.FindingMatch) };
}
export function subscribeJoinedTheRoom(callback: (status: InboundEventValue['JoinedTheRoom']) => void) {
  socket.on(InboundEvent.JoinedTheRoom, callback);
  return { off: () => socket.off(InboundEvent.JoinedTheRoom) };
}
export function subscribeLeftTheRoom(callback: (status: InboundEventValue['LeftTheRoom']) => void) {
  socket.on(InboundEvent.LeftTheRoom, callback);
  return { off: () => socket.off(InboundEvent.LeftTheRoom) };
}
export function PlayersubscribeJoinedTheRoom(callback: (status: InboundEventValue['PlayerJoinedTheRoom']) => void) {
  socket.on(InboundEvent.PlayerJoinedTheRoom, callback);
  return { off: () => socket.off(InboundEvent.PlayerJoinedTheRoom) };
}
export function PlayersubscribeLeftTheRoom(callback: (status: InboundEventValue['PlayerLeftTheRoom']) => void) {
  socket.on(InboundEvent.PlayerLeftTheRoom, callback);
  return { off: () => socket.off(InboundEvent.PlayerLeftTheRoom) };
}

export function subscribeOpponent(callback: (opponent: Trainer) => void) {
  const a = socket.on('get_opponent', callback);
  return { off: () => socket.off('get_opponent') };
}

export function sendChoosenParty(pokemonNdexs: Array<Pokemon['ndex']>): Promise<ApiResponse> {
  socket.emit(OutboundEvent.SelectsPokemon, pokemonNdexs);
  return new Promise((resolve, reject) => {
    // socket.on(Event.SelectsPokemon, (ACK: boolean) => {
    //   socket.removeListener(Event.SelectsPokemon);
    //   ACK ? resolve() : reject({ error: true });
    // });
    setTimeout(() => resolve({}), 2000);
  });
}

export function fetchPokemonList(): Promise<ApiResponse<Pokemon[]>> {
  return new Promise((resolve, reject) => {
    // socket.on('get_opponent', (ACK: boolean, data: Trainer) => {
    //   socket.removeListener(OutboundEvent.SelectsPokemon);
    //   ACK ? resolve({ data }) : reject({ error: true });
    // });
    setTimeout(() => resolve({ data: dummyPokemonList }), 2000);
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

enum PlayerState {
  Connected = 'CONNECTED',
  MainMenu = 'MAIN_MENU',
  FindingMatch = 'FINDING_MATCH',
  InRoom = 'IN_ROOM',
}