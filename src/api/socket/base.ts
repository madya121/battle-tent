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
  SelectParty = 'select_party',
  Chat = 'chat',
}

export interface OutboundEventParams {
  Login: string; // Player's name
  SelectParty: Array<Pokemon['ndex']>; // Pokemon's National Dex number
  Chat: string; // chat message
}

export enum InboundEvent {
  // login - lobby
  LoggedIn = 'logged_in',
  // lobby
  ListPlayers = 'players_list',
  FindingMatch = 'finding_match',
  CancelledFindingMatch = 'cancelled_finding_match',
  // lobby - room
  JoinedTheRoom = 'joined_the_room',
  // room
  LeftTheRoom = 'left_the_room',
  PlayerJoinedTheRoom = 'player_joined_the_room',
  PlayerLeftTheRoom = 'player_left_the_room',
  Chat = 'chat',
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
  CancelledFindingMatch: {
    state: PlayerState.MainMenu;
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
  Chat: {
    name: string; // User's name
    message: string; // chat message
  }
}
