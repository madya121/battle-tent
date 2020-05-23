import React, { useContext } from 'react';
import { Button } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import { NavigationContext, ScreenState } from '../../navigation';

export function QuitModal({ shown, onClose }: Omit<ModalProps, 'children'>) {
  const navigate = useContext(NavigationContext);

  function quit() {
    navigate(ScreenState.Lobby);
  }

  return (
    <Modal shown={shown} onClose={onClose}>
      Do you really wish to quit?
      <Button onClick={quit}>Yes</Button>
      <Button onClick={onClose}>No</Button>
    </Modal>
  );
}
