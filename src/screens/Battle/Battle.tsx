import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import LoadingIndicator from '../../components/LoadingIndicator';
import { NavigationContext, ScreenState } from '../../navigation';

export default function Battle() {
  const [isLoading, setIsLoading] = useState(false);
  const [quitModalShown, setQuitModalShown] = useState(false);

  useEffect(() => {
    fetchOpponent();
  }, []);

  async function fetchOpponent() {
    setIsLoading(true);
    try {
      const response = await fetch('');
      if (response.status !== 200) throw response;
    } catch (e) {
      console.error(e);
      alert(e);
    }
    // setIsLoading(false);
    setTimeout(() => setIsLoading(false), 500);
  }

  function openQuitModal() {
    setQuitModalShown(true);
  }
  function closeQuitModal() {
    setQuitModalShown(false);
  }

  return (
    <div>
      <QuitModal shown={quitModalShown} onClose={closeQuitModal} />
      <header>
        <h1>Battle!</h1>
      </header>
      {isLoading ? <LoadingIndicator /> :
        <div>
          <Button onClick={openQuitModal}>Quit</Button>
        </div>
      }
    </div>
  );
}

function QuitModal({ shown, onClose }: Omit<ModalProps, 'children'>) {
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
