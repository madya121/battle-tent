import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TitleScreen from '../screens/Title';
import LoginScreen from '../screens/Login';
import LobbyScreen from '../screens/Lobby';
import GymChallengeScreen from '../screens/GymChallenge';
import RoomScreen from '../screens/Room';
import ConnectionProblemIndicator from '../components/ConnectionProblemIndicator';
import { NavigationContext, ScreenState } from '.';
import styled from 'styled-components';

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
      case ScreenState.GymChallenge: return <GymChallengeScreen />;
      case ScreenState.Room: return <RoomScreen />;
      default: return <TitleScreen />;
    }
  }

  return (
    <NavigationContext.Provider value={setScreenState}>
      <ScreenContainer>
        <ActiveScreen />
        <ConnectionProblemIndicator />
      </ScreenContainer>
    </NavigationContext.Provider>
  );
}

const ScreenContainer = styled.div`
  max-width: 425px;
  margin: auto;
  overflow: hidden;
  position: relative;
`;
