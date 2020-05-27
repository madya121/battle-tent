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

export function emitSelectsPokemon(
  pokemonNdexs: OutboundEventParams['SelectPokemon']
) {
  socket.emit(OutboundEvent.SelectPokemon, pokemonNdexs);
}
