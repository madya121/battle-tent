import styled from 'styled-components';

export const BattleArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PartyArea = styled.div`
  display: flex;
`;

export const PartyTile = styled.div<{ chosen: boolean }>`
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

export const MoveTile = styled.div<{ chosen: boolean }>`
  height: 36px;
  margin: 4px;
  padding: 8px;
  background-color: teal;
  border-radius: 12px;
  ${props => props.chosen ? 'border: 1px solid white;' : ''}
`;

export const HealthBar = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 8px;
  background-color: green;
  border: 1px solid white;
  border-radius: 8px;
`;
