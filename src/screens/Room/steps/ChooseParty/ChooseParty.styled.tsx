import React from 'react';
import styled from 'styled-components';
import { Touchable } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable';

export const PokemonSummaryContainer = styled.div`
  flex: 1;
  background-color: rgb(252, 88, 73);
  box-shadow: rgb(192, 54, 45) -2px -4px 2px 1px inset;
  border-radius: 16px;
  margin: 16px;
  padding: 6px 8px 9px 6px;
  display: flex;
`;

export const PokemonSummary = styled.div`
  flex: 1;
  border-radius: 8px;
  box-shadow: grey 1px 2px 3px 1px inset;
  padding: 8px;
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

export const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px;
  justify-content: center;
`;

export const Tile = styled(
  ({ chosen, ...props }: { chosen?: boolean } & TouchableProps) =>
    <Touchable {...props} />
)`
  width: 100px;
  height: 100px;
  margin: 8px;
  filter: ${({ chosen }) =>
    chosen ? 'drop-shadow(0 0 0.25rem lightyellow)' : 'none'
  };
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
