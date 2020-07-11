import React, { Dispatch, SetStateAction } from 'react';
import BattlingPokemon from '../../types/BattlingPokemon';
import Pokemon, { Move } from '../../types/Pokemon';
import Player from '../../types/Player';
import { Parties, InboundEventParams } from '../../api/base';

export interface GameplayContextValue {
  opponent: Player | undefined;
  myTurn: boolean;
  changeTurn: (battleState: InboundEventParams['TurnChanged']) => void;
  availablePokemon: Pokemon[];
  availableMoves: Move[][];
  setAvailableMoves: React.Dispatch<React.SetStateAction<Move[][]>>;
  party: BattlingPokemon[];
  opponentParty: BattlingPokemon[];
  updateParties: (parties: Parties) => void;
  energy: number;
  maxEnergy: number;
  setEnergy: Dispatch<SetStateAction<number>>;
}

export default React.createContext<GameplayContextValue>({
  opponent: undefined,
  myTurn: false,
  changeTurn: () => { },
  availablePokemon: [],
  availableMoves: [],
  setAvailableMoves: () => { },
  party: [],
  opponentParty: [],
  updateParties: () => { },
  energy: 0,
  maxEnergy: 1,
  setEnergy: () => { },
});
