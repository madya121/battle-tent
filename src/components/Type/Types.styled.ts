import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  color: white;
`;

export const TypeLabel = styled.div`
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  min-width: 24px;
  min-height: 28px;

  &:not(:first-child) {
    margin-left: 4px;
  }
`;

export const TypeIcon = styled.img<{ color: string }>`
  position: absolute;
  width: 24px;
  height: 24px;
  color: white;
  background-color: ${props => props.color};
  padding: 2px;
  border-radius: 50%;
  z-index: 1;
`;

export const TypeText = styled.div<{ color: string; hidden: boolean }>`
  transition: opacity 1s cubic-bezier(0.15, 0.3, 0.25, 1) 2s;
  opacity: ${props => props.hidden ? 0 : 1};
  min-width: 56px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.3px;
  background-color: ${props => props.color};
  padding: 1px 4px 2px;
  border-radius: 0 4px 4px 0;
  margin-left: 24px;
`;
