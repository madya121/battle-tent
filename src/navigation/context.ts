import React, { Dispatch, SetStateAction } from 'react';
import { ScreenState } from '.';

export default React.createContext<
  Dispatch<SetStateAction<ScreenState>>
>(() => { });
