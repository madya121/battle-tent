import React from 'react';
import { useHistory, useLocation } from 'react-router';
import Auth from '../../utils/auth';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const defaultLocationState = { from: { pathname: '/' } };
  const { from } = (location.state || defaultLocationState) as { from: Location };

  function onLogin() {
    Auth.authenticate(() => {
      // After you login, you are redirected back to the protected page.
      history.replace(from);
      // Notice the URL change each time. If you click the back button
      // at this point, would you expect to go back to the login page? No!
      // You're already logged in. You'll see you go back to the page
      // you visited just *before* logging in, the public page.
    });
  }

  return (
    <div>
      <header>
        <h1>Welcome to Battle Tent</h1>
      </header>
      <div>
        <h5>What is your display name?</h5>
        <input />
        <button onClick={onLogin}>Enter</button>
      </div>
    </div>
  );
}
