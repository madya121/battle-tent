import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/basics';
import * as Steps from './steps';
import QuitModal from './QuitModal';
import {
  subscribePlayerJoinedTheRoom,
  subscribePlayerLeftTheRoom,
  subscribeLeftTheRoom,
} from '../../api';
import { BattleStep } from './enums';
import Player from '../../types/Player';
import { NavigationContext, ScreenState } from '../../navigation';
import QuickChatPanel from './QuickChatPanel';
import {
  LayoutContainer,
  TopArea,
  OpponentInfo,
  OpponentAvatar,
} from './Battle.styled';
import { find } from 'ramda';
import { PlayerContext } from '../../auth';
import GameplayContext from './GameplayContext';
import BattlingPokemon from '../../types/BattlingPokemon';

export default function Battle() {
  const [quitModalShown, setQuitModalShown] = useState(false);
  const [activeStep, setActiveStep] = useState(BattleStep.ChooseParty);
  const [party, setParty] = useState<BattlingPokemon[]>([]);
  const [opponentParty, setOpponentParty] = useState<BattlingPokemon[]>([]);
  const [opponent, setOpponent] = useState<Player | undefined>(undefined);
  const navigate = useContext(NavigationContext);
  const [player] = useContext(PlayerContext);

  // subscriptions
  useEffect(function subscribe() {
    const sPlayerJoinedTheRoom = subscribePlayerJoinedTheRoom(({
      players
      // name: lastJoinedPlayerName, // TODO for Toast
    }) => {
      const checkMatchingName = ({ name }: Player) => name !== player?.name;
      const opponent = find(checkMatchingName, players);
      setOpponent(opponent);
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

  const gameplayContextValue = {
    party, setParty,
    opponentParty, setOpponentParty,
  };

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
      <main style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ flex: 1 }}>
          <GameplayContext.Provider value={gameplayContextValue}>
            {activeStep === BattleStep.ChooseParty ? (
              <Steps.ChooseParty setActiveStep={setActiveStep} />
            ) : activeStep === BattleStep.ChooseMoves ? (
              <Steps.ChooseMoves />
            ) : null}
          </GameplayContext.Provider>
        </div>
        <QuickChatPanel />
      </main>
    </LayoutContainer>
  );
}
