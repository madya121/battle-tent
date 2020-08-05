import React, { useContext } from 'react';
import styled from 'styled-components';
import GamplayContext from '../../GameplayContext';
import { getPokemonModel } from '../../../../components/PokemonModel/helper';
import { Touchable } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable/Touchable';
import Pokemon from '../../../../types/Pokemon';
import BattlingPokemon from '../../../../types/BattlingPokemon';
import { animateFainted } from './animate';

interface BattlingPokemonTileProps {
  chosen: boolean;
  name: Pokemon['name'];
  health: BattlingPokemon['health'];
  maxHealth: BattlingPokemon['maxHealth'];
  backSprite?: boolean;
  imageRef: React.RefObject<HTMLImageElement>;
  onClick: () => void;
}

export default function BattlingPokemonTile({
  chosen,
  name,
  health,
  maxHealth,
  backSprite,
  imageRef,
  onClick,
}: BattlingPokemonTileProps) {
  const { myTurn } = useContext(GamplayContext);
  const isFainted = health <= 0;

  if (isFainted) {
    setTimeout(() => animateFainted(imageRef.current), 500);
  }

  const src = getPokemonModel(name, backSprite ? 'back' : 'idle');
  return (
    <Container
      chosen={chosen}
      onClick={onClick}
      disabled={!myTurn || isFainted}
    >
      <TileImageContainer src={src} fainted={isFainted}>
        <img src={src} alt={name} ref={imageRef} />
      </TileImageContainer>
      <TileDetail fainted={isFainted}>
        <div>{name}</div>
        <HealthBar percentage={health / maxHealth * 100} />
      </TileDetail>
    </Container>
  );
}


interface PartyTileProps extends TouchableProps {
  chosen?: boolean;
  blurred?: boolean;
}

export const Container = styled(
  ({ chosen, blurred, ...props }: PartyTileProps) => <Touchable {...props} />
)`
  width: 20%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 8px;
  filter: ${({ chosen }) =>
    chosen ? 'drop-shadow(0 0 0.25rem lightyellow)' : 'none'
  };
  z-index: 1;
`;

export const TileImageContainer = styled.div<{ src: string; fainted: boolean; }>`
  position: relative;

  :after {
    content: "";
    visibility: ${props => props.fainted ? 'hidden' : 'visible'};
    position: absolute;
    background: url(${props => props.src});
    z-index: -1;
    bottom: -18px;
    left: 9px;
    height: 100%;
    width: 100%;
    filter: drop-shadow(-18px -4px 4px rgba(0,0,0,0.75));
    transform: skewX(-30deg) scaleY(0.2);
    filter: contrast(0%) grayscale(1) brightness(0.5) blur(8px);
    opacity: 0.3;
  }
`;

export const TileDetail = styled.div<{ fainted: boolean }>`
  text-transform: capitalize;
  visibility: ${props => props.fainted ? 'hidden' : 'visible'};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HealthBar = styled.div<{ percentage: number }>`
  width: 70px;
  height: 8px;
  background: ${({ percentage }) => `
    linear-gradient(to right, #9efb1b ${percentage}%, gray ${percentage}%)
  `};
  border: 1px solid white;
  border-radius: 8px;
  box-sizing: border-box;
`;
