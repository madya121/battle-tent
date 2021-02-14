import styled from 'styled-components';

export const BattleArea = styled.div`
  height: 375px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
`;

export const PartyArea = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 140px;
`;

export const MoveOptionsBox = styled.div`
  height: 60px;
  max-width: 100%;
  margin: 0 16px;
  background-color: rgba(20, 20, 20, 0.5);
  border-radius: 16px;
  z-index: 2;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const EnergyBarContainer = styled.div`
  position: absolute;
  bottom: -30px; /* TODO fix this to align with any device */
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
