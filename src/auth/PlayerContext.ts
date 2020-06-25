import React, { Dispatch, SetStateAction } from 'react';
import Player from '../types/Player';

export const guest: Player = {
  id: '',
  name: 'Guest',
}

export default React.createContext<[
  Player,
  Dispatch<SetStateAction<Player>>
]>([
  guest,
  () => { }
]);
