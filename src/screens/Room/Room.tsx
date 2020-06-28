import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Button } from '../../components/basics';
import * as Steps from './steps';
import QuitModal from './QuitModal';
import {
  emitLeaveRoom,
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
import GameplayContext, { GameplayContextValue } from './GameplayContext';
import BattlingPokemon from '../../types/BattlingPokemon';
import Pokemon, { Move } from '../../types/Pokemon';
import { Parties } from '../../api/base';
import Modal from '../../components/Modal';

enum RoomStep {
  ChooseParty,
  Battle,
}

export default function Room() {
  /** GameplayContexts */
  const [availablePokemon, setAvailablePokemon] = useState<Pokemon[]>([]);
  const [opponent, setOpponent] = useState<Player | undefined>(undefined);

  const [party, setParty] = useState<BattlingPokemon[]>([]);
  const [opponentParty, setOpponentParty] = useState<BattlingPokemon[]>([]);
  const [player] = useContext(PlayerContext);

  function updateParties(parties: Parties) {
    setParty(parties[player.id]);
    opponent && setOpponentParty(parties[opponent.id]);
  }

  const [myTurn, setMyTurn] = useState(false);

  const [energy, setEnergy] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(1);
  const [availableMoves, setAvailableMoves] = useState<Move[][]>([]);

  const changeTurn: GameplayContextValue['changeTurn'] = ({ my_turn, energy, moves }) => {
    setMyTurn(my_turn);
    setEnergy(my_turn ? energy : 0);
    setMaxEnergy(my_turn ? energy : 1);
    setAvailableMoves(my_turn ? moves : []);
  };
  const gameplayContextValue: GameplayContextValue = {
    opponent,
    myTurn, changeTurn,
    availablePokemon, availableMoves, setAvailableMoves,
    party, opponentParty, updateParties,
    energy, maxEnergy, setEnergy,
  };
  /** End of GameplayContexts */

  const [playerLeftModalShowns, setPlayerLeftModalShowns] = useState(false);
  const [quitModalShown, setQuitModalShown] = useState(false);
  const [activeStep, setActiveStep] = useState(RoomStep.ChooseParty);
  const navigate = useContext(NavigationContext);

  const backToLobby = useCallback(
    () => {
      emitLeaveRoom();
      navigate(ScreenState.Lobby);
    },
    [navigate],
  );

  // subscriptions
  useEffect(function subscribe() {
    const sPlayerJoinedTheRoom = subscribePlayerJoinedTheRoom(({
      players,
      availablePokemon,

    }) => {
      const checkMatchingName = ({ id }: Player) => id !== player?.id;
      const opponent = find(checkMatchingName, players);
      opponent && setOpponent(opponent);
      setAvailablePokemon(availablePokemon);
    });

    const sPlayerLeftTheRoom = subscribePlayerLeftTheRoom(({ name }) => {
      setPlayerLeftModalShowns(true);
    });

    const sLeftTheRoom = subscribeLeftTheRoom(backToLobby);

    return function unsubscribe() {
      sPlayerJoinedTheRoom.off();
      sPlayerLeftTheRoom.off();
      sLeftTheRoom.off();
    }
  }, [navigate, player, backToLobby]);

  function openQuitModal() {
    setQuitModalShown(true);
  }
  function closeQuitModal() {
    setQuitModalShown(false);
  }

  const goToBattleStep = () => setActiveStep(RoomStep.Battle);

  return (
    <LayoutContainer>
      <QuitModal
        shown={quitModalShown}
        onClose={closeQuitModal}
        onQuit={backToLobby}
      />
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
      <Modal shown={playerLeftModalShowns} onClose={backToLobby}>
        The opponent left the room!
          <Button onClick={backToLobby}>OK</Button>
      </Modal>
    </LayoutContainer>
  );
}
