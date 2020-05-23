import React, { useState } from 'react';
import { Input } from '../../components/basics';
import Modal, { ModalProps } from '../../components/Modal';
import LoadingIndicator from '../../components/LoadingIndicator';

export default function Lobby() {
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onFindMatch() {
    setIsLoading(true);
    try {
      const response = await fetch('');
      if (response.status !== 200) throw response;
    } catch (e) {
      console.error(e);
      alert(e);
    }
    // setIsLoading(false);
    setTimeout(() => setIsLoading(false), 1500)
  }
  async function onInviteMatch() {
    setIsLoading(true);
    try {
      const response = await fetch('');
      if (response.status !== 200) throw response;
    } catch (e) {
      console.error(e);
      alert(e);
    }
    setIsLoading(false);
  }

  function openInviteModal() {
    setIsInviteModalVisible(true);
    onInviteMatch();
  }
  function closeInviteModal() {
    setIsInviteModalVisible(false);
  }

  return (
    <div>
      <InviteModal isVisible={isInviteModalVisible} onClose={closeInviteModal} />
      <header>
        <h1>Battle Tent</h1>
      </header>
      {isLoading ? <LoadingIndicator /> :
        <div>
          <button onClick={onFindMatch}>Find match</button>
          <button disabled onClick={openInviteModal}>Invite</button>
        </div>
      }
    </div>
  );
}

function InviteModal({ isVisible, onClose }: Omit<ModalProps, 'children'>) {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      Who do you want to invite?
      <Input />
    </Modal>
  );
}
