import { findIndex, omit } from 'ramda';
import Player from '../types/Player'
import BattlingPokemon from '../types/BattlingPokemon';

export function splitPlayer(player: Player, allPlayersData: Array<{ playerId: string; party: BattlingPokemon[] }>) {
  const findPlayerIndex = findIndex<{ playerId: string }>(
    ({ playerId }) => playerId === player.id
  )
  const playerIndex = findPlayerIndex(allPlayersData);
  const opponentIndex = Number(!Boolean(playerIndex)); // invert 0 to 1, v.v.
  return {
    playerData: omit(['playerId'], allPlayersData[playerIndex]),
    opponentData: omit(['playerId'], allPlayersData[opponentIndex]),
  };
}
