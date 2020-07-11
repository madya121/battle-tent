import React, { useState, useContext } from 'react';
import { Button } from '../../../../components/basics';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { emitPlayerReady, subscribeRoundStarted } from '../../../../api';
import { TileContainer, Tile, TileDetail } from './ChooseParty.styled';
import { append, without } from 'ramda';
import GamplayContext from '../../GameplayContext';
import { getPokemonModel } from '../../../../components/PokemonModel/helper';
import Modal from '../../../../components/Modal';
import TypeLabel from '../../../../components/Type';

export interface ChoosePartyProps {
  onFinish: () => void;
}

export default function ChooseParty({ onFinish }: ChoosePartyProps) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [choosen, setChoosen] = useState<Array<number>>([]);
  const [alertShown, setAlertShown] = useState(false);
  const [confirmShown, setConfirmShown] = useState(false);
  const {
    availablePokemon,
    updateParties,
    changeTurn,
  } = useContext(GamplayContext);

  function choosePokemon(index: number) {
    const updatedChoosen = choosen.includes(index)
      ? without([index], choosen)
      : choosen.length === 3
        ? choosen // party is full
        : append(index, choosen);
    setChoosen(updatedChoosen);
  }

  function ready() {
    const sRoundStarted = subscribeRoundStarted(({ parties, ...battleState }) => {
      setIsWaiting(false);
      sRoundStarted.off();
      updateParties(parties);
      changeTurn(battleState);
      onFinish();
    });
    emitPlayerReady(choosen);
    setIsWaiting(true);
  }

  function onConfirmParty() {
    const { length } = choosen;
    if (length === 0) {
      setAlertShown(true);
      return;
    } else if (length < 3 && confirmShown === false) {
      setConfirmShown(true);
      return;
    }
    ready();
  }

  return isWaiting
    ? (
      <div>
        <LoadingIndicator />
        <p>waiting for opponent...</p>
      </div>
    ) : (
      <div>
        <h5>Choose your Pokémon</h5>
        <TileContainer>
          {availablePokemon.map(({ name, types }, index) => (
            <Tile
              chosen={choosen.includes(index)}
              onClick={() => choosePokemon(index)}
              key={index}
            >
              <img
                src={getPokemonModel(name)}
                alt={name}
              />
              <TileDetail>
                <div>{name}</div>
                <TypeLabel types={types} icon />
              </TileDetail>
            </Tile>
          ))}
        </TileContainer>
        <Button onClick={onConfirmParty}>Battle!</Button>
        <Modal shown={alertShown} onClose={() => setAlertShown(false)}>
          Please select pokemon for your party!
          <Button onClick={() => setAlertShown(false)}>OK</Button>
        </Modal>
        <Modal shown={confirmShown} onClose={() => setConfirmShown(false)}>
          You only selected {choosen.length} pokemon for your party. Are you sure?
          <Button onClick={() => setConfirmShown(false)}>No</Button>
          <Button onClick={onConfirmParty}>Yes</Button>
        </Modal>
      </div>
    );
}
