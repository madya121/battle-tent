import React, { useContext, useEffect, useState } from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { subscribeLoggedIn, emitLogin } from '../../api';
import { Input, Button } from '../../components/basics';
import { LayoutContainer, LogoHeader } from './Login.styled';
import audio from '../../audio';
import { PlayerContext } from '../../auth';
import Navbar from '../../components/Navbar';
import Logo from '../../assets/images/ui/logo.png';
import Modal from '../../components/Modal';
import Banner from '../../components/Banner';

const loginScreenBgm = require('../../assets/audio/bgm/03_Title_Screen.mp3');

export default function Login() {
  const [username, setUsername] = useState('');

  const navigate = useContext(NavigationContext);
  const [, setPlayer] = useContext(PlayerContext);

  function onClickLogin() {
    emitLogin(username);
  }

  useEffect(() => {
    audio.playBgm(loginScreenBgm, { delay: 0 });
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const s = subscribeLoggedIn(({ name, id, avatar }) => {
      setPlayer({ name, id, avatar });
      navigate(ScreenState.Lobby);
    });
    return function unsubscribe() {
      s.off();
    }
  }, [navigate, setPlayer]);

  return (
    <LayoutContainer>
      <LogoHeader>
        <img src={Logo} alt='Battle Tent' />
      </LogoHeader>
      <main style={{ flex: 2 }}>
        <Modal shown onClose={() => { }} hideBackdrop>
          <Banner>Welcome</Banner>
          <Navbar />
          <h3>What is your display name?</h3>
          <Input
            autoFocus
            placeholder="...Trainer123"
            onChange={e => setUsername(e.target.value)}
          />
          <Button onClick={onClickLogin}>Enter</Button>
        </Modal>
      </main>
    </LayoutContainer>
  );
}
