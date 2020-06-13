import React, { Dispatch, SetStateAction } from 'react';
import BattlingPokemon from '../../types/BattlingPokemon';

export default React.createContext<{
  party: BattlingPokemon[];
  setParty: Dispatch<SetStateAction<BattlingPokemon[]>>
  opponentParty: BattlingPokemon[];
  setOpponentParty: Dispatch<SetStateAction<BattlingPokemon[]>>
}>({
  party: [],
  setParty: () => { },
  opponentParty: [],
  setOpponentParty: () => { },
});
