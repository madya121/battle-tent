import React, { Dispatch, SetStateAction } from 'react';
import BattlingPokemon from '../../types/BattlingPokemon';
import Pokemon from '../../types/Pokemon';
import Player from '../../types/Player';

export default React.createContext<{
  opponent: Player | undefined;
  availablePokemon: Pokemon[];
  party: BattlingPokemon[];
  setParty: Dispatch<SetStateAction<BattlingPokemon[]>>
  opponentParty: BattlingPokemon[];
  setOpponentParty: Dispatch<SetStateAction<BattlingPokemon[]>>
}>({
  opponent: undefined,
  availablePokemon: [],
  party: [],
  setParty: () => { },
  opponentParty: [],
  setOpponentParty: () => { },
});
