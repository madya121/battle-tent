import React from 'react';
import styled from 'styled-components';
import {
  default as MaterialModal,
  ModalProps as MaterialModalProps,
} from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Centered } from '../basics';
import ModalBg from '../../assets/images/ui/modal_bg.png';
import CloseIcon from '../../assets/images/ui/close_button.png';

const PlinkSfx = require('../../assets/audio/sfx/plink.mp3');

export interface ModalProps extends Omit<MaterialModalProps, 'children' | 'open'> {
  shown?: boolean;
  onClose: () => void;
  children: React.ReactChild | React.ReactChild[];
}

export default function Modal({
  shown = true,
  onClose,
  children,
  BackdropProps,
  ...props
}: ModalProps) {
  return (
    <StyledMaterialModal
      open={shown}
      onClose={() => {
        const plinkSfx = new Audio(PlinkSfx);
        plinkSfx.play();
        onClose();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        ...BackdropProps,
      }}
      {...props}
    >
      <Fade in={shown}>
        <ContentContainer>
          <CloseButton onClick={onClose} />
          {children}
        </ContentContainer>
      </Fade>
    </StyledMaterialModal>
  );
}

const StyledMaterialModal = styled(MaterialModal)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 425px;
  margin: 0 auto;
`;

const ContentContainer = styled(Centered)`
  position: relative;
  width: 100%;
  height: 200px;
  background-image: url(${ModalBg});
  background-repeat: no-repeat;
  background-size: contain;
  padding: 24px;
  :focus {
    outline: none;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 24px;
  right: 8px;
  background-image: url(${CloseIcon});
  background-repeat: no-repeat;
  background-size: 28px;
  padding: 24px;
`;
