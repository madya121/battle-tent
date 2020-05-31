import React, { useState, useContext, useEffect } from 'react';
import { Input, Button } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import LoadingIndicator from '../../components/LoadingIndicator';
import { NavigationContext, ScreenState } from '../../navigation';
import { LayoutContainer } from './Lobby.styled';
import { LOBBY_BGM_PATH } from '../../constants/paths/audio';
import Music from '../../Music';
import {
  subscribeFindingMatch,
  subscribeCancelledFindingMatch,
  subscribeJoinedTheRoom,
  emitFindMatch,
  emitCancelFindMatch,
} from '../../api';
import Navbar from '../../components/Navbar';

const LobbyScreenBgm = new Audio(LOBBY_BGM_PATH);

export default function Lobby() {
  const [inviteModalShown, setInviteModalShown] = useState(false);
  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const navigate = useContext(NavigationContext);

  useEffect(() => {
    Music.play(LobbyScreenBgm);
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const sFindingMatch = subscribeFindingMatch(() => setIsFindingMatch(true));
    const sCancelledFindingMatch = subscribeCancelledFindingMatch(() => {
      setIsFindingMatch(false);
    });
    const sJoinedTheRoom = subscribeJoinedTheRoom(() => {
      setIsFindingMatch(false);
      navigate(ScreenState.Battle);
    });
    return function unsubscribe() {
      sFindingMatch.off();
      sJoinedTheRoom.off();
      sCancelledFindingMatch.off();
    }
  }, [navigate]);

  async function onClickFindMatch() {
    emitFindMatch();
  }

  async function onClickCancelFindMatch() {
    emitCancelFindMatch();
  }

  async function onInviteMatch() {
    setIsFindingMatch(true);
    try {
      const response = await fetch('');
      if (response.status !== 200) throw response;
    } catch (e) {
      console.error(e);
      alert(e);
    }
    setIsFindingMatch(false);
  }

  function openInviteModal() {
    setInviteModalShown(true);
    onInviteMatch();
  }

  function closeInviteModal() {
    setInviteModalShown(false);
  }

  return (
    <LayoutContainer>
      <header>
        <Navbar />
        <h1>Battle Tent</h1>
      </header>
      <main>
        <InviteModal shown={inviteModalShown} onClose={closeInviteModal} />
        {isFindingMatch ? (
          <>
            <LoadingIndicator />
            <Button onClick={onClickCancelFindMatch}>Cancel Find Match</Button>
          </>
        ) :
          <div>
            <Button onClick={onClickFindMatch}>Find Match</Button>
            <Button disabled onClick={openInviteModal}>Invite</Button>
          </div>
        }
      </main>
    </LayoutContainer>
  );
}

function InviteModal({ shown, onClose }: Omit<ModalProps, 'children'>) {
  return (
    <Modal shown={shown} onClose={onClose}>
      Who do you want to invite?
      <Input />
    </Modal>
  );
}
