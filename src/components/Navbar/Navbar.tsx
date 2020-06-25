import React, { useContext, useState } from 'react';
import { PlayerContext } from '../../auth';
import { NavigationContext, ScreenState } from '../../navigation';
import Music from '../../Music';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import VolumeOn from '../../assets/images/sound.png';
import VolumeOff from '../../assets/images/sound_off.png';
import { guest } from '../../auth/PlayerContext';

export default function Navbar() {
  const [player, setPlayer] = useContext(PlayerContext);
  const navigate = useContext(NavigationContext);

  function signout() {
    setPlayer(guest);
    navigate(ScreenState.Login);
  }

  return (
    <NavbarContainer>
      <VolumeButton />
      {/* {user ? (
        <>
          Welcome {user.name}!
          <button onClick={signout}>
            Change name
          </button>
        </>
      ) : (<p>Guest</p>)} */}
    </NavbarContainer>
  );
}

function VolumeButton() {
  // state is just for triggering re-render
  const [isMuted, setIsMuted] = useState(Music.masterVolume === 0)

  function onChangeVolume() {
    // now its just on/off, // TODO make it float between 0 to 1
    setIsMuted(!isMuted);
    // always check from the source of truth
    if (Music.masterVolume === 0) {
      Music.setMasterVolume(Music.defaultMasterVolume);
    } else {
      Music.setMasterVolume(0);
    }
  }

  return (
    <IconButton aria-label="volume" onClick={onChangeVolume}>
      <img
        alt="music-volume"
        src={isMuted ? VolumeOff : VolumeOn}
        width="28px"
      />
    </IconButton>
  );
}

const NavbarContainer = styled.nav`
  display: flex;
  width: 100%;
`;
