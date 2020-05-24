import React, { useContext } from 'react';
import Auth from '../../utils/auth';
import { NavigationContext, ScreenState } from '../../navigation';
import { Input, Button } from '../../components/basics';
import { LayoutContainer } from './Login.styled';

export default function Login() {
  const navigate = useContext(NavigationContext);

  function onLogin() {
    Auth.authenticate(() => {
      navigate(ScreenState.Lobby);
    });
  }

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
