import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  subscribeDisconnected,
  subscribeReconnecting,
  subscribeReconnectError,
  subscribeReconnectFailed,
  subscribeReconnected,
} from '../../api';
import { NavigationContext, ScreenState } from '../../navigation';

export default function ConnectionProblemIndicator() {
  const [showIndicator, setShowIndicator] = useState(false);
  const navigate = useContext(NavigationContext);

  useEffect(() => {
    subscribeReconnecting(() => {
      setShowIndicator(true);
      console.warn('Disconnected, attempt to reconnect...');
    });
    subscribeReconnected(() => {
      setShowIndicator(false);
      console.warn('Reconnected!');
      navigate(ScreenState.Title);
    });
  }, []);

  return (
    <OverlayBase show={showIndicator}>
      <CircularProgress />
      <p>Reconnecting...</p>
    </OverlayBase>
  )
}

const OverlayBase = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: ${props => props.show ? 'flex' : 'none'};

  // make the component centered
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  color: white;
`;
