import styled from 'styled-components';

const ChatBalloon = styled.div<{ shown: boolean }>`
  position: fixed;
  visibility: ${props => props.shown ? 'visible' : 'hidden'};
  padding: 8px;
  min-width: 100px;
  background-color: white;
  color: black;
  border-radius: 12px;
  border: 2px solid gray;

  &:before {
    content: '';
    position: absolute;
    border: 9px solid;
  }

  &:after {
    content: '';
    position: absolute;
    border: 8px solid;
  }
`;

export const PlayerChatBalloon = styled(ChatBalloon) <{ shown: boolean }>`
  // set directly besides player avatar
  bottom: 64px;
  left: 80px;

  &:before {
    bottom: -18px;
    left: 6px;
    border-color: gray transparent transparent gray;
  }

  &:after {
    bottom: -12px;
    left: 8px;
    border-color: white transparent transparent white;
  }
`;

export const EnemyChatBalloon = styled(ChatBalloon) <{ shown: boolean }>`
  // set directly besides enemy avatar
  top: 64px;
  right: 80px;

  &:before {
    top: -18px;
    right: 6px;
    border-color: transparent gray gray transparent;
  }

  &:after {
    top: -12px;
    right: 8px;
    border-color: transparent white white transparent;
  }
`;