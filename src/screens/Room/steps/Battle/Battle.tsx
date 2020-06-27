import React, { useState, useContext, useEffect, useRef } from 'react';
import GamplayContext from '../../GameplayContext';
import {
  emitEndTurn,
  subscribeTurnChanged,
  subscribeMoveUsed,
  emitUseMove,
} from '../../../../api';
import { Button } from '../../../../components/basics';
import { Move } from '../../../../types/Pokemon';
import { PlayerContext } from '../../../../auth';
import {
  BattleArea,
  PartyArea,
  PartyTile,
  TileDetail,
  HealthBar,
  MoveOptionBox,
  MoveTile,
  EnergyBarContainer,
  EnergyBar,
} from './Battle.styled';
import {
  animateAttacking,
  animateTakingDamage,
} from './animate';
import { getPokemonModel } from '../../../../components/PokemonModel/helper';
import { concat } from 'ramda';

type NullableIdx = number | null;

export default function Battle() {
  const [energy, setEnergy] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(1);
  const [availableMoves, setAvailableMoves] = useState<Move[][]>([]);
  const [choosenMoveIdx, setChoosenMoveIdx] = useState<NullableIdx>(null);
  const [choosenPokemonIdx, setChoosenPokemonIdx] = useState<NullableIdx>(null);
  const [choosenOpponentIdx, setChoosenOpponentIdx] = useState<NullableIdx>(null);

  const partyTileRef = [
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
  ];
  const opponentTileRef = [
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
  ];

  const { party, opponentParty, updateParties } = useContext(GamplayContext);
  const [player] = useContext(PlayerContext);

  // subscription
  useEffect(function subscription() {

    const sTurnChanged = subscribeTurnChanged(({ my_turn, energy, moves }) => {
      setEnergy(my_turn ? energy : 0);
      setMaxEnergy(my_turn ? energy : 1);
      setAvailableMoves(my_turn ? moves : []);
    });

    const sMoveUsed = subscribeMoveUsed(({
      move,
      userIndex,
      moveIndex,
      remainingEnergy,
      parties,
      targetIndexes: { myParty, opponentParty } = {},
    }) => {
      // animate user and targets
      console.log(`${userIndex} used ${move.name}!`);
      if (myParty && opponentParty) {
        console.log(`${myParty.concat(opponentParty)} affected`);
      }
      console.log(`remainingEnergy: ${remainingEnergy}`);
      setEnergy(remainingEnergy);
      updateParties(parties);
    });

    return function unsubscribe() {
      sTurnChanged.off();
      sMoveUsed.off();
    }
  }, [player, updateParties]);

  function animateMove(move: Move, userIndex: number, targetIndexes?: number[]) {
    const partyTileElement = partyTileRef[userIndex].current;
    animateAttacking(partyTileElement);
    targetIndexes?.forEach(index => {
      const opponentTileElement = opponentTileRef[index].current;
      animateTakingDamage(opponentTileElement);
    });
  }

  function onClickOpponentPokemon(index: number) {
    if (choosenPokemonIdx === null || choosenMoveIdx === null) {
      return;
    }
    animateMove(
      availableMoves[choosenMoveIdx][choosenMoveIdx],
      choosenPokemonIdx,
      [index]
    );
    setEnergy(energy => energy - 1);
    const moveTargetMultipleOpponent = false;
    let targetIndexes = [index];
    if (moveTargetMultipleOpponent) {
      if (choosenOpponentIdx === null) {
        setChoosenOpponentIdx(index);
        return;
      }
      targetIndexes = [choosenOpponentIdx, index];
    }
    emitUseMove({
      userMoveIndex: [choosenPokemonIdx, choosenMoveIdx],
      targetIndexes: targetIndexes,
    });
    // TODO: make move unusable
    setChoosenOpponentIdx(null);
    setChoosenMoveIdx(null);
  }

  function endTurn() {
    emitEndTurn();
  }

  const energyBar = concat(
    new Array(energy).fill({ empty: false }),
    new Array(maxEnergy - energy).fill({ empty: true })
  );
  return (
    <>
      <BattleArea>
        <PartyArea style={{ alignSelf: 'flex-end' }}>
          {opponentParty.map(({ health, maxHealth, pokemon: { name } }, index) => (
            <PartyTile
              chosen={choosenOpponentIdx === index}
              onClick={() => onClickOpponentPokemon(index)}
              key={index}
            >
              <img
                src={getPokemonModel(name)}
                alt={name}
                ref={opponentTileRef[index]}
              />
              <TileDetail>
                <div>{name}</div>
                <HealthBar percentage={health / maxHealth * 100} />
              </TileDetail>
            </PartyTile>
          ))}
        </PartyArea>
        <PartyArea>
          {party.map(({ health, maxHealth, pokemon: { name } }, index) => (
            <PartyTile
              chosen={choosenPokemonIdx === index}
              onClick={() => setChoosenPokemonIdx(index)}
              key={index}
            >
              <img
                src={getPokemonModel(name, 'back')}
                alt={name}
                ref={partyTileRef[index]}
              />
              <TileDetail>
                <div>{name}</div>
                <HealthBar percentage={health / maxHealth * 100} />
              </TileDetail>
            </PartyTile>
          ))}
        </PartyArea>
      </BattleArea>
      <MoveOptionBox>
        {choosenPokemonIdx === null || availableMoves[choosenPokemonIdx] === undefined
          ? null
          : availableMoves[choosenPokemonIdx].map((move, index) => {
            const isDisabled = move.energy > energy;
            return (
              <MoveTile
                chosen={choosenMoveIdx === index}
                onClick={() => isDisabled || setChoosenMoveIdx(index)}
                key={index}
                disabled={isDisabled}
              >
                <div>{move.name}</div>
                <div>Power {move.power} - PP {move.pp}</div>
              </MoveTile>
            );
          })
        }
      </MoveOptionBox>
      <EnergyBarContainer>
        {energyBar.map(({ empty }, index) => (
          <EnergyBar empty={empty} key={index} />
        ))}
      </EnergyBarContainer>
      <Button onClick={endTurn}>End Turn</Button>
    </>
  );
}

export type ChosenItem = null | {
  itemId: string;
  partyIndex?: number;
};
