import React from 'react';
import { Duo } from '@material-ui/icons';

export enum QuickChatOption {
  None,
  OK,
  GoodGame,
  WellPlayed,
  TestIcon,
}

export const quickChatOptionDisplay: Partial<
  Record<QuickChatOption, string | Emoticon>
> = {
  [QuickChatOption.OK]: 'OK!',
  [QuickChatOption.GoodGame]: 'Good Game!',
  [QuickChatOption.WellPlayed]: 'Well Played!',
  [QuickChatOption.TestIcon]: <Duo />,
}

type Emoticon = JSX.Element;

export const availableOptions = [
  QuickChatOption.OK,
  QuickChatOption.GoodGame,
  QuickChatOption.WellPlayed,
  QuickChatOption.TestIcon,
];
