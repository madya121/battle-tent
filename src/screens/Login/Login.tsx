import React, { useContext, useEffect, useState } from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { subscribeLoggedIn, emitLogin } from '../../api';
import { Input, Button } from '../../components/basics';
import { LayoutContainer, LogoHeader } from './Login.styled';
import Music from '../../Music';
import { PlayerContext } from '../../auth';
import Navbar from '../../components/Navbar';
import Logo from '../../assets/images/logo.png';
import Modal from '../../components/Modal';

const loginScreenBgm = new Audio(
  require('../../assets/audio/bgm/03_Title_Screen.mp3')
);

export default function Login() {
  const [username, setUsername] = useState('');

  const navigate = useContext(NavigationContext);
  const [, setPlayer] = useContext(PlayerContext);

  function onClickLogin() {
    emitLogin(username);
  }

  useEffect(() => {
    Music.play(loginScreenBgm, { delay: 0 });
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const s = subscribeLoggedIn(({ name }) => {
      setPlayer({ name, id: '0', avatar: '0' });
      // setPlayer(player); // TODO deprecate name, use player instead
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
          <Navbar />
          <h3>What is your display name?</h3>
          <Input
            autoFocus
            placeholder="...Trainer123"
            onChange={e => setUsername(e.target.value)}
          />
          <Button onClick={onClickLogin}>{' '}</Button>
        </Modal>
      </main>
    </LayoutContainer>
  );
}
