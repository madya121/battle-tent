import React from 'react';
import styled from 'styled-components';
import { Touchable } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable/Touchable';

export const BattleArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PartyArea = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const PartyTile = styled(
  ({ chosen, blurred, ...props }: { chosen?: boolean, blurred?: boolean } & TouchableProps) =>
    <Touchable {...props} />
)`
  margin: 8px;
  filter: ${({ chosen, blurred }) =>
    chosen ? 'drop-shadow(0 0 0.25rem lightyellow)' : 'none'
  };
`;

export const TileDetail = styled.div`
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
  ({ chosen, ...props }: { chosen?: boolean } & TouchableProps) =>
    <Touchable {...props} />
)`
  height: 36px;
  margin: 4px;
  padding: 8px;
  background-color: teal;
  border-radius: 12px;
  ${props => props.chosen ? 'border: 1px solid white;' : ''}
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

export const EnergyBar = styled.div<{ used?: boolean }>`
  flex: 1;
  min-width: 20px;
  height: 16px;
  background-color: #9efb1b;
  background: ${props => props.used
    ? 'linear-gradient(to bottom, gray 40%, lightgray 40%)'
    : 'linear-gradient(to bottom, #96ee18 40%, #9efb1b 40%)'
  };
  :not(:last-child) {
    border-right: 2px solid teal;
  }
`;

export const HealthBar = styled.div<{ percentage: number }>`
  width: 80px;
  height: 8px;
  background: ${({ percentage }) => `
    linear-gradient(to right, #9efb1b ${percentage}%, gray ${percentage}%)
  `};
  border: 1px solid white;
  border-radius: 8px;
  box-sizing: border-box;
`;
