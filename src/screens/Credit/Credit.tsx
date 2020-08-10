import React, { useContext, useEffect } from 'react';
import { NavigationContext, ScreenState } from '../../navigation';
import { Button } from '../../components/basics';
import { LayoutContainer, LogoHeader } from './Credit.styled';
import audio from '../../audio';
import Logo from '../../assets/images/ui/logo.png';

const CreditScreenBgm = require('../../assets/audio/bgm/0i3_Title_Screen.mp3');

export default function Credit() {
  const navigate = useContext(NavigationContext);

  useEffect(() => {
    audio.playBgm(CreditScreenBgm, { delay: 0 });
  }, []);

  return (
    <LayoutContainer>
      <LogoHeader>
        <img src={Logo} alt='Battle Tent' />
      </LogoHeader>
      <main style={{ flex: 2 }}>
        Credits
        projectpokemon.org
        Ken Sugimori pokedex art veekun.com
        pokemondb.net
        KH Insider
        <Button onClick={() => navigate(ScreenState.Lobby)}>Back</Button>
      </main>
    </LayoutContainer >
  );
}
