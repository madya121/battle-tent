import React, { useState, useContext, useEffect, useRef } from 'react';
import GamplayContext from '../../GameplayContext';
import {
  emitEndTurn,
  subscribeMoveUsed,
  subscribeTurnEnded,
  emitUseMove,
} from '../../../../api';
import * as helper from '../../../../api/socket/helper';
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

type NullableIdx = number | null;

export default function Battle() {
  const [energy, setEnergy] = useState(0);
  const [availableMoves, setAvailableMoves] = useState<Move[][]>([]);
  const [choosenMoveIdx, setChoosenMoveIdx] = useState<NullableIdx>(null);
  const [choosenPokemonIdx, setChoosenPokemonIdx] = useState<NullableIdx>(null);
  const [choosenOpponentIdx, setChoosenOpponentIdx] = useState<NullableIdx>(null);
  // const [animation, setAnimation] = useState<[Animation, Animation, Animation]>(
  //   [Animation.Idle, Animation.Idle, Animation.Idle]
  // );
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
    party, setParty,
    opponentParty, setOpponentParty,
  } = useContext(GamplayContext);
  const [player] = useContext(PlayerContext);


  useEffect(function subscription() {
    if (!player) return;
    const sMoveUsed = subscribeMoveUsed((
      { move, userMoveIndex, targetIndexes, result }
    ) => {
      // animate user and targets
      console.log(`${userMoveIndex[0]} used ${move.name}!`);
      console.log(`${targetIndexes} affected`);
      const { playerData, opponentData } = helper.splitPlayer(player, result);
      setParty(playerData.party);
      setOpponentParty(opponentData.party);
    });

    const sTurnEnded = subscribeTurnEnded(({ moves }) => {
      setAvailableMoves(moves);
    });

    return function unsubscribe() {
      sMoveUsed.off();
      sTurnEnded.off();
    }
  }, [player, setParty, setOpponentParty]);

  function animateMove(move: Move, userIndex: number, targetIndexes?: number[]) {
    const partyTileElement = partyTileRef[userIndex].current;
    animateAttacking(partyTileElement);
    targetIndexes?.forEach(index => {
      const opponentTileElement = opponentTileRef[index].current;
      animateTakingDamage(opponentTileElement);
    });
  }

  function onClickOpponentPokemon(index: number) {
    console.log(choosenPokemonIdx)
    console.log(choosenMoveIdx)
    if (choosenPokemonIdx === null || choosenMoveIdx === null) {
      return;
    }
    animateMove(
      availableMoves[choosenMoveIdx][choosenMoveIdx],
      choosenPokemonIdx,
      [index]
    );
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
  return (
    <>
      <BattleArea>
        <PartyArea style={{ alignSelf: 'flex-end' }}>
          {opponentParty.map(({ health, pokemon: { image, name } }, index) => (
            <PartyTile
              chosen={choosenOpponentIdx === index}
              onClick={() => onClickOpponentPokemon(index)}
              key={index}
            >
              <img
                src={image}
                alt={name}
                ref={opponentTileRef[index]}
              />
              <TileDetail>
                <div>{name}</div>
                <HealthBar percentage={health} />
              </TileDetail>
            </PartyTile>
          ))}
        </PartyArea>
        <PartyArea>
          {party.map(({ health, pokemon: { imageBack, name } }, index) => (
            <PartyTile
              chosen={choosenPokemonIdx === index}
              onClick={() => setChoosenPokemonIdx(index)}
              key={index}
            >
              <img
                src={imageBack}
                alt={name}
                ref={partyTileRef[index]}
              />
              <TileDetail>
                <div>{name}</div>
                <HealthBar percentage={health} />
              </TileDetail>
            </PartyTile>
          ))}
        </PartyArea>
      </BattleArea>
      <MoveOptionBox>
        {choosenPokemonIdx === null || availableMoves[choosenPokemonIdx] === undefined
          ? null
          : availableMoves[choosenPokemonIdx].map((move, index) => (
            <MoveTile
              chosen={choosenMoveIdx === index}
              onClick={() => setChoosenMoveIdx(index)}
              key={index}
            >
              <div>{move.name}</div>
              <div>Power {move.power} - PP {move.pp}</div>
            </MoveTile>
          ))
        }
      </MoveOptionBox>
      <EnergyBarContainer>
        {[0, 1, 2, 2, 2, 2, 2, 2].map((_, index) => (
          <EnergyBar used={false} key={index} />
        ))}
      </EnergyBarContainer>
      <Button onClick={emitEndTurn}>End Turn</Button>
    </>
  );
}

export type ChosenItem = null | {
  itemId: string;
  partyIndex?: number;
};
