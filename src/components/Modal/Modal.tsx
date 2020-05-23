import React from 'react';
import MaterialModal from '@material-ui/core/Modal';

export interface ModalProps {
  shown?: boolean;
  onClose: () => void;
  children: React.ReactChild | React.ReactChild[];
}

export default function Modal({
  shown = true,
  onClose,
  children,
}: ModalProps) {
  return (
    <MaterialModal open={shown} onClose={onClose}>
      <>
        {children}
      </>
    </MaterialModal>
  );
}
