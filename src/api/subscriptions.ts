import { socket, InboundEventParams, InboundEvent } from './base';
import { propOr } from 'ramda';
import { Move } from '../types/Pokemon';

socket.on('disconnect', (reason: string) => {
  if (reason === 'io server disconnect') {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
});

socket.on('reconnect_failed', () => {
  // ...
});

export function subscribeDisconnected(
  callback: (reason: string) => void
) {
  socket.on('disconnect', callback);
}

export function subscribeReconnecting(
  callback: () => void
) {
  socket.on('reconnecting', callback);
}

export function subscribeReconnected(
  callback: () => void
) {
  socket.on('reconnect', callback);
}

export function subscribeReconnectError(
  callback: (error: any) => void
) {
  socket.on('reconnect_error', callback);
}

export function subscribeReconnectFailed(
  callback: () => void
) {
  socket.on('reconnect_failed', callback);
}

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

export function subscribeFindingAi(
  callback: (status: InboundEventParams['FindingAi']) => void
) {
  socket.on(InboundEvent.FindingAi, callback);
  return { off: () => socket.off(InboundEvent.FindingAi) };
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

export function subscribeRoomChat(
  callback: ({ chat, sender }: InboundEventParams['RoomChat']) => void
) {
  socket.on(InboundEvent.RoomChat, callback);
  return { off: () => socket.off(InboundEvent.RoomChat) };
}

// TODO: workaround.
// remove this when the backend changed the move generated from 4 to 2
function limitMovesTo2(callback: any) {
  return function (params:
    | InboundEventParams['RoundStarted']
    | InboundEventParams['TurnChanged']
    | InboundEventParams['MoveUsed']
  ) {
    const moves: Move[][] | null = propOr(null, 'moves', params) ||
      propOr(null, 'availableMoves', params);
    const adjustedParams = !moves ? params : {
      ...params,
      moves: moves.map(pkmnMoves => pkmnMoves.slice(0, 2)),
      availableMoves: moves.map(pkmnMoves => pkmnMoves.slice(0, 2)),
    };
    callback(adjustedParams);
  }
}

export function subscribeRoundStarted(
  callback: (battleState: InboundEventParams['RoundStarted']) => void
) {
  socket.on(InboundEvent.RoundStarted, limitMovesTo2(callback));
  // socket.on(InboundEvent.RoundStarted, callback);
  return { off: () => socket.off(InboundEvent.RoundStarted) };
}

export function subscribeTurnChanged(
  callback: (battleState: InboundEventParams['TurnChanged']) => void
) {
  socket.on(InboundEvent.TurnChanged, limitMovesTo2(callback));
  // socket.on(InboundEvent.TurnChanged, callback);
  return { off: () => socket.off(InboundEvent.TurnChanged) };
}

export function subscribeMoveUsed(
  callback: (params: InboundEventParams['MoveUsed']) => void
) {
  socket.on(InboundEvent.MoveUsed, limitMovesTo2(callback));
  // socket.on(InboundEvent.MoveUsed, callback);
  return { off: () => socket.off(InboundEvent.MoveUsed) };
}

export function subscribeGameOver(
  callback: (params: InboundEventParams['GameOver']) => void
) {
  socket.on(InboundEvent.GameOver, callback);
  return { off: () => socket.off(InboundEvent.GameOver) };
}
