import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Button, IconButton } from '../../components/basics';
import * as Steps from './steps';
import SettingModal from './SettingModal';
import {
  emitLeaveRoom,
  subscribePlayerJoinedTheRoom,
  subscribePlayerLeftTheRoom,
  subscribeLeftTheRoom,
} from '../../api';
import Player from '../../types/Player';
import { NavigationContext, ScreenState } from '../../navigation';
import { QuickChatPanel } from './QuickChat';
import {
  LayoutContainer,
  TopArea,
  MainArea,
  BottomArea,
  OpponentInfo,
} from './Room.styled';
import { find } from 'ramda';
import { PlayerContext } from '../../auth';
import GameplayContext, { GameplayContextValue } from './GameplayContext';
import BattlingPokemon from '../../types/BattlingPokemon';
import Pokemon, { Move } from '../../types/Pokemon';
import { Parties } from '../../api/base';
import Modal from '../../components/Modal';
import SettingIcon from '../../assets/images/ui/setting.png';
import { GymLocation, getLocationBgm } from '../../constants/location';
import audio from '../../audio';
import { SmallAvatar } from '../../components/Avatar';

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
  const [settingModalShown, setSettingModalShown] = useState(false);
  const [activeStep, setActiveStep] = useState(RoomStep.ChooseParty);
  const [location, setLocation] = useState(GymLocation.None);
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
      gymBattleIndex,
    }) => {
      setLocation(gymBattleIndex);
      const checkMatchingPlayer = ({ id }: Player) => id !== player?.id;
      const findOpponent = find(checkMatchingPlayer);
      const opponent = findOpponent(players);
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

  function openSettingModal() {
    setSettingModalShown(true);
  }
  function closeSettingModal() {
    setSettingModalShown(false);
  }

  const goToBattleStep = () => {
    setActiveStep(RoomStep.Battle);
    audio.playBgm(getLocationBgm(location), { delay: 0 });
  }

  return (
    <LayoutContainer location={location}>
      <TopArea>
        <IconButton aria-label="setting" onClick={openSettingModal}>
          <img alt="setting" src={SettingIcon} width="28px" />
        </IconButton>
        <OpponentInfo>
          <div>{opponent && opponent.name}</div>
          <SmallAvatar code={opponent?.avatar} />
        </OpponentInfo>
      </TopArea>
      <MainArea>
        <GameplayContext.Provider value={gameplayContextValue}>
          {activeStep === RoomStep.ChooseParty ? (
            <Steps.ChooseParty onFinish={goToBattleStep} />
          ) : activeStep === RoomStep.Battle ? (
            <Steps.Battle />
          ) : null}
        </GameplayContext.Provider>
      </MainArea>
      <BottomArea>
        <SmallAvatar code={player.avatar} />
        <QuickChatPanel />
      </BottomArea>
      <SettingModal
        shown={settingModalShown}
        onClose={closeSettingModal}
        onQuit={backToLobby}
      />
      <Modal shown={playerLeftModalShowns} onClose={backToLobby}>
        The opponent left the room!
          <Button onClick={backToLobby}>OK</Button>
      </Modal>
    </LayoutContainer>
  );
}
