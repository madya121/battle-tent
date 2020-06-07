import React, { useState, useEffect } from 'react';
import { Sms as ChatIcon } from '@material-ui/icons';
import {
  emitChat,
  subscribeChat,
} from '../../../api';
import {
  QuickChatOption,
  quickChatOptionDisplay,
  availableOptions,
} from './constants';
import {
  Container,
  OptionModal,
  QuickChatBalloon,
  ModalToggle,
  Option,
} from './QuickChatPanel.styled';

export default function QuickChatPanel() {
  const [playerQuickChat, setPlayerQuickChat] = useState(QuickChatOption.None);
  const [isOptionShown, setIsOptionShown] = useState(false);
  const [clearChatCount, setClearChatCount] = useState(0);
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);

  useEffect(function subscribe() {
    const sChat = subscribeChat(({ name, message }) => {
      showQuickChat(QuickChatOption.WellPlayed);
    });

    return function unsubscribe() {
      sChat.off();
    }
  }, []);

  useEffect(function clearQuickChat() {
    if (clearChatCount <= 0) {
      setPlayerQuickChat(QuickChatOption.None);
    }
  }, [clearChatCount]);

  useEffect(function closeModalListener() {
    function onClickOutsideModal(event: MouseEvent) {
      if (
        isOptionShown &&
        modalRef &&
        !modalRef.contains(event.target as Node)
      ) {
        setIsOptionShown(false);
      }
    }

    window.addEventListener('click', onClickOutsideModal);
    return () => window.removeEventListener('click', onClickOutsideModal);
  }, [modalRef, isOptionShown]);

  function showQuickChat(option: QuickChatOption) {
    setPlayerQuickChat(option);
    setClearChatCount(count => count + 1);
    setTimeout(() => {
      setClearChatCount(count => count - 1);
    }, 2500);
  }

  function onClickSend(option: QuickChatOption) {
    setIsOptionShown(false);
    emitChat(option);
    showQuickChat(option); // TODO remove this dummy
  }

  return (
    <Container>
      <OptionModal shown={isOptionShown} ref={setModalRef}>
        {availableOptions.map(option => (
          <Option onClick={() => onClickSend(option)}>
            {quickChatOptionDisplay[option]}
          </Option>
        ))}
      </OptionModal>
      <QuickChatBalloon shown={playerQuickChat !== QuickChatOption.None}>
        {quickChatOptionDisplay[playerQuickChat]}
      </QuickChatBalloon>
      <ModalToggle onClick={() => setIsOptionShown(!isOptionShown)}>
        <ChatIcon />
      </ModalToggle>
    </Container>
  );
}
