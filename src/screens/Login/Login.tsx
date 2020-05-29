import React, { useContext, useEffect, useState } from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { subscribeLoggedIn, emitLogin } from '../../api';
import { Input, Button } from '../../components/basics';
import { LayoutContainer } from './Login.styled';
import { TITLE_SCREEN_BGM_PATH } from '../../constants/paths/audio';
import Music from '../../Music';

const titleScreenBgm = new Audio(TITLE_SCREEN_BGM_PATH);

export default function Login() {
  const [username, setUsername] = useState('');

  const navigate = useContext(NavigationContext);

  function onClickLogin() {
    emitLogin(username);
  }

  useEffect(() => {
    Music.play(titleScreenBgm, { delay: 0 });
    return () => {
      Music.stop();
    }
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const s = subscribeLoggedIn(() => navigate(ScreenState.Lobby));
    return function unsubscribe() {
      s.off();
    }
  }, [navigate]);

  return (
    <LayoutContainer>
      <header>
        <div>Welcome to</div>
        <h1>Battle Tent</h1>
      </header>
      <main>
        <h5>What is your display name?</h5>
        <Input
          autoFocus
          placeholder="...Trainer123"
          onChange={e => setUsername(e.target.value)}
        />
        <Button onClick={onClickLogin}>Enter</Button>
      </main>
    </LayoutContainer>
  );
}
