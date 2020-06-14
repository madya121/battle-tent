import { socket, InboundEventParams, InboundEvent } from './base';
import {
  battlingPartyMock,
  opponentPartyMock,
  move1Mock,
  move3Mock,
  move4Mock,
  move5Mock,
} from '../responseMocks';

export function subscribePlayers(
  callback: (players: InboundEventParams['ListPlayers']) => void
) {
  socket.on(InboundEvent.ListPlayers, callback);
  return { off: () => socket.off(InboundEvent.ListPlayers) };
}

export function subscribeLoggedIn(
  callback: (status: InboundEventParams['LoggedIn']) => void
) {
  socket.on(InboundEvent.LoggedIn, callback);
  return { off: () => socket.off(InboundEvent.LoggedIn) };
}

export function subscribeFindingMatch(
  callback: (status: InboundEventParams['FindingMatch']) => void
) {
  socket.on(InboundEvent.FindingMatch, callback);
  return { off: () => socket.off(InboundEvent.FindingMatch) };
}

export function subscribeCancelledFindingMatch(
  callback: (status: InboundEventParams['CancelledFindingMatch']) => void
) {
  socket.on(InboundEvent.CancelledFindingMatch, callback);
  return { off: () => socket.off(InboundEvent.CancelledFindingMatch) };
}

export function subscribeJoinedTheRoom(
  callback: (status: InboundEventParams['JoinedTheRoom']) => void
) {
  socket.on(InboundEvent.JoinedTheRoom, callback);
  return { off: () => socket.off(InboundEvent.JoinedTheRoom) };
}

export function subscribeLeftTheRoom(
  callback: (status: InboundEventParams['LeftTheRoom']) => void
) {
  socket.on(InboundEvent.LeftTheRoom, callback);
  return { off: () => socket.off(InboundEvent.LeftTheRoom) };
}

export function subscribePlayerJoinedTheRoom(
  callback: (status: InboundEventParams['PlayerJoinedTheRoom']) => void
) {
  socket.on(InboundEvent.PlayerJoinedTheRoom, callback);
  return { off: () => socket.off(InboundEvent.PlayerJoinedTheRoom) };
}

export function subscribePlayerLeftTheRoom(
  callback: (status: InboundEventParams['PlayerLeftTheRoom']) => void
) {
  socket.on(InboundEvent.PlayerLeftTheRoom, callback);
  return { off: () => socket.off(InboundEvent.PlayerLeftTheRoom) };
}

// unimplemented from backend

export function subscribeChat(
  callback: (chat: InboundEventParams['Chat']) => void
) {
  socket.on(InboundEvent.Chat, callback);
  return { off: () => socket.off(InboundEvent.Chat) };
}

export function subscribeRoundStarted(
  callback: (battleState: InboundEventParams['RoundStarted']) => void
) {
  socket.on(InboundEvent.RoundStarted, callback);
  setTimeout(() => callback([
    { playerId: '0', party: battlingPartyMock },
    { playerId: '1', party: opponentPartyMock },
  ]), 1000)
  return { off: () => socket.off(InboundEvent.RoundStarted) };
}

export function subscribeTurnStarted(
  callback: (battleState: InboundEventParams['TurnStarted']) => void
) {
  socket.on(InboundEvent.TurnStarted, callback);
  setTimeout(() => callback({ energy: 10 }), 300)
  return { off: () => socket.off(InboundEvent.TurnStarted) };
}

export function subscribeMoveUsed(
  callback: (params: InboundEventParams['MoveUsed']) => void
) {
  socket.on(InboundEvent.MoveUsed, callback);
  setTimeout(() => callback({
    move: move1Mock,
    userMoveIndex: [0, 0],
    targetIndexes: [1],
    result: [
      {
        playerId: '0',
        party: battlingPartyMock,
      },
      {
        playerId: '1',
        party: opponentPartyMock,
      }
    ],
  }), 300);
  return { off: () => socket.off(InboundEvent.MoveUsed) };
}

export function subscribeTurnEnded(
  callback: (params: InboundEventParams['TurnEnded']) => void
) {
  socket.on(InboundEvent.TurnEnded, callback);
  setTimeout(() => callback({
    moves: [
      [move1Mock, move3Mock],
      [move1Mock, move4Mock],
      [move1Mock, move5Mock],
    ]
  }), 2000)
  return { off: () => socket.off(InboundEvent.TurnEnded) };
}
