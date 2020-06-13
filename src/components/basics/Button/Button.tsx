import React from 'react';
import styled from 'styled-components';
import {
  default as MaterialButton,
  ButtonProps,
} from '@material-ui/core/Button';
import { Touchable } from '..';
import ButtonBg from '../../../assets/images/button_bg.png'

export default function Button({ ...props }:
  Required<Pick<ButtonProps, 'onClick' | 'children'>>
  & Pick<ButtonProps, 'disabled'>
) {
  return (
    <Touchable>
      <StyledMaterialButton {...props} />
    </Touchable>
  );
}

const StyledMaterialButton = styled(MaterialButton)`
  background-image: url(${ButtonBg});
  min-height: 56px;
  background-size: contain;
  background-repeat: no-repeat;
  && {
    min-width: 160px;
  }
`;
