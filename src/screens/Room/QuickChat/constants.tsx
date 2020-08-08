import React from 'react';
import { Duo } from '@material-ui/icons';

export enum QuickChatOption {
  None = '',
  OK = 'OK!',
  GoodGame = 'good game!',
  WellPlayed = 'well played!',
  Prepare = 'prepare!',
  TakeThis = 'take this!',
  StopIt = 'stop it!',
  Enough = 'enough!',
  Rematch = 'rematch!',
  ThankYou = 'thank you!',
  TestIcon = 'TestIcon',
}

type Emoticon = JSX.Element;

export function displayChatOption(option: QuickChatOption): string | Emoticon {
  switch (option) {
    case QuickChatOption.TestIcon: return <Duo />;
    default: return option;
  }
}

export const availableOptions = [
  QuickChatOption.OK,
  QuickChatOption.GoodGame,
  QuickChatOption.WellPlayed,
  QuickChatOption.Prepare,
  QuickChatOption.TakeThis,
  QuickChatOption.StopIt,
  QuickChatOption.Enough,
  QuickChatOption.Rematch,
  QuickChatOption.ThankYou,
];
