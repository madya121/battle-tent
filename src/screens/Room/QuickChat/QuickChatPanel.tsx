import React, { useState, useEffect, useContext } from 'react';
import { Sms as ChatIcon } from '@material-ui/icons';
import { emitRoomChat, subscribeRoomChat } from '../../../api';
import {
  displayChatOption,
  QuickChatOption,
  availableOptions,
} from './constants';
import {
  Container,
  OptionModal,
  ModalToggle,
  Option,
} from './QuickChatPanel.styled';
import { PlayerChatBalloon, EnemyChatBalloon } from './ChatBalloon.styled';
import { PlayerContext } from '../../../auth';

export default function QuickChatPanel() {
  const [playerQuickChat, setPlayerQuickChat] = useState(QuickChatOption.None);
  const [enemyQuickChat, setEnemyQuickChat] = useState(QuickChatOption.None);
  const [clearPlayerChatCount, setClearPlayerChatCount] = useState(0);
  const [clearEnemyChatCount, setClearEnemyChatCount] = useState(0);
  const [isOptionShown, setIsOptionShown] = useState(false);
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);

  useEffect(function subscribe() {
    const sChat = subscribeRoomChat(({ chat, sender }) => {
      showQuickChat(chat, sender);
    });

    return function unsubscribe() {
      sChat.off();
    }
  }, []);

  useEffect(function clearQuickChat() {
    if (clearPlayerChatCount <= 0) {
      setPlayerQuickChat(QuickChatOption.None);
    }
  }, [clearPlayerChatCount]);

  useEffect(function clearQuickChat() {
    if (clearEnemyChatCount <= 0) {
      setEnemyQuickChat(QuickChatOption.None);
    }
  }, [clearEnemyChatCount]);

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

  const [player] = useContext(PlayerContext);

  function showQuickChat(chat: QuickChatOption, sender: string) {
    const CHAT_EXPIRY_DURATION = 2500;
    if (sender === player.id) {
      setPlayerQuickChat(chat);
      setClearPlayerChatCount(count => count + 1);
      setTimeout(() => {
        setClearPlayerChatCount(count => count - 1);
      }, CHAT_EXPIRY_DURATION);
    } else {
      setEnemyQuickChat(chat);
      setClearEnemyChatCount(count => count + 1);
      setTimeout(() => {
        setClearEnemyChatCount(count => count - 1);
      }, CHAT_EXPIRY_DURATION);
    }
  }

  function onClickSend(option: QuickChatOption) {
    setIsOptionShown(false);
    emitRoomChat(option);
  }

  return (
    <Container>
      <OptionModal shown={isOptionShown} ref={setModalRef}>
        {availableOptions.map(option => (
          <Option key={option} onClick={() => onClickSend(option)}>
            {displayChatOption(option)}
          </Option>
        ))}
      </OptionModal>
      <PlayerChatBalloon shown={playerQuickChat !== QuickChatOption.None}>
        {displayChatOption(playerQuickChat)}
      </PlayerChatBalloon>
      <ModalToggle onClick={() => setIsOptionShown(!isOptionShown)}>
        <ChatIcon />
      </ModalToggle>
      <EnemyChatBalloon shown={enemyQuickChat !== QuickChatOption.None}>
        {displayChatOption(enemyQuickChat)}
      </EnemyChatBalloon>
    </Container>
  );
}
