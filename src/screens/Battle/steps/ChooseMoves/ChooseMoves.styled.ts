import styled from 'styled-components';

export const PartyArea = styled.div`
  display: flex;
`;

export const PartyTile = styled.div<{ chosen: boolean }>`
`;
export const TileDetail = styled.div`
`;

export const HealthBar = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 8px;
  background-color: green;
  border: 1px solid white;
  border-radius: 8px;
`;
