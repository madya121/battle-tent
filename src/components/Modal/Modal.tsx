import React from 'react';

export interface ModalProps {
  isVisible?: boolean;
  onClose: () => void;
  children: React.ReactElement | string | (React.ReactElement | string)[];
}

export default function Modal({ isVisible, onClose, ...props }: ModalProps) {
  // <div isVisible={isVisible} onClose={onClose} {...props} />
  return (
    <></>
  );
}
