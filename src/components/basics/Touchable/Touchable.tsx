import React from 'react';
import { PLINK_SFX_PATH } from '../../../constants/paths/audio';

export default function Touchable(
  props: React.HTMLAttributes<HTMLDivElement> &
    Required<Pick<React.HTMLAttributes<HTMLDivElement>, 'onClick'>> &
  { audioPath?: string }
) {
  return (
    <div
      {...props}
      onClick={e => {
        // create an Audio object each time onClick triggered
        // to allow the SFX to be stacked
        const touchSfx = new Audio(props.audioPath || PLINK_SFX_PATH);
        touchSfx.play();
        props.onClick(e);
      }}
    />
  );
}
