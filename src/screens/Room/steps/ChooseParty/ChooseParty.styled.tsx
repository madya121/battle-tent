import React from 'react';
import styled from 'styled-components';
import { Touchable } from '../../../../components/basics';
import { TouchableProps } from '../../../../components/basics/Touchable/Touchable';

export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 16px;
`;

export const Tile = styled(
  ({ chosen, ...props }: { chosen?: boolean } & TouchableProps) =>
    <Touchable {...props} />
)`
  border: 1px solid ${props => props.chosen ? 'yellow' : 'white'};
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
`;

export const TileDetail = styled.div`
  text-transform: capitalize;
`;
