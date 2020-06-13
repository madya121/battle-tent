import React, { useContext } from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { Touchable } from '../../components/basics';
import { LayoutContainer, LogoHeader } from './TitleScreen.styled';
import Logo from '../../assets/images/logo.png';

export default function TitleScreen() {
  const navigate = useContext(NavigationContext);

  function onClickScreen() {
    navigate(ScreenState.Login);
  }

  return (
    <Touchable>
      <LayoutContainer onClick={onClickScreen}>
        <LogoHeader>
          <img src={Logo} alt='Battle Tent' />
        </LogoHeader>
        <main style={{ flex: 2 }}>
          <h3 style={{ color: 'gray' }}>Tap to continue</h3>
        </main>
      </LayoutContainer>
    </Touchable>
  );
}
