import React, { Dispatch, SetStateAction } from 'react';
import BattlingPokemon from '../../types/BattlingPokemon';
import Pokemon from '../../types/Pokemon';
import Player from '../../types/Player';
import { Parties } from '../../api/base';

export interface GameplayContextValue {
  opponent: Player | undefined;
  availablePokemon: Pokemon[];
  party: BattlingPokemon[];
  opponentParty: BattlingPokemon[];
  updateParties: (parties: Parties) => void;
}

export default React.createContext<GameplayContextValue>({
  opponent: undefined,
  availablePokemon: [],
  party: [],
  opponentParty: [],
  updateParties: () => { },
});
