import React, { useState, useContext, useEffect } from 'react';
import { Button } from '../../../../components/basics';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { emitPlayerReady, subscribeRoundStarted } from '../../../../api';
import {
  LayoutContainer,
  PokemonSummaryContainer,
  PokemonSummary,
  PokemonName,
  TileContainer,
  Tile,
  LeftSummary,
  RightSummary,
  FixedBottomArea,
  BattleButton,
  ChosenParty,
  PokemonIcon,
} from './ChooseParty.styled';
import { append, without } from 'ramda';
import GameplayContext from '../../GameplayContext';
import Modal from '../../../../components/Modal';
import { getPokemonModel } from '../../../../assets/animatedPokemon';
import { preloadImages } from '../../../../assets/preloading';
import Pokemon from '../../../../types/Pokemon';
import { MoveTile } from '../Battle/Battle.styled';
import { kantoDex } from '../../../../constants/pokemonList';

export interface ChoosePartyProps {
  onFinish: () => void;
}

export default function ChooseParty({ onFinish }: ChoosePartyProps) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [highlighted, setHighlighted] = useState<Pokemon | null>(null);
  const [choosen, setChoosen] = useState<Array<number>>([]);
  const [alertShown, setAlertShown] = useState(false);
  const [confirmShown, setConfirmShown] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(true);
  const {
    availablePokemon,
    updateParties,
    changeTurn,
  } = useContext(GameplayContext);

  const getPreviewImageSrc = (id: string) =>
    require(`../../../../assets/images/pokemonPreview/${id}.png`);

  useEffect(function preloadAssets() {
    async function preloadIdleModels() {
      const pokemonIdleModels = kantoDex.map(name => getPokemonModel(name));
      await preloadImages(pokemonIdleModels);
    }
    async function preloadPreviews() {
      const pokemonPreviews = availablePokemon.map(
        ({ id }) => getPreviewImageSrc(id)
      );
      await preloadImages(pokemonPreviews);
    }

    async function preloadBackModels() {
      const pokemonBackModels = availablePokemon.map(
        ({ name }) => getPokemonModel(name, 'back')
      );
      await preloadImages(pokemonBackModels);
    }
    Promise.all([
      preloadIdleModels(),
      preloadPreviews(),
    ]).then(() => {
      setImagesLoading(false);
      preloadBackModels();
    });
  }, []);

  function choosePokemon(index: number) {
    setHighlighted(availablePokemon[index]);
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
      <LayoutContainer>
        <PokemonSummaryContainer>
          {highlighted && (
            <PokemonSummary>
              <LeftSummary>
                {imagesLoading ? <LoadingIndicator /> : (
                  <img
                    alt={highlighted.name}
                    src={getPreviewImageSrc(highlighted.id)}
                    width="100px"
                  />
                )}
                <PokemonName>{highlighted.name}</PokemonName>
              </LeftSummary>
              <RightSummary>
                {highlighted.moves.map((move, index) => (
                  <MoveTile
                    type={move.type}
                    chosen={false}
                    disabled={false}
                    key={index}
                  >
                    <div>{move.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <div>Power {move.power}</div>
                      <div>Energy {move.energy}</div>
                    </div>
                  </MoveTile>
                ))}
              </RightSummary>
            </PokemonSummary>
          )}
        </PokemonSummaryContainer>
        <TileContainer>
          {availablePokemon.map(({ name }, index) => (
            <Tile
              chosen={choosen.includes(index)}
              onClick={() => choosePokemon(index)}
              key={index}
            >
              <img
                src={getPokemonModel(name)}
                alt={name}
                style={{
                  maxHeight: 100,
                  maxWidth: 100,
                  imageRendering: 'pixelated',
                }}
              />
            </Tile>
          ))}
        </TileContainer>
        <FixedBottomArea>
          <BattleButton onClick={onConfirmParty}>
            <ChosenParty>
              {choosen.map(pokemonIndex => {
                const pokemon = availablePokemon[pokemonIndex];
                return (
                  <PokemonIcon
                    alt={pokemon.name}
                    src={`https://img.pokemondb.net/sprites/sword-shield/icon/${pokemon.name}.png`}
                  />
                );
              })}
            </ChosenParty>
            <div>Battle!</div>
          </BattleButton>
        </FixedBottomArea>
        <Modal shown={alertShown} onClose={() => setAlertShown(false)}>
          Please select pokemon for your party!
          <Button onClick={() => setAlertShown(false)}>OK</Button>
        </Modal>
        <Modal shown={confirmShown} onClose={() => setConfirmShown(false)}>
          You only selected {choosen.length} pokemon for your party. Are you sure?
          <Button onClick={() => setConfirmShown(false)}>No</Button>
          <Button onClick={onConfirmParty}>Yes</Button>
        </Modal>
      </LayoutContainer>
    );
}
