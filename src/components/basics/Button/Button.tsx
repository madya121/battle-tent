import React from 'react';
import styled from 'styled-components';
import {
  default as MaterialButton,
  ButtonProps,
} from '@material-ui/core/Button';
import { PLINK_SFX_PATH } from '../../../constants/paths/audio';

export default function Button({ ...props }:
  Required<Pick<ButtonProps, 'onClick' | 'children'>>
  & Pick<ButtonProps, 'disabled'>
) {
  return (
    <StyledMaterialButton
      {...props}
      onClick={e => {
        // create an Audio object each time onClick triggered
        // to allow the SFX to be stacked
        const plinkSfx = new Audio(PLINK_SFX_PATH);
        plinkSfx.play();
        props.onClick(e);
      }}
    />
  );
}

const StyledMaterialButton = styled(MaterialButton)`
  && {
    color: inherit;
  }
`;
