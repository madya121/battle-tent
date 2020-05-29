import React, { useContext } from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { LayoutContainer } from './TitleScreen.styled';
import { PLINK_SFX_PATH } from '../../constants/paths/audio';

export default function TitleScreen() {
  const navigate = useContext(NavigationContext);

  function onClickScreen() {
    const plinkSfx = new Audio(PLINK_SFX_PATH);
    plinkSfx.play();
    navigate(ScreenState.Login);
  }

  return (
    <LayoutContainer onClick={onClickScreen}>
      <header>
        <h1>Battle Tent</h1>
      </header>
      <main>
        <h5>Tap to continue</h5>
      </main>
    </LayoutContainer>
  );
}
