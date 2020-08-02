import React from 'react';
import styled from 'styled-components';
import {
  default as MaterialButton,
  ButtonProps,
} from '@material-ui/core/Button';
import { Touchable } from '..';
import ButtonBase from '../../../assets/images/ui/button_base.png'

export default function Button({ disabled, ...props }:
  Required<Pick<ButtonProps, 'onClick' | 'children'>>
  & Pick<ButtonProps, 'disabled'>
) {
  return disabled ? (
    <StyledMaterialButton disabled {...props} />
  ) : (
      <Touchable>
        <StyledMaterialButton {...props} />
      </Touchable>
    );
}

const StyledMaterialButton = styled(MaterialButton)`
  background-image: url(${ButtonBase});
  min-height: 56px;
  background-size: contain;
  background-repeat: no-repeat;

  && {
    min-width: 160px;
  }

  .MuiButton-label {
    font-family: HeadTextFont;
    color: white;
    font-size: 24px;
  }

  &:disabled .MuiButton-label  {
    color: #e2e2e282;
  }
`;
