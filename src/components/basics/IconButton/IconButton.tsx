import React from 'react';
import styled from 'styled-components';
import {
  default as MaterialIconButton,
  IconButtonProps,
} from '@material-ui/core/IconButton';

export default function IconButton({ ...props }:
  Required<Pick<IconButtonProps, 'onClick' | 'children'>>
  & Pick<IconButtonProps, 'disabled'>
) {
  return (
    <StyledMaterialIconButton {...props} />
  );
}

const StyledMaterialIconButton = styled(MaterialIconButton)``;
//   && {
//     color: inherit;
//   }
// `;
