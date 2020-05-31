import React, { Dispatch, SetStateAction } from 'react';
import Player from '../types/Player';

export default React.createContext<[
  Player | null,
  Dispatch<SetStateAction<Player | null>>
]>([
  null,
  () => { }
]);
