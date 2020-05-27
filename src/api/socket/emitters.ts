import { socket, OutboundEvent, OutboundEventParams } from './base';

export function emitLogin(
  name: OutboundEventParams['Login']
) {
  socket.emit(OutboundEvent.Login, name);
}

export function emitFindMatch() {
  socket.emit(OutboundEvent.FindMatch);
}

export function emitCancelFindMatch() {
  socket.emit(OutboundEvent.CancelFindMatch);
}

export function emitLeaveRoom() {
  socket.emit(OutboundEvent.LeaveRoom);
}

export function emitSelectParty(
  pokemonNdexs: OutboundEventParams['SelectParty']
) {
  socket.emit(OutboundEvent.SelectParty, pokemonNdexs);
}

export function emitChat(
  message: OutboundEventParams['Chat']
) {
  socket.emit(OutboundEvent.Chat, message);
}
