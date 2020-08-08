import React from 'react';
import {
  default as MaterialSlider,
  SliderProps as MaterialSliderProps,
} from '@material-ui/core/Slider';

// a workaround, since MaterialSliderProps wrongly type onChange
type SliderProps = MaterialSliderProps | {
  onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}
export default function Slider(props: SliderProps) {
  return (
    <MaterialSlider
      defaultValue={.8}
      min={0}
      max={1}
      step={.01}
      {...props}
    />
  );
}
