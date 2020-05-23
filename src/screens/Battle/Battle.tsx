import React, { useState, useEffect } from 'react';
import { Button } from '../../components/basics';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as Steps from './steps';
import { QuitModal } from './QuitModal';
import { fetchOpponent } from '../../apis/battleApi';
import { BattleStep } from './enums';
import Pokemon from '../../types/Pokemon';
import Trainer from '../../types/Trainer';

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
      const response = await fetch('');
      if (response.status !== 200) throw response;
      setPokemonList([]);
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
    <div>
      <QuitModal shown={quitModalShown} onClose={closeQuitModal} />
      <header>
        <h1>Battle!</h1>
        {opponent && opponent.name}
        <div>
          <Button onClick={openQuitModal}>Quit</Button>
        </div>
      </header>
      {isLoading ? <LoadingIndicator /> : <Step />}
    </div>
  );
}
