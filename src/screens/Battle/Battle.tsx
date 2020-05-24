import React, { useState, useEffect } from 'react';
import { Button } from '../../components/basics';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as Steps from './steps';
import { QuitModal } from './QuitModal';
import { fetchOpponent, fetchPokemonList } from '../../apis/battleApi';
import { BattleStep } from './enums';
import Pokemon from '../../types/Pokemon';
import Trainer from '../../types/Trainer';
import { LayoutContainer, TopArea, OpponentInfo, OpponentAvatar } from './Battle.styled';

export default function Battle() {
  const [isLoading, setIsLoading] = useState(false);
  const [quitModalShown, setQuitModalShown] = useState(false);
  const [activeStep, setActiveStep] = useState(BattleStep.ChooseParty);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [opponent, setOpponent] = useState<Trainer | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getOpponent(),
      getPokemonList(),
    ]).finally(() => setIsLoading(false));
  }, []);

  async function getOpponent() {
    try {
      const response = await fetchOpponent();
      setOpponent(response.data);
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  async function getPokemonList() {
    try {
      const response = await fetchPokemonList();
      setPokemonList(response.data);
    } catch (e) {
      console.error(e);
      alert(e);
    }
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
      </main>
    </LayoutContainer>
  );
}
