import React from 'react';
import styled from 'styled-components';
import MaterialModal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { PLINK_SFX_PATH } from '../../constants/paths/audio';

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
    <StyledMaterialModal
      open={shown}
      onClose={() => {
        // create an Audio object each time onClick triggered
        // to allow the SFX to be stacked
        const plinkSfx = new Audio(PLINK_SFX_PATH);
        plinkSfx.play();
        onClose();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={shown}>
        <ContentContainer>
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
`;

const ContentContainer = styled.div`
  background: white;
  padding: 24px;
`;