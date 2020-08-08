import React, { useContext, useEffect } from 'react';
import { Button, Centered } from '../../components/basics';
import { NavigationContext, ScreenState } from '../../navigation';
import { LayoutContainer } from './GymChallenge.styled';
import audio from '../../audio';
import {
  subscribeJoinedTheRoom,
  emitChallengeGymLeader,
} from '../../api';
import Navbar from '../../components/Navbar';
import Banner from '../../components/Banner';

const GymBgm = require('../../assets/audio/bgm/25_Pokemon_Gym.mp3');

export default function GymChallenge() {
  const navigate = useContext(NavigationContext);

  useEffect(() => {
    audio.playBgm(GymBgm)
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const sJoinedTheRoom = subscribeJoinedTheRoom(() => {
      navigate(ScreenState.Room);
    });
    return function unsubscribe() {
      sJoinedTheRoom.off();
    }
  }, [navigate]);

  return (
    <LayoutContainer>
      <header style={{ marginTop: 80 }}>
        <Navbar />
        <Centered>
          <Banner style={{ marginBottom: 20 }}>Gym Challenge</Banner>
        </Centered>
      </header>
      <main style={{ flex: 1 }}>
        <Button onClick={() => emitChallengeGymLeader(0)}>Pewter</Button>
        <Button onClick={() => emitChallengeGymLeader(1)}>Celadon</Button>
        <Button onClick={() => navigate(ScreenState.Lobby)}>Back</Button>
      </main>
    </LayoutContainer >
  );
}
