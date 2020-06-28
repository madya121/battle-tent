import React from 'react';
import { Button } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';

export default function QuitModal({
  shown,
  onClose,
  onQuit,
}: Omit<ModalProps, 'children'> & { onQuit: () => void }) {
  return (
    <Modal shown={shown} onClose={onClose}>
      Do you really wish to quit?
      <Button onClick={onQuit}>Yes</Button>
      <Button onClick={onClose}>No</Button>
    </Modal>
  );
}
