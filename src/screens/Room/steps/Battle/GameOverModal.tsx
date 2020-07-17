import React, { useContext, useCallback } from 'react';
import { Button } from '../../../../components/basics';
import Modal, { ModalProps } from '../../../../components/Modal';
import { NavigationContext, ScreenState } from '../../../../navigation';
import { emitLeaveRoom } from '../../../../api';

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

  return (
    <Modal shown={shown} onClose={() => { }}>
      Result
      {gameResult.toUpperCase()}
      <Button onClick={onRematch}>Rematch</Button >
      <Button onClick={backToLobby}>Quit</Button>
    </Modal >
  );
}
