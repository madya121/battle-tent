import React, { useContext, useCallback } from 'react';
import { Button } from '../../../../components/basics';
import Modal, { ModalProps } from '../../../../components/Modal';
import Banner from '../../../../components/Banner';
import { NavigationContext, ScreenState } from '../../../../navigation';
import { emitLeaveRoom } from '../../../../api';
import Win from '../../../../assets/images/ui/win.png';
import Lose from '../../../../assets/images/ui/lose.png';

export default function GameOverModal({
  shown,
  gameResult,
  onRematch,
}: Omit<ModalProps, 'children' | 'onClose'> & {
  gameResult: 'win' | 'lose' | 'draw';
  onRematch: () => void;
}) {
  const navigate = useContext(NavigationContext);

  const backToLobby = useCallback(
    () => {
      emitLeaveRoom();
      navigate(ScreenState.Lobby);
    },
    [navigate],
  );

  const onClose = () => { }; // do nothing, this modal can't be closed

  return (
    <Modal shown={shown} onClose={onClose}>
      <Banner>Result</Banner>
      <img
        alt={gameResult}
        src={gameResult === 'win' ? Win : Lose}
        style={{ width: 240 }}
      />
      <div style={{ display: 'flex' }}>
        {/* TODO */}
        {/* <Button onClick={onRematch}>Rematch</Button > */}
        <Button onClick={backToLobby}>Quit</Button>
      </div>
    </Modal >
  );
}
