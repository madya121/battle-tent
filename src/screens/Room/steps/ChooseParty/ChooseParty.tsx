import React, { useState, useContext } from 'react';
import Pokemon from '../../../../types/Pokemon';
import { Button } from '../../../../components/basics';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { emitPlayerReady, subscribeRoundStarted } from '../../../../api';
import * as helper from '../../../../api/socket/helper';
import { TileContainer, Tile, TileDetail } from './ChooseParty.styled';
import { find, equals, append, without } from 'ramda';
import GamplayContext from '../../GameplayContext';
import { PlayerContext } from '../../../../auth';
import { getPokemonModel } from '../../../../components/PokemonModel/helper';

export interface ChoosePartyProps {
  onFinish: () => void;
}

export default function ChooseParty({ onFinish }: ChoosePartyProps) {
  const [isWaitingOpponent, setIsWaitingOpponent] = useState(false);
  const [choosen, setChoosen] = useState<Array<Pokemon['id']>>([]);
  const [player] = useContext(PlayerContext);
  const {
    availablePokemon,
    setParty,
    setOpponentParty,
  } = useContext(GamplayContext);

  function choosePokemon(pokemonId: Pokemon['id']) {
    const updatedChoosen = find(equals(pokemonId))(choosen)
      ? without([pokemonId], choosen)
      : append(pokemonId, choosen);
    setChoosen(updatedChoosen);
  }

  function ready() {
    if (!player) return;
    emitPlayerReady(choosen);
    const sRoundStarted = subscribeRoundStarted(battleState => {
      setIsWaitingOpponent(false);
      sRoundStarted.off();
      const { playerData, opponentData } = helper.splitPlayer(player, battleState);
      setParty(playerData.party);
      setOpponentParty(opponentData.party);
      onFinish();
    });
  }

  function onConfirmParty() {
    const { length } = choosen;
    if (length === 0) {
      alert('Please select pokemon for your party!');
      return;
    } else if (length < 3) {
      const confirm = window.confirm(
        `You only selected ${length} pokemon for your party. Are you sure?`
      );
      if (!confirm) return;
    }
    ready();
  }

  return isWaitingOpponent
    ? (
      <div>
        <LoadingIndicator />
        waiting for opponent
      </div>
    ) : (
      <div>
        <h5>Choose your Pokémon</h5>
        <TileContainer>
          {availablePokemon.map(({ id, name, types }, index) => (
            <Tile
              chosen={choosen.includes(id)}
              onClick={() => choosePokemon(id)}
              key={index}
            >
              <img
                src={getPokemonModel(name)}
                alt={name}
              />
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
