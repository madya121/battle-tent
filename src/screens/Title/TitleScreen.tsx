import React, { useContext, useEffect } from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { Touchable } from '../../components/basics';
import { LayoutContainer, LogoHeader } from './TitleScreen.styled';
import Logo from '../../assets/images/ui/logo.png';
import LoadingIndicator from '../../components/LoadingIndicator';
import { PreloadContext, preloadInitialAssets } from '../../assets/preloading';

export default function TitleScreen() {
  const navigate = useContext(NavigationContext);

  const {
    splashScreenLoading,
    setSplashScreenLoading,
    setLobbyScreenLoading,
    setBattleScreenLoading,
  } = useContext(PreloadContext);

  useEffect(function triggerPreload() {
    preloadInitialAssets(
      () => setSplashScreenLoading(false),
      () => setLobbyScreenLoading(false),
      () => setBattleScreenLoading(false),
    );
  }, []);

  function onClickScreen() {
    navigate(ScreenState.Login);
  }

  return splashScreenLoading ? (
    <div>
      <LoadingIndicator />
      <div style={{ position: 'absolute', visibility: 'hidden' }}>
        <p style={{ fontFamily: 'NormalTextFont' }}>preload NormalTextFont</p>
        <p style={{ fontFamily: 'HeadTextFont' }}>preload HeadTextFont</p>
      </div>
    </div>
  ) : (
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
