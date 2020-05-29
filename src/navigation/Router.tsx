import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TitleScreen from '../screens/Title';
import LoginScreen from '../screens/Login';
import LobbyScreen from '../screens/Lobby';
import BattleScreen from '../screens/Battle';
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
  const [screenState, setScreenState] = useState(ScreenState.Title);

  function ActiveScreen() {
    switch (screenState) {
      case ScreenState.Login: return <LoginScreen />;
      case ScreenState.Lobby: return <LobbyScreen />;
      case ScreenState.Battle: return <BattleScreen />;
      default: return <TitleScreen />;
    }
  }

  return (
    <NavigationContext.Provider value={setScreenState}>
      <ActiveScreen />
    </NavigationContext.Provider>
  );
}
