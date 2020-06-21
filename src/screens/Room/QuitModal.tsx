import React from 'react';
import { Button } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import { emitLeaveRoom } from '../../api';

export default function QuitModal({ shown, onClose }: Omit<ModalProps, 'children'>) {
  function quit() {
    emitLeaveRoom();
    onClose();
  }

  return (
    <Modal shown={shown} onClose={onClose}>
      Do you really wish to quit?
      <Button onClick={quit}>Yes</Button>
      <Button onClick={onClose}>No</Button>
    </Modal>
  );
}
