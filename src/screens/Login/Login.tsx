import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { fakeAuth } from '../../utils/auth';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const defaultLocationState = { from: { pathname: '/' } };
  const { from } = (location.state || defaultLocationState) as { from: Location };

  function onLogin() {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  }

  return (
    <div>
      <header>
        <h1>Battle Tent</h1>
      </header>
      <div>
        <h5>What is your display name?</h5>
        <input />
        <button onClick={onLogin}>Enter</button>
      </div>
      {/*
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        </div>
      */}
    </div>
  );
}
