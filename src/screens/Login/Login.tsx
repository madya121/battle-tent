import React, { useContext } from 'react';
import Auth from '../../utils/auth';
import { NavigationContext, ScreenState } from '../../navigation';
import { Input, Button } from '../../components/basics';

export default function Login() {
  const navigate = useContext(NavigationContext);

  function onLogin() {
    Auth.authenticate(() => {
      navigate(ScreenState.Lobby);
    });
  }

  return (
    <div>
      <header>
        <h1>Welcome to Battle Tent</h1>
      </header>
      <div>
        <h5>What is your display name?</h5>
        <Input />
        <Button onClick={onLogin}>Enter</Button>
      </div>
    </div>
  );
}
