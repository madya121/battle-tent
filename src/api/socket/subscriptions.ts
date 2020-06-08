import { socket, InboundEventParams, InboundEvent } from './base';

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

export function subscribeChat(
  callback: (chat: InboundEventParams['Chat']) => void
) {
  socket.on(InboundEvent.Chat, callback);
  return { off: () => socket.off(InboundEvent.Chat) };
}
