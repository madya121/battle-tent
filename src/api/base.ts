import io from 'socket.io-client';
import Pokemon, { Move } from '../types/Pokemon';
import Player from '../types/Player';
import BattlingPokemon from '../types/BattlingPokemon';
import { QuickChatOption } from '../screens/Room/QuickChatPanel/constants';

export const socket = io.connect(
  process.env.REACT_APP_SOCKET_ENDPOINT || '',
  {
    path: process.env.REACT_APP_SOCKET_PATH,
    transports: ['websocket'],
  }
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
  PlayerReady = 'player_ready',
  Chat = 'chat',
  UseMove = 'use_move',
  EndTurn = 'end_turn',
}

export interface OutboundEventParams {
  Login: string; // Player's name
  PlayerReady: Array<number>; // array of available pokemon indexes
  Chat: QuickChatOption; // chat message

  // battle mechanics
  UseMove: UseMoveParams;
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
  // game event
  RoundStarted = 'round_started',
  TurnChanged = 'turn_changed',
  MoveUsed = 'moved_used',
  PlayerUsedItem = 'player_used_item',
}

type InitialTurnStates = {
  my_turn: true;
  energy: number;
  moves: Move[][]; // array of moves, inside array of pokemon
} | {
  my_turn: false;
  energy: never;
  moves: never;
};

export interface InboundEventParams {
  ListPlayers: Array<{
    state: PlayerState;
    name: string; // player's name // TODO deprecate
    player?: Player;
  }>;
  LoggedIn: Player & {
    state: PlayerState.MainMenu;
  };
  FindingMatch: {
    state: PlayerState.FindingMatch;
  };
  CancelledFindingMatch: {
    state: PlayerState.MainMenu;
  };
  JoinedTheRoom: {
    state: PlayerState.InRoom;
    room: string // Room name
    participant: Player[];
  };
  LeftTheRoom: {
    state: PlayerState.MainMenu;
  };
  PlayerJoinedTheRoom: {
    id: Player['id']; // another player that joined the room
    name: Player['name'];
    avatar: Player['avatar'];
    players: Player[];
    availablePokemon: Pokemon[];
  };
  PlayerLeftTheRoom: {
    name: string; // another player's name that left the room
  };
  Chat: {
    name: string; // User's name
    message: string; // chat message
  };
  RoundStarted: InitialTurnStates & { parties: Parties };
  TurnChanged: InitialTurnStates;
  MoveUsed: UseMoveParams & {
    move: Move;
    remainingEnergy: number;
    parties: Parties;
  };
  PlayerUsedItem: {
    playerId: string;
    itemId: string;
    partyIndex: number;
  };
}

export type Parties = Record<Player['id'], BattlingPokemon[]>;

interface UseMoveParams {
  userIndex: number; // party index of the user
  moveIndex: number; // index of move the user has
  targetIndexes?: {
    myParty?: number[]; // party indexes of the target
    opponentParty?: number[]; // party indexes of the target
  };
}
