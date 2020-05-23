import React from 'react';
import {
  default as MaterialButton,
  ButtonProps,
} from '@material-ui/core/Button';


export default function Button({ ...props }: Pick<ButtonProps, 'onClick' | 'children' | 'disabled'>) {
  return (
    <MaterialButton {...props} />
  );
}
