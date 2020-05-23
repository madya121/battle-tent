import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import Pokemon from '../../../../types/Pokemon';
import { Button } from '../../../../components/basics';
import { BattleStep } from '../../enums';
import { SOCKET_ENDPOINT } from '../../constants';

export interface ChoosePartyProps {
  pokemonList: Pokemon[];
  setActiveStep: React.Dispatch<React.SetStateAction<BattleStep>>;
}

export default function ChooseParty({ pokemonList, setActiveStep }: ChoosePartyProps) {
  const [choosen, setChoosen] = useState<Array<Pokemon['ndex']>>([]);

  function selectUnselect(ndex: Pokemon['ndex']) {
    const updatedChoosen = choosen.find(oldNdex => oldNdex === ndex)
      ? choosen.filter(oldNdex => oldNdex !== ndex)
      : [...choosen, ndex];
    setChoosen(updatedChoosen);
  }

  function onConfirmParty() {
    const socket = socketIOClient(SOCKET_ENDPOINT);
    socket.emit('player_selects_pokemon', choosen);
    socket.on('player_selects_pokemon', (ACK: boolean) => {
      socket.removeListener('player_selects_pokemon');
      if (ACK) setActiveStep(BattleStep.ChooseMoves);
      else alert('and error occured!');
    });
  }

  return (
    <div>
      <h5>Choose your Pokémon</h5>
      {pokemonList.map(({ ndex, image, name, types }) => (
        <div onClick={() => selectUnselect(ndex)} key={ndex}>
          <img src={image} alt={name} />
          {name}
          {types}
        </div>
      ))}
      <Button onClick={onConfirmParty}>Battle</Button>
    </div>
  );
}
