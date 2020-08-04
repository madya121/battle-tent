import React, { useState } from 'react';
import { Button } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';

export default function SettingModal({
  shown,
  onClose,
  onQuit,
}: Omit<ModalProps, 'children'> & { onQuit: () => void }) {
  const [state, setState] = useState(State.Setting);
  return (
    <Modal shown={shown} onClose={onClose}>
      {state === State.Setting ?
        <SettingLayout onQuitClick={() => setState(State.Quit)} />
        :
        <QuitLayout onCancel={() => setState(State.Setting)} onQuit={onQuit} />
      }
    </Modal>
  );
}

function SettingLayout({ onQuitClick }: { onQuitClick: () => void }) {
  return (
    <>
      <Button onClick={onQuitClick}>Quit</Button>
    </>
  );
}

function QuitLayout({ onQuit, onCancel }: {
  onQuit: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      Do you really wish to quit?
      <Button onClick={onQuit}>Yes</Button>
      <Button onClick={onCancel}>No</Button>
    </>
  );
}

enum State {
  Setting,
  Quit,
}
