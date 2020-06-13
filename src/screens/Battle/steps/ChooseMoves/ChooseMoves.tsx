import React, { useState, useContext, useEffect } from 'react';
import GamplayContext from '../../GameplayContext';
import {
  emitEndTurn,
  subscribeMoveUsed,
  subscribeTurnEnded,
} from '../../../../api';
import * as helper from '../../../../api/socket/helper';
import { Button } from '../../../../components/basics';
import { Move } from '../../../../types/Pokemon';
import { PlayerContext } from '../../../../auth';
import { PartyTile, TileDetail } from './ChooseMoves.styled';

export default function ChooseMoves() {
  const [energy, setEnergy] = useState(0);
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
  const [choosenMoves, setChoosenMoves] = useState(0); // index of moves
  const [choosenPokemon, setChoosenPokemon] = useState(0); // index of pokemon
  const [choosenOpponentPokemon, setChoosenOpponentPokemon] = useState(0);
  const {
    party, setParty,
    opponentParty, setOpponentParty,
  } = useContext(GamplayContext);
  const [player] = useContext(PlayerContext);


  useEffect(function subscription() {
    if (!player) return;
    const sMoveUsed = subscribeMoveUsed(({ move, user, targets, result }) => {
      // animate user and targets
      console.log(`${user} used ${move.name}!`);
      console.log(`${targets} affected`);
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
  }, [player]);

  return (
    <div>
      <div>
        {opponentParty.map(({ health, pokemon: { image, name } }, index) => (
          <PartyTile
            choosen={choosenOpponentPokemon === index}
            onClick={() => setChoosenOpponentPokemon(index)}
            key={index}
          >
            <img src={image} alt={name} />
            <TileDetail>
              <div>{health}</div>
              <div>{name}</div>
            </TileDetail>
          </PartyTile>
        ))}
      </div>
      <div>
        {party.map(({ health, pokemon: { imageBack, name } }, index) => (
          <PartyTile
            choosen={choosenPokemon === index}
            onClick={() => setChoosenPokemon(index)}
            key={index}
          >
            <img src={imageBack} alt={name} />
            <TileDetail>
              <div>{health}</div>
              <div>{name}</div>
            </TileDetail>
          </PartyTile>
        ))}
      </div>
      <Button onClick={emitEndTurn}>End Turn</Button>
    </div>
  );
}

export type ChosenItem = null | {
  itemId: string;
  partyIndex?: number;
};
