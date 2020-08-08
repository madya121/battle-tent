import io from 'socket.io-client';
import Pokemon, { Move } from '../types/Pokemon';
import Player from '../types/Player';
import BattlingPokemon from '../types/BattlingPokemon';
import { QuickChatOption } from '../screens/Room/QuickChat/constants';
import { GymLocation } from '../constants/location';

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
  FindingAi = 'FINDING_AI',
  InRoom = 'IN_ROOM',
}

export enum OutboundEvent {
  Login = 'login',
  FindMatch = 'find_match',
  CancelFindMatch = 'cancel_find_match',
  LeaveRoom = 'leave_room',
  PlayerReady = 'player_ready',
  RoomChat = 'room_chat',
  UseMove = 'use_move',
  EndTurn = 'end_turn',
  PlaySinglePlayer = 'play_single_player',
  ChallengeGymLeader = 'challenge_gym_leader',
}

export interface OutboundEventParams {
  Login: string; // Player's name
  PlayerReady: Array<number>; // array of available pokemon indexes
  RoomChat: QuickChatOption; // chat message

  // battle mechanics
  UseMove: UseMoveParams;
  ChallengeGymLeader: GymLocation;
}

export enum InboundEvent {
  // login - lobby
  LoggedIn = 'logged_in',
  // lobby
  ListPlayers = 'players_list',
  FindingMatch = 'finding_match',
  CancelledFindingMatch = 'cancelled_finding_match',
  FindingAi = 'finding_ai',
  // lobby - room
  JoinedTheRoom = 'joined_the_room',
  // room
  LeftTheRoom = 'left_the_room',
  PlayerJoinedTheRoom = 'player_joined_the_room',
  PlayerLeftTheRoom = 'player_left_the_room',
  RoomChat = 'room_chat',
  // game event
  RoundStarted = 'round_started',
  TurnChanged = 'turn_changed',
  MoveUsed = 'move_used',
  PlayerUsedItem = 'player_used_item',
  GameOver = 'game_over',
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
  FindingAi: {
    state: PlayerState.FindingAi;
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
    gymBattleIndex: GymLocation
  };
  PlayerLeftTheRoom: {
    name: string; // another player's name that left the room
  };
  RoomChat: {
    chat: QuickChatOption; // chat message
    sender: string; // User's id
  };
  RoundStarted: InitialTurnStates & { parties: Parties };
  TurnChanged: InitialTurnStates;
  MoveUsed: UseMoveParams & {
    move: Move;
    remainingEnergy: number;
    parties: Parties;
    availableMoves: Move[][];
  };
  PlayerUsedItem: {
    playerId: string;
    itemId: string;
    partyIndex: number;
  };
  GameOver: {
    winner: boolean;
    draw?: boolean;
  };
}

export type Parties = Record<Player['id'], BattlingPokemon[]>;

export interface UseMoveParams {
  userIndex: number; // party index of the user
  moveIndex: number; // index of move the user has
  targetIndexes?: {
    myParty?: number[]; // party indexes of the target
    opponentParty?: number[]; // party indexes of the target
  };
}
