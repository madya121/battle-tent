import React, { useState, useContext, useEffect } from 'react';
import { Input, Button, Centered } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import LoadingIndicator from '../../components/LoadingIndicator';
import { NavigationContext, ScreenState } from '../../navigation';
import { LayoutContainer } from './Lobby.styled';
import audio from '../../audio';
import {
  subscribeFindingMatch,
  subscribeCancelledFindingMatch,
  subscribeFindingAi,
  subscribeJoinedTheRoom,
  emitFindMatch,
  emitCancelFindMatch,
  emitPlaySinglePlayer,
} from '../../api';
import Navbar from '../../components/Navbar';
import Banner from '../../components/Banner';
import Logo from '../../assets/images/ui/logo.png';
import Welcome from '../../assets/images/ui/welcome.png';
import { PlayerContext } from '../../auth';
import { PreloadContext } from '../../assets/preloading';

const LobbyScreenBgm = require('../../assets/audio/bgm/2-41_Battle_Tower.mp3');

export default function Lobby() {
  const [inviteModalShown, setInviteModalShown] = useState(false);
  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const navigate = useContext(NavigationContext);

  useEffect(() => {
    audio.playBgm(LobbyScreenBgm);
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const sFindingMatch = subscribeFindingMatch(() => setIsFindingMatch(true));
    const sFindingAi = subscribeFindingAi(() => setIsFindingMatch(true));
    const sCancelledFindingMatch = subscribeCancelledFindingMatch(() => {
      setIsFindingMatch(false);
    });
    const sJoinedTheRoom = subscribeJoinedTheRoom(() => {
      setIsFindingMatch(false);
      navigate(ScreenState.Room);
    });
    return function unsubscribe() {
      sFindingMatch.off();
      sFindingAi.off();
      sJoinedTheRoom.off();
      sCancelledFindingMatch.off();
    }
  }, [navigate]);

  const [player] = useContext(PlayerContext);
  const { lobbyScreenLoading } = useContext(PreloadContext);

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
      <header style={{ marginTop: 80 }}>
        <Navbar />
        <Centered>
          <img src={Logo} alt='Battle Tent' style={{ width: 200 }} />
          <img src={Welcome} alt='Welcome' style={{ width: 250 }} />
          <Banner style={{ marginBottom: 20 }}>{player.name}</Banner>
        </Centered>
      </header>
      <main style={{ flex: 1 }}>
        <InviteModal shown={inviteModalShown} onClose={closeInviteModal} />
        {lobbyScreenLoading
          ? <LoadingIndicator />
          : isFindingMatch ? (
            <>
              <LoadingIndicator />
              <Button onClick={emitCancelFindMatch}>Cancel</Button>
            </>
          ) : (
              <>
                <Button onClick={emitPlaySinglePlayer}>Single Player</Button>
                <Button onClick={() => navigate(ScreenState.GymChallenge)}>Gym Challenge</Button>
                <Button onClick={emitFindMatch}>Find Match</Button>
                <Button disabled onClick={openInviteModal}>Invite</Button>
              </>
            )}
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
