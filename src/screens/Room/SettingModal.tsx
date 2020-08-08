import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Slider } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import audio from '../../audio';

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
    <SettingLayoutContainer>
      <SoundSettings>
        <div>SFX</div>
        <Slider
          defaultValue={audio.sfxVolume}
          onChangeCommitted={(e, value) => {
            if (Array.isArray(value)) throw value;
            audio.setSfxVolume(value)
          }}
        />
        <div>BGM</div>
        <Slider
          defaultValue={audio.bgmVolume}
          onChange={(_, value) => audio.setBgmVolume(value as number, false)}
        />
      </SoundSettings>
      <Button onClick={onQuitClick}>Quit</Button>
    </SettingLayoutContainer>
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

const SettingLayoutContainer = styled.div`
  font-family: HeadTextFont;
  font-size: 24px;
  color: #874a0c;
`;

const SoundSettings = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
