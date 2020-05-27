import React, { useState } from 'react';
import Pokemon from '../../../../types/Pokemon';
import { Button } from '../../../../components/basics';
import { BattleStep } from '../../enums';
import { emitSelectParty } from '../../../../api';
import { TileContainer, Tile, TileDetail } from './ChooseParty.styled';
import { find, equals, append, without } from 'ramda';

export interface ChoosePartyProps {
  pokemonList: Pokemon[];
  setActiveStep: React.Dispatch<React.SetStateAction<BattleStep>>;
}

export default function ChooseParty({ pokemonList, setActiveStep }: ChoosePartyProps) {
  const [choosen, setChoosen] = useState<Array<Pokemon['ndex']>>([]);

  function choosePokemon(ndex: Pokemon['ndex']) {
    const updatedChoosen = find(equals(ndex))(choosen)
      ? without([ndex], choosen)
      : append(ndex, choosen);
    setChoosen(updatedChoosen);
  }

  async function onConfirmParty() {
    emitSelectParty(choosen);
    setActiveStep(BattleStep.ChooseMoves);
  }

  return (
    <div>
      <h5>Choose your Pokémon</h5>
      <TileContainer>
        {pokemonList.map(({ ndex, image, name, types }) => (
          <Tile onClick={() => choosePokemon(ndex)} key={ndex}>
            <img src={image} alt={name} />
            <TileDetail>
              <div>{name}</div>
              <div>{types}</div>
            </TileDetail>
          </Tile>
        ))}
      </TileContainer>
      <Button onClick={onConfirmParty}>Battle</Button>
    </div>
  );
}
