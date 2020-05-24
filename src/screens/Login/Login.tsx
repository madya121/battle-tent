import React, { useContext, useEffect } from 'react';
import Auth from '../../utils/auth';
import { NavigationContext, ScreenState } from '../../navigation';
import { Input, Button } from '../../components/basics';
import { LayoutContainer } from './Login.styled';
import { TITLE_SCREEN_BGM_PATH } from '../../constants/paths/audio';
import { fadeAudio } from '../../utils/audio';

const titleScreenBgm = new Audio(TITLE_SCREEN_BGM_PATH);

export default function Login() {
  const navigate = useContext(NavigationContext);

  function onLogin() {
    Auth.authenticate(() => {
      navigate(ScreenState.Lobby);
    });
  }

  useEffect(() => {
    titleScreenBgm.volume = .2;
    titleScreenBgm.play();
    return () => {
      fadeAudio(titleScreenBgm)
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
        <Input autoFocus placeholder="...Trainer123" />
        <Button onClick={onLogin}>Enter</Button>
      </main>
    </LayoutContainer>
  );
}
