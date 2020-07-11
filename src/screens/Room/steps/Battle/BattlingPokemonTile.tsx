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

  return (
    <Container
      chosen={chosen}
      onClick={onClick}
      disabled={!myTurn || isFainted}
    >
      <img
        src={getPokemonModel(name, backSprite ? 'back' : 'idle')}
        alt={name}
        ref={imageRef}
      />
      <TileDetail fainted={isFainted}>
        <div>{name}</div>
        <HealthBar percentage={health / maxHealth * 100} />
      </TileDetail>
    </Container>
  );
}


type PartyTileProps = { chosen?: boolean, blurred?: boolean } & TouchableProps;

export const Container = styled(
  ({ chosen, blurred, ...props }: PartyTileProps) => <Touchable {...props} />
)`
  width: 25%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 8px;
  filter: ${({ chosen }) =>
    chosen ? 'drop-shadow(0 0 0.25rem lightyellow)' : 'none'
  };
`;

export const TileDetail = styled.div<{ fainted: boolean }>`
  text-transform: capitalize;
  ${props => props.fainted && 'visibility: hidden'}
`;

export const HealthBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 8px;
  background: ${({ percentage }) => `
    linear-gradient(to right, #9efb1b ${percentage}%, gray ${percentage}%)
  `};
  border: 1px solid white;
  border-radius: 8px;
  box-sizing: border-box;
`;
