import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton } from '../../../components/basics';
import { Sms as ChatIcon, Duo } from '@material-ui/icons';
import {
  emitChat,
  subscribeChat,
} from '../../../api';
import { QuickChatOption } from './enums';

export default function QuickChatPanel() {
  const [playerQuickChat, setPlayerQuickChat] = useState(QuickChatOption.None);
  const [isOptionShown, setIsOptionShown] = useState(false);
  const [clearChatCount, setClearChatCount] = useState(0);

  useEffect(function subscribe() {
    const sChat = subscribeChat(({ name, message }) => {
      showQuickChat(QuickChatOption.WellPlayed);
    });

    return function unsubscribe() {
      sChat.off();
    }
  }, []);

  useEffect(() => {
    if (clearChatCount <= 0) {
      setPlayerQuickChat(QuickChatOption.None);
    }
  }, [clearChatCount]);

  function showQuickChat(option: QuickChatOption) {
    setPlayerQuickChat(option);
    setClearChatCount(count => count + 1);
    setTimeout(() => {
      setClearChatCount(count => count - 1);
    }, 2500);
  }

  function onClickSend() {
    emitChat(playerQuickChat);
    setIsOptionShown(false);
    showQuickChat(QuickChatOption.OK); // TODO remove this dummy
  }

  return (
    <Container>
      <OptionModal shown={isOptionShown}>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
        <IconButton onClick={onClickSend}><Duo /></IconButton>
      </OptionModal>
      <QuickChatBalloon shown={playerQuickChat !== QuickChatOption.None}>
        {playerQuickChat}
      </QuickChatBalloon>
      <ModalToggle onClick={() => setIsOptionShown(!isOptionShown)}>
        <ChatIcon />
      </ModalToggle>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 120px;
  display: flex;
  align-items: flex-end;
`;

const ModalToggle = styled(IconButton)`
  left: 0;
  bottom: 0;
  overflow: scroll;
`;

// top: ${props => props.shown ? 0 : '120px'};
const OptionModal = styled.div<{ shown: boolean }>`
  position: absolute;
  left: 40px;
  height: ${props => props.shown ? '100%' : 0};
  width: ${props => props.shown ? 'calc(100% - 80px)' : 0};
  display: flex;
  background-color: white;
  overflow-y: scroll;
  flex-wrap: wrap;
  transition: width .2s, height .2s, transform .2s;
`;

const QuickChatBalloon = styled.div<{ shown: boolean }>`
  position: absolute;
  left: 40px;
  bottom: 0;
  display: ${props => props.shown ? 'block' : 'none'};
  background-color: white;
  color: black;
  padding: 8px;
  min-width: 100px;
`;
