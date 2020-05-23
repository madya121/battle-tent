import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../screens/Login';
import Lobby from '../screens/Lobby';
import Battle from '../screens/Battle';
import { NavigationContext, ScreenState } from '.';

export default function UrlRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StateRouter} />
        <Route path="/about">
          <h3>About</h3>
        </Route>
        <Redirect to="/" /> {/* redirect any other path to here */}
      </Switch>
    </BrowserRouter>
  );
}

function StateRouter() {
  const [screenState, setScreenState] = useState(ScreenState.Login);

  function ActiveScreen() {
    switch (screenState) {
      case ScreenState.Lobby: return <Lobby />;
      case ScreenState.Battle: return <Battle />;
      default: return <Login />;
    }
  }

  return (
    <NavigationContext.Provider value={setScreenState}>
      <ActiveScreen />
    </NavigationContext.Provider>
  );
}
