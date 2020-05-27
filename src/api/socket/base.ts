import io from 'socket.io-client';
import Pokemon from '../../types/Pokemon';

export const socket = io.connect(
  process.env.REACT_APP_SOCKET_ENDPOINT || '',
  { path: '/ws/', transports: ['websocket'] }
);

enum PlayerState {
  Connected = 'CONNECTED',
  MainMenu = 'MAIN_MENU',
  FindingMatch = 'FINDING_MATCH',
  InRoom = 'IN_ROOM',
}

export enum OutboundEvent {
  Login = 'login',
  FindMatch = 'find_match',
  CancelFindMatch = 'cancel_find_match',
  LeaveRoom = 'leave_room',
  SelectPokemon = 'player_selects_pokemon',
}

export interface OutboundEventParams {
  Login: string; // Player's name
  SelectPokemon: Array<Pokemon['ndex']>; // Pokemon's National Dex number
}

export enum InboundEvent {
  // login - lobby
  LoggedIn = 'logged_in',
  // lobby
  ListPlayers = 'players_list',
  FindingMatch = 'finding_match',
  // lobby - room
  JoinedTheRoom = 'joined_the_room',
  // room
  LeftTheRoom = 'left_the_room',
  PlayerJoinedTheRoom = 'player_joined_the_room',
  PlayerLeftTheRoom = 'player_left_the_room',
}

export interface InboundEventParams {
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
