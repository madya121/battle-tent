import styled from 'styled-components';
import { IconButton } from '../../../components/basics';

export const Container = styled.div`
  position: relative;
  height: 120px;
  display: flex;
  align-items: flex-end;
`;

export const ModalToggle = styled(IconButton)`
  left: 0;
  bottom: 0;
  overflow: scroll;
`;

// top: ${props => props.shown ? 0 : '120px'};
export const OptionModal = styled.div<{ shown: boolean }>`
  position: absolute;
  left: 40px;
  height: ${props => props.shown ? '100%' : 0};
  width: ${props => props.shown ? 'calc(100% - 60px)' : 0};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow-y: scroll;
  flex-wrap: wrap;
  transition: width .2s, height .2s, transform .2s;
`;

export const QuickChatBalloon = styled.div<{ shown: boolean }>`
  position: absolute;
  left: 40px;
  bottom: 0;
  display: ${props => props.shown ? 'block' : 'none'};
  padding: 8px;
  min-width: 100px;
`;

export const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 4px;
  background-color: 
  cursor: pointer;
  &&:hover {
    background-color: gray;
  }
`;
