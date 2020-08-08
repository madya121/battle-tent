import styled from 'styled-components';
import { IconButton } from '../../../components/basics';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ModalToggle = styled(IconButton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const OptionModal = styled.div<{ shown: boolean }>`
  position: absolute;
  right: 54px;
  bottom: 10px;
  height: ${props => props.shown ? '120px' : 0};
  width: ${props => props.shown ? 'calc(100% - 60px)' : 0};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow-y: scroll;
  flex-wrap: wrap;
  transition: width .2s, height .2s, transform .2s;
  background-color: darkgray;
  z-index: 2;
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
