import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/basics';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as Steps from './steps';
import QuitModal from './QuitModal';
import {
  fetchPokemonList,
  subscribePlayerJoinedTheRoom,
  subscribePlayerLeftTheRoom,
  subscribeLeftTheRoom,
} from '../../api';
import { BattleStep } from './enums';
import Pokemon from '../../types/Pokemon';
import Trainer from '../../types/Trainer';
import { NavigationContext, ScreenState } from '../../navigation';
import ChatPanel from './ChatPanel';
import {
  LayoutContainer,
  TopArea,
  OpponentInfo,
  OpponentAvatar,
} from './Battle.styled';

export default function Battle() {
  const [isLoading, setIsLoading] = useState(false);
  const [quitModalShown, setQuitModalShown] = useState(false);
  const [activeStep, setActiveStep] = useState(BattleStep.ChooseParty);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [opponent, setOpponent] = useState<Trainer | undefined>(undefined);
  const navigate = useContext(NavigationContext);

  useEffect(() => {
    setIsLoading(true);
    getPokemonList().finally(() => setIsLoading(false));
  }, []);

  // subscriptions
  useEffect(function subscribe() {
    const sPlayerJoinedTheRoom = subscribePlayerJoinedTheRoom(setOpponent);
    const sPlayerLeftTheRoom = subscribePlayerLeftTheRoom(({ name }) => {
      const message = `Player ${name} left the room!`;
      alert(message);
    });
    const sLeftTheRoom = subscribeLeftTheRoom(() => {
      navigate(ScreenState.Lobby);
    });
    return function unsubscribe() {
      sPlayerJoinedTheRoom.off();
      sPlayerLeftTheRoom.off();
      sLeftTheRoom.off();
    }
  }, [navigate]);

  async function getPokemonList() {
    const response = await fetchPokemonList();
    setPokemonList(response.data);
  }

  function openQuitModal() {
    setQuitModalShown(true);
  }
  function closeQuitModal() {
    setQuitModalShown(false);
  }

  function Step() {
    function ChooseParty() {
      return (
        <Steps.ChooseParty
          pokemonList={pokemonList}
          setActiveStep={setActiveStep}
        />
      );
    }
    switch (activeStep) {
      case BattleStep.ChooseParty: return <ChooseParty />;
      case BattleStep.ChooseMoves: return <Steps.ChooseMoves />;
      default: return <ChooseParty />;
    }
  }

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
      <main>
        {isLoading ? <LoadingIndicator /> : <Step />}
        <ChatPanel />
      </main>
    </LayoutContainer>
  );
}
