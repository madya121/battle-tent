import React from 'react';

const PlinkSfx = require('../../../assets/audio/sfx/plink.mp3');

export type TouchableProps =
  React.HTMLAttributes<HTMLDivElement> &
  {
    audioPath?: string;
    disabled?: boolean;
  };

export default function Touchable({
  onClick,
  disabled,
  ...props
}: TouchableProps) {
  return (
    <div
      {...props}
      onClick={e => {
        // create an Audio object each time onClick triggered
        // to allow the SFX to be stacked
        if (!disabled) {
          const touchSfx = new Audio(props.audioPath || PlinkSfx);
          touchSfx.play();
          onClick && onClick(e);
        }
      }}
    />
  );
}
