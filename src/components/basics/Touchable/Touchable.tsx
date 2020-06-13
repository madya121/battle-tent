import React from 'react';

const PlinkSfx = require('../../../assets/audio/sfx/plink.mp3');

export default function Touchable(
  props: React.HTMLAttributes<HTMLDivElement> &
  { audioPath?: string }
) {
  return (
    <div
      {...props}
      onClick={e => {
        // create an Audio object each time onClick triggered
        // to allow the SFX to be stacked
        const touchSfx = new Audio(props.audioPath || PlinkSfx);
        touchSfx.play();
        props.onClick && props.onClick(e);
      }}
    />
  );
}
