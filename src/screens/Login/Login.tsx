import React, {useContext, useEffect, useState} from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { subscribeLoggedIn, login } from '../../apis/battleApi';
import { Input, Button } from '../../components/basics';
import { LayoutContainer } from './Login.styled';
import { TITLE_SCREEN_BGM_PATH } from '../../constants/paths/audio';
import Music from '../../Music';

const titleScreenBgm = new Audio(TITLE_SCREEN_BGM_PATH);

export default function Login() {
  const [username, setUsername] = useState('');

  const navigate = useContext(NavigationContext);

  function onLogin() {
    login(username);
  }

  useEffect(() => {
    Music.play(titleScreenBgm);

    const s = subscribeLoggedIn(() => {
      navigate(ScreenState.Lobby);
    });

    return () => {
      Music.stop();

      s.off();
    }
  }, []);

  return (
    <LayoutContainer>
      <header>
        <div>Welcome to</div>
        <h1>Battle Tent</h1>
      </header>
      <main>
        <h5>What is your display name?</h5>
        <Input autoFocus placeholder="...Trainer123" onChange={(e) => setUsername(e.target.value)} />
        <Button onClick={onLogin}>Enter</Button>
      </main>
    </LayoutContainer>
  );
}
