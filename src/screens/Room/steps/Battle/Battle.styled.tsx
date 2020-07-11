import React from 'react';
import styled from 'styled-components';
import { Touchable } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable/Touchable';

export const BattleArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const PartyArea = styled.div`
  display: flex;
  align-items: flex-end;
`;

type PartyTileProps = { chosen?: boolean, blurred?: boolean } & TouchableProps;

export const PokemonTile = styled(
  ({ chosen, blurred, ...props }: PartyTileProps) => <Touchable {...props} />
)`
  width: 25%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 8px;
  filter: ${({ chosen, blurred }) =>
    chosen ? 'drop-shadow(0 0 0.25rem lightyellow)' : 'none'
  };
`;

export const TileDetail = styled.div`
  text-transform: capitalize;
`;

export const MoveOptionBox = styled.div`
  align-self: center;
  width: 90%;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: cadetblue;
  border-radius: 16px;
`;

export const MoveTile = styled(
  ({ chosen, disabled, ...props }: { chosen: boolean; disabled: boolean } & TouchableProps) =>
    disabled ? <div {...props} /> : <Touchable {...props} />
)`
  height: 36px;
  margin: 4px;
  padding: 8px;
  background-color: teal;
  border-radius: 12px;
  ${props => props.chosen ? 'border: 1px solid white;' : ''}
  ${props => props.disabled ? 'color: gray;' : ''}
`;

export const EnergyBarContainer = styled.div`
  align-self: center;
  width: 90%;
  display: flex;
  margin: 4px;
  background-color: teal;
  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;
`;

export const EnergyBar = styled.div<{ empty?: boolean }>`
  flex: 1;
  min-width: 20px;
  height: 16px;
  background-color: #9efb1b;
  background: ${props => props.empty
    ? 'linear-gradient(to bottom, gray 40%, lightgray 40%)'
    : 'linear-gradient(to bottom, #96ee18 40%, #9efb1b 40%)'
  };
  :not(:last-child) {
    border-right: 2px solid teal;
  }
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
