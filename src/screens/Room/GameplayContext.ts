import React, { Dispatch, SetStateAction } from 'react';
import BattlingPokemon from '../../types/BattlingPokemon';
import Pokemon from '../../types/Pokemon';

export default React.createContext<{
  availablePokemon: Pokemon[];
  party: BattlingPokemon[];
  setParty: Dispatch<SetStateAction<BattlingPokemon[]>>
  opponentParty: BattlingPokemon[];
  setOpponentParty: Dispatch<SetStateAction<BattlingPokemon[]>>
}>({
  availablePokemon: [],
  party: [],
  setParty: () => { },
  opponentParty: [],
  setOpponentParty: () => { },
});
