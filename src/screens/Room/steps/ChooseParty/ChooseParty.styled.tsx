import React from 'react';
import styled from 'styled-components';
import { Touchable, Button } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable';

export const LayoutContainer = styled.div`
  height: 100%;
  margin: 0 16px;
  display: flex;
  flex-direction: column;
`;

export const PokemonSummaryContainer = styled.div`
  // TODO: make the height flexible
  // right now heigth: 100%; works if
  // the content height is less than the remaining space

  // deviceHeight - header - footer - selectionTiles - margin);
  height: calc(100vh - 100px - 100px - 232px - 16px);
  background-color: rgb(252, 88, 73);
  box-shadow: rgb(192, 54, 45) -2px -4px 2px 1px inset;
  border-radius: 16px;
  margin-bottom: 16px;
  padding: 6px 8px 9px 6px;
  display: flex;
`;

export const PokemonSummary = styled.div`
  max-height: 100%;
  width: 100%;
  border-radius: 8px;
  box-shadow: grey 1px 2px 3px 1px inset;
  padding: 8px;
  display: flex;
  align-items: center;
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 10px,
      rgba(0, 0, 121, 0.03) 12px,
      rgba(0, 0, 121, 0.03) 14px,
      transparent 16px,
      transparent 26px
    ) fixed,
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 10px,
      rgba(0, 0, 121, 0.03) 12px,
      rgba(0, 0, 121, 0.03) 14px,
      transparent 16px,
      transparent 26px
    ) fixed,
    radial-gradient(
      circle at 50% 0px,
      rgb(44, 255, 255),
      rgb(105, 255, 254) 35%,
      rgb(0, 141, 238)
    ) fixed;
`;

export const LeftSummary = styled.div`
`;

export const RightSummary = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export const PokemonName = styled.div`
  text-transform: capitalize;
  color: black;
`;

export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;

  // apply black backdrop
  background: #000d;
  border-radius: 12px;
  padding-bottom: 8px;
`;

export const Tile = styled(
  ({ chosen, ...props }: { chosen?: boolean } & TouchableProps) =>
    <Touchable {...props} />
)`
  width: 96px;
  height: 96px;
  filter: ${({ chosen }) =>
    chosen ? 'drop-shadow(0 0 0.3rem lightyellow)' : 'none'
  };
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const FixedBottomArea = styled.div`
  position: absolute;
  left: calc(16px + 68px);
  bottom: -74px; /* height of this entire div */
  width: calc(((100% - 32px) - 68px) - 48px);
  z-index: 1;
`;

export const BattleButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-size: 100% 100%;
  && {
    padding: 16px 32px;
  }
`;

export const ChosenParty = styled.div`
  flex: 1;
  display: flex;
`;

export const PokemonIcon = styled.img`
  object-fit: cover;
  width: 42px;
  height: 42px;
`;
