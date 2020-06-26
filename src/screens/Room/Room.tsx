import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/basics';
import * as Steps from './steps';
import QuitModal from './QuitModal';
import {
  subscribePlayerJoinedTheRoom,
  subscribePlayerLeftTheRoom,
  subscribeLeftTheRoom,
} from '../../api';
import Player from '../../types/Player';
import { NavigationContext, ScreenState } from '../../navigation';
import QuickChatPanel from './QuickChatPanel';
import {
  LayoutContainer,
  TopArea,
  OpponentInfo,
  OpponentAvatar,
} from './Room.styled';
import { find } from 'ramda';
import { PlayerContext } from '../../auth';
import GameplayContext from './GameplayContext';
import BattlingPokemon from '../../types/BattlingPokemon';
import Pokemon from '../../types/Pokemon';

enum RoomStep {
  ChooseParty,
  Battle,
}

export default function Room() {
  /** GameplayContexts */
  const [availablePokemon, setAvailablePokemon] = useState<Pokemon[]>([]);
  const [party, setParty] = useState<BattlingPokemon[]>([]);
  const [opponentParty, setOpponentParty] = useState<BattlingPokemon[]>([]);
  const [opponent, setOpponent] = useState<Player | undefined>(undefined);
  const gameplayContextValue = {
    opponent,
    availablePokemon,
    party, setParty,
    opponentParty, setOpponentParty,
  };
  /** End of GameplayContexts */

  const [quitModalShown, setQuitModalShown] = useState(false);
  const [activeStep, setActiveStep] = useState(RoomStep.ChooseParty);
  const navigate = useContext(NavigationContext);
  const [player] = useContext(PlayerContext);

  // subscriptions
  useEffect(function subscribe() {
    const sPlayerJoinedTheRoom = subscribePlayerJoinedTheRoom(({
      players,
      availablePokemon,
    }) => {
      const checkMatchingName = ({ name }: Player) => name !== player?.name;
      const opponent = find(checkMatchingName, players);
      setOpponent(opponent);
      setAvailablePokemon(availablePokemon);
    });

    const sPlayerLeftTheRoom = subscribePlayerLeftTheRoom(({ name }) => {
      alert(`Player ${name} left the room!`);
    });

    const sLeftTheRoom = subscribeLeftTheRoom(() => {
      navigate(ScreenState.Lobby);
    });

    return function unsubscribe() {
      sPlayerJoinedTheRoom.off();
      sPlayerLeftTheRoom.off();
      sLeftTheRoom.off();
    }
  }, [navigate, player]);

  function openQuitModal() {
    setQuitModalShown(true);
  }
  function closeQuitModal() {
    setQuitModalShown(false);
  }

  const goToBattleStep = () => setActiveStep(RoomStep.Battle);

  return (
    <LayoutContainer>
      <QuitModal shown={quitModalShown} onClose={closeQuitModal} />
      <TopArea>
        <OpponentInfo>
          <OpponentAvatar />
          <div>{opponent && opponent.name}</div>
        </OpponentInfo>
        <Button onClick={openQuitModal}>Quit</Button>
      </TopArea>
      <main style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <GameplayContext.Provider value={gameplayContextValue}>
            {activeStep === RoomStep.ChooseParty ? (
              <Steps.ChooseParty onFinish={goToBattleStep} />
            ) : activeStep === RoomStep.Battle ? (
              <Steps.Battle />
            ) : null}
          </GameplayContext.Provider>
        </div>
        <QuickChatPanel />
      </main>
    </LayoutContainer>
  );
}
