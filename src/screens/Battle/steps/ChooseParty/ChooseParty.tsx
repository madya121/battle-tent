import React, { useState, useEffect, useContext } from 'react';
import Pokemon from '../../../../types/Pokemon';
import { Button } from '../../../../components/basics';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { BattleStep } from '../../enums';
import {
  fetchPokemonList,
  emitSelectParty,
  subscribePartySelected,
} from '../../../../api';
import { TileContainer, Tile, TileDetail } from './ChooseParty.styled';
import { find, equals, append, without, filter } from 'ramda';
import GamplayContext from '../../GameplayContext';

export interface ChoosePartyProps {
  setActiveStep: React.Dispatch<React.SetStateAction<BattleStep>>;
}

export default function ChooseParty({
  setActiveStep,
}: ChoosePartyProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [choosen, setChoosen] = useState<Array<Pokemon['ndex']>>([]);
  const { setParty } = useContext(GamplayContext);

  useEffect(() => {
    setIsLoading(true);
    getPokemonList().finally(() => setIsLoading(false));
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const sPartySelected = subscribePartySelected(party => {
      const choosenPokemon = filter(
        ({ ndex }) => party.includes(ndex),
        pokemonList
      );
      setParty(choosenPokemon);
      setActiveStep(BattleStep.ChooseMoves);
    });

    return function unsubscribe() {
      sPartySelected.off();
    }
  }, [pokemonList, setActiveStep, setParty]);

  async function getPokemonList() {
    const response = await fetchPokemonList();
    setPokemonList(response.data);
  }
  function choosePokemon(ndex: Pokemon['ndex']) {
    const updatedChoosen = find(equals(ndex))(choosen)
      ? without([ndex], choosen)
      : append(ndex, choosen);
    setChoosen(updatedChoosen);
  }

  async function onConfirmParty() {
    const { length } = choosen;
    if (length === 0) {
      alert('Please select pokemon for your party!');
    } else if (length < 3) {
      const confirm = window.confirm(
        `You only selected ${length} pokemon for your party. Are you sure?`
      );
      if (confirm) {
        emitSelectParty(choosen);
      }
    }
  }

  return isLoading ? <LoadingIndicator /> : (
    <div>
      <h5>Choose your Pokémon</h5>
      <TileContainer>
        {pokemonList.map(({ ndex, image, name, types }) => (
          <Tile
            choosen={choosen.includes(ndex)}
            onClick={() => choosePokemon(ndex)}
            key={ndex}
          >
            <img src={image} alt={name} />
            <TileDetail>
              <div>{name}</div>
              <div>{types}</div>
            </TileDetail>
          </Tile>
        ))}
      </TileContainer>
      <Button onClick={onConfirmParty}>Battle!</Button>
    </div>
  );
}
