import React, { useContext, useState } from 'react';
import { PlayerContext } from '../../auth';
import { NavigationContext, ScreenState } from '../../navigation';
import Music from '../../Music';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { VolumeUp, VolumeOff } from '@material-ui/icons';

export default function Navbar() {
  const [user, setUser] = useContext(PlayerContext);
  const navigate = useContext(NavigationContext);

  function signout() {
    setUser(null);
    navigate(ScreenState.Login);
  }

  return (
    <NavbarContainer>
      {user ? (
        <>
          Welcome {user.name}!
          <button onClick={signout}>
            Change name
          </button>
        </>
      ) : (<p>Guest</p>)}
      <VolumeButton />
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
      {isMuted ? <VolumeOff /> : <VolumeUp />}
    </IconButton>
  );
}

const NavbarContainer = styled.nav`
  display: flex;
  width: 100%;
`;
