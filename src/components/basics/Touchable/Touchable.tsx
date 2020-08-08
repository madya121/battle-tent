import React from 'react';
import audio from '../../../audio';

export interface TouchableProps extends React.HTMLAttributes<HTMLDivElement> {
  audioSrc?: string;
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
          audio.playSfx(props.audioSrc);
          onClick && onClick(e);
        }
      }}
    />
  );
}
