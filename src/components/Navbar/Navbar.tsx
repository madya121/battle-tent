import React, { useState } from 'react';
// import { PlayerContext } from '../../auth';
// import { NavigationContext } from '../../navigation';
// import { NavigationContext, ScreenState } from '../../navigation';
import audio from '../../audio';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import VolumeOn from '../../assets/images/ui/sound.png';
import VolumeOff from '../../assets/images/ui/sound_off.png';
// import { guest } from '../../auth/PlayerContext';

export default function Navbar() {
  // const [player, setPlayer] = useContext(PlayerContext);
  // const navigate = useContext(NavigationContext);

  // function signout() {
  //   setPlayer(guest);
  //   navigate(ScreenState.Login);
  // }

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
  const [isMuted, setIsMuted] = useState(audio.masterVolume === 0)

  function onChangeVolume() {
    // now its just on/off, // TODO make it float between 0 to 1
    setIsMuted(!isMuted);
    // always check from the source of truth
    if (audio.masterVolume === 0) {
      audio.setVolume(audio.defaultVolume);
    } else {
      audio.setVolume(0);
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
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 16px 32px;
`;
