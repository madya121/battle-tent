import styled from 'styled-components';
import { Touchable } from '../../../../components/basics';

export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 16px;
`;

export const Tile = styled(Touchable) <{ choosen?: boolean }>`
  border: 1px solid ${props => props.choosen ? 'yellow' : 'white'};
  margin: 8px;
`;

export const TileDetail = styled.div`
  font-weight: bold;
`;
