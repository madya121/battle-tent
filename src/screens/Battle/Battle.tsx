import React, { useState, useEffect } from 'react';
import { Button } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import LoadingIndicator from '../../components/LoadingIndicator';

export default function Battle() {
  const [isLoading, setIsLoading] = useState(false);
  const [isQuitModalVisible, setIsQuitModalVisible] = useState(false);

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
    setIsQuitModalVisible(true);
  }
  function closeQuitModal() {
    setIsQuitModalVisible(false);
  }

  return (
    <div>
      <QuitModal isVisible={isQuitModalVisible} onClose={closeQuitModal} />
      <header>
        <h1>Battle!</h1>
      </header>
      {isLoading ? <LoadingIndicator /> :
        <div>
          <button onClick={openQuitModal}>Quit</button>
        </div>
      }
    </div>
  );
}

function QuitModal({ isVisible, onClose }: Omit<ModalProps, 'children'>) {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      Do you really wish to quit?
      <Button>Yes</Button>
      <Button>No</Button>
    </Modal>
  );
}
