import React, { useState, useEffect } from 'react';
import { preloadInitialAssets } from './preloadAssets';

interface PreloadContextValue {
  splashScreenLoading: boolean;
  lobbyScreenLoading: boolean;
  roomScreenLoading: boolean;
  battleStepLoading: boolean;
}

export const PreloadContext = React.createContext<PreloadContextValue>({
  splashScreenLoading: true,
  lobbyScreenLoading: true,
  roomScreenLoading: true,
  battleStepLoading: true,
});

export function PreloadContextProvider(props: { children: React.ReactNode }) {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);
  const [lobbyScreenLoading, setLobbyScreenLoading] = useState(true);
  const [roomScreenLoading, setRoomScreenLoading] = useState(true);
  const [battleStepLoading, setBattleStepLoading] = useState(true);

  useEffect(function triggerPreload() {
    preloadInitialAssets(
      () => setSplashScreenLoading(false),
      () => setLobbyScreenLoading(false),
      () => { },
      () => setRoomScreenLoading(false),
      () => setBattleStepLoading(false),
    );
  }, []);

  return (
    <PreloadContext.Provider
      value={{
        splashScreenLoading,
        lobbyScreenLoading,
        roomScreenLoading,
        battleStepLoading,
      }}
      {...props}
    />
  );
}
