import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import GamplayContext from '../../GameplayContext';
import {
  emitEndTurn,
  subscribeTurnChanged,
  subscribeMoveUsed,
  subscribeGameOver,
  emitUseMove,
} from '../../../../api';
import { Button } from '../../../../components/basics';
import { Move } from '../../../../types/Pokemon';
import {
  BattleArea,
  PartyArea,
  MoveOptionsBox,
  MoveTile,
  EnergyBarContainer,
  EnergyBar,
} from './Battle.styled';
import { animateAttacking, animateTakingDamage } from './animate';
import { concat } from 'ramda';
import { UseMoveParams } from '../../../../api/base';
import BattlingPokemonTile from './BattlingPokemonTile'

type NullableIdx = number | null;

export default function Battle() {
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

  const {
    party, opponentParty, updateParties,
    myTurn, changeTurn,
    availableMoves, setAvailableMoves,
    energy, maxEnergy, setEnergy,
  } = useContext(GamplayContext);

  function getImageTileElement(
    tileRef: React.RefObject<HTMLImageElement>[],
    index: number
  ) {
    return tileRef[index].current;
  }

  const animateMove = useCallback((
    move: Move,
    userIndex: number,
    targetIndexes?: UseMoveParams['targetIndexes']
  ) => {
    const attackingPartyRef = myTurn ? partyTileRef : opponentTileRef;
    const affectedPartyRef = myTurn ? opponentTileRef : partyTileRef;
    const attackingPokemon = getImageTileElement(attackingPartyRef, userIndex);
    animateAttacking(move, attackingPokemon, myTurn ? 'up' : 'down');
    targetIndexes?.opponentParty?.forEach(index => {
      const affectedPokemon = getImageTileElement(affectedPartyRef, index);
      animateTakingDamage(affectedPokemon);
    });
  }, [partyTileRef, opponentTileRef]);

  // subscription
  useEffect(function subscription() {

    const sTurnChanged = subscribeTurnChanged(battleState => {
      setChoosenPokemonIdx(null);
      setChoosenOpponentIdx(null);
      changeTurn(battleState);
    });

    const sMoveUsed = subscribeMoveUsed(({
      move,
      userIndex,
      moveIndex,
      remainingEnergy,
      parties,
      availableMoves,
      targetIndexes = {},
    }) => {
      // animate user and targets
      animateMove(move, userIndex, targetIndexes);
      updateParties(parties);
      if (myTurn) {
        setEnergy(remainingEnergy);
        setAvailableMoves(availableMoves)
      }
    });

    const sGameOver = subscribeGameOver(({ winner, draw }) => {
      // TODO: show modal, then quit the game
    });

    return function unsubscribe() {
      sTurnChanged.off();
      sMoveUsed.off();
      sGameOver.off();
    }
  }, [
    updateParties, changeTurn, setEnergy, animateMove, myTurn, setAvailableMoves
  ]);

  function onClickOpponentPokemon(index: number) {
    if (choosenPokemonIdx === null || choosenMoveIdx === null) {
      return;
    }
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
      userIndex: choosenPokemonIdx,
      moveIndex: choosenMoveIdx,
      targetIndexes: {
        opponentParty: targetIndexes,
      },
    });
    setChoosenOpponentIdx(null);
    setChoosenMoveIdx(null);
  }

  const energyBar = concat(
    new Array(energy).fill({ empty: false }),
    new Array(Math.abs(maxEnergy - energy)).fill({ empty: true })
  );

  return (
    <>
      <BattleArea>
        <PartyArea style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
          {opponentParty.map(({ health, maxHealth, pokemon: { name } }, index) => (
            <BattlingPokemonTile
              chosen={choosenOpponentIdx === index}
              onClick={() => onClickOpponentPokemon(index)}
              name={name}
              health={health}
              maxHealth={maxHealth}
              imageRef={opponentTileRef[index]}
              key={index}
            />
          ))}
        </PartyArea>
        <PartyArea style={{ alignSelf: 'flex-start' }}>
          {party.map(({ health, maxHealth, pokemon: { name } }, index) => (
            <BattlingPokemonTile
              chosen={choosenPokemonIdx === index}
              onClick={() => myTurn && setChoosenPokemonIdx(index)}
              name={name}
              health={health}
              maxHealth={maxHealth}
              imageRef={partyTileRef[index]}
              backSprite
              key={index}
            />
          ))}
        </PartyArea>
      </BattleArea>
      <MoveOptionsBox>
        {choosenPokemonIdx === null || availableMoves[choosenPokemonIdx] === undefined
          ? null
          : availableMoves[choosenPokemonIdx].map((move, index) => {
            const isDisabled = move.used || move.energy > energy;
            return (
              <MoveTile
                type={move.type}
                chosen={choosenMoveIdx === index}
                disabled={isDisabled}
                onClick={() => isDisabled || setChoosenMoveIdx(index)}
                key={index}
              >
                <div>{move.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>Power {move.power}</div>
                  <div>Energy {move.energy}</div>
                </div>
              </MoveTile>
            );
          })
        }
      </MoveOptionsBox>
      <EnergyBarContainer>
        {energyBar.map(({ empty }, index) => (
          <EnergyBar empty={empty} key={index} />
        ))}
      </EnergyBarContainer>
      {myTurn && <Button onClick={emitEndTurn}>End Turn</Button>}
    </>
  );
}
