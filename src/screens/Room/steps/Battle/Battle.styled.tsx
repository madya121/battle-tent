import React from 'react';
import styled from 'styled-components';
import { Touchable } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable/Touchable';
import { Type } from '../../../../types/Pokemon';
import { getTypeColor } from '../../../../components/Type';

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
  width: 100%;
`;

export const MoveOptionsBox = styled.div`
  align-self: center;
  width: 90%;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: cadetblue;
  border-radius: 16px;
`;

interface MoveTileProps extends TouchableProps {
  type: Type;
  chosen: boolean;
  disabled: boolean;
}

export const MoveTile = styled(
  ({ type, chosen, ...props }: MoveTileProps) => <Touchable {...props} />
)`
  height: 36px;
  margin: 4px;
  padding: 8px;
  border-radius: 12px;
  background-color: ${props => getTypeColor(props.type)};
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
