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
  ChooseButton,
  ChosenParty,
  PokemonIcon,
} from './ChooseParty.styled';
import { append, isNil, without } from 'ramda';
import GameplayContext from '../../GameplayContext';
import Modal from '../../../../components/Modal';
import { getPokemonModel } from '../../../../assets/animatedPokemon';
import { preloadImages } from '../../../../assets/preloading';
import { MoveTile } from '../Battle/Battle.styled';
import { kantoDex } from '../../../../constants/pokemonList';

export interface ChoosePartyProps {
  onFinish: () => void;
}

export default function ChooseParty({ onFinish }: ChoosePartyProps) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [chosen, setChosen] = useState<Array<number>>([]);
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

  useEffect(function monitorChosen() {
    if (chosen.length === 3) {
      setConfirmShown(true);
    }
  }, [chosen]);

  function choosePokemon() {
    if (isNil(highlightedIndex)) return;
    const updatedChosen = chosen.includes(highlightedIndex)
      ? without([highlightedIndex], chosen)
      : chosen.length === 3
        ? chosen // party is full
        : append(highlightedIndex, chosen);
    setChosen(updatedChosen);
  }

  function ready() {
    const sRoundStarted = subscribeRoundStarted(({ parties, ...battleState }) => {
      setIsWaiting(false);
      sRoundStarted.off();
      updateParties(parties);
      changeTurn(battleState);
      onFinish();
    });
    emitPlayerReady(chosen);
    setIsWaiting(true);
  }

  const highlightedPokemon = isNil(highlightedIndex) ? null : availablePokemon[highlightedIndex];
  const isHighlightedChosen = highlightedIndex !== null && chosen.includes(highlightedIndex);
  return isWaiting || imagesLoading
    ? (
      <div>
        <LoadingIndicator />
        <p>waiting for opponent...</p>
      </div>
    ) : (
      <LayoutContainer>
        <PokemonSummaryContainer>
          {highlightedPokemon && (
            <PokemonSummary>
              <LeftSummary>
                <img
                  alt={highlightedPokemon.name}
                  src={getPreviewImageSrc(highlightedPokemon.id)}
                  width="100px"
                />
                <PokemonName>{highlightedPokemon.name}</PokemonName>
              </LeftSummary>
              <RightSummary>
                {highlightedPokemon.moves.map((move, index) => (
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
        <ChooseButton
          onClick={choosePokemon}
          disabled={!isHighlightedChosen && (isNil(highlightedPokemon) || chosen.length === 3)}
        >
          {isHighlightedChosen ? 'Put back' : 'Choose'}
        </ChooseButton>
        <TileContainer>
          {availablePokemon.map(({ name }, index) => (
            <Tile
              chosen={chosen.includes(index)}
              onClick={() => setHighlightedIndex(index)}
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
          <ChosenParty>
            {chosen.map(pokemonIndex => {
              const pokemon = availablePokemon[pokemonIndex];
              return (
                <PokemonIcon
                  alt={pokemon.name}
                  src={`https://img.pokemondb.net/sprites/sword-shield/icon/${pokemon.name}.png`}
                />
              );
            })}
          </ChosenParty>
        </FixedBottomArea>
        <Modal shown={confirmShown} onClose={() => setConfirmShown(false)}>
          Fight along with these pokemon?
          <div style={{ display: 'flex' }}>
            <Button onClick={() => setConfirmShown(false)}>No</Button>
            <Button onClick={ready}>Yes</Button>
          </div>
        </Modal>
      </LayoutContainer>
    );
}
