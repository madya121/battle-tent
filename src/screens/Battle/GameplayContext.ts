import React, { Dispatch, SetStateAction } from 'react';
import Pokemon from '../../types/Pokemon';

export default React.createContext<{
  party: Pokemon[];
  setParty: Dispatch<SetStateAction<Pokemon[]>>
}>({
  party: [],
  setParty: () => { },
});
