import React from 'react';
import styled from 'styled-components';
import { Touchable } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable/Touchable';
import { Type } from '../../../../types/Pokemon';
import { getTypeColor } from '../../../../components/Type';
import { Button } from '../../../../components/basics';

export const BattleArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PartyArea = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 140px;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    background: #1a4860;
    width: 70%;
    height: 60%;
    top: 60px;
    border-radius: 50%;
    border: 4px solid #96b6c2;
    z-index: 0;
  }
`;

export const MoveOptionsBox = styled.div`
  align-self: center;
  width: 90%;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(20, 20, 20, 0.5);
  border-radius: 16px;
  z-index: 2;
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
  position: absolute;
  bottom: -120px;
  left: 75px;
  width: 64%;
  align-self: center;
  display: flex;
  border: 1px solid #adadad;
  border-radius: 8px;
  overflow: hidden;
  z-index: 0;
`;

export const EnergyBar = styled.div<{ empty?: boolean }>`
  flex: 1;
  min-width: 20px;
  height: 16px;
  background-color: #9efb1b;
  background: ${props => props.empty
    ? 'linear-gradient(to bottom, gray 40%, lightgray 40%)'
    : 'linear-gradient(to bottom, #4259d8 40%, #5871ff 40%)'
  };
  :not(:last-child) {
    border-right: 2px solid #adadad;
  }
`;
export const EndTurnButton = styled(Button) <{ hidden?: boolean }>`
  ${props => props.hidden && 'visibility: hidden;'}
`;
