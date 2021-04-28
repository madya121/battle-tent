import React from 'react';
import styled from 'styled-components';
import { Touchable } from '../basics';
import { TouchableProps } from '../basics/Touchable/Touchable';
import { Move, Type } from '../../types/Pokemon';
import Types, { getTypeColor } from '../Type';
import { EnergyBar } from '../../screens/Room/steps/Battle/Battle.styled';


interface MoveTileProps extends Pick<Move, 'name' | 'type' | 'power' | 'energy'>, TouchableProps {
  type: Type;
  chosen?: boolean;
  disabled?: boolean;
}

export default function MoveTile({
  name,
  type,
  power,
  energy,
  ...props
}: MoveTileProps) {
  return (
    <Container type={type} {...props} >
      <div>{name}</div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Types types={[type]} icon />
          {power}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <EnergyBar style={{ borderRadius: 4, marginRight: 2 }} />
          {energy}
        </div>

      </div>
    </Container>
  );
}

const Container = styled(
  ({ type, chosen, ...props }: Omit<MoveTileProps, 'name' | 'power' | 'energy'>) => <Touchable {...props} />
)`
  height: 36px;
  margin: 4px;
  padding: 8px;
  border-radius: 12px;
  background-color: ${props => getTypeColor(props.type)};
  ${props => props.chosen ? 'border: 1px solid white;' : ''}
  ${props => props.disabled ? 'color: gray;' : ''}
`;
