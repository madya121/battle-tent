import React, { useState, useEffect } from 'react';
import { preloadInitialAssets } from './preloadAssets';

interface PreloadContextValue {
  splashScreenLoading: boolean;
  lobbyScreenLoading: boolean;
  battleScreenLoading: boolean;
}

export const PreloadContext = React.createContext<PreloadContextValue>({
  splashScreenLoading: true,
  lobbyScreenLoading: true,
  battleScreenLoading: true,
});

export function PreloadContextProvider(props: { children: React.ReactNode }) {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);
  const [lobbyScreenLoading, setLobbyScreenLoading] = useState(true);
  const [battleScreenLoading, setBattleScreenLoading] = useState(true);

  useEffect(function triggerPreload() {
    preloadInitialAssets(
      () => setSplashScreenLoading(false),
      () => setLobbyScreenLoading(false),
      () => setBattleScreenLoading(false),
    );
  }, []);

  return (
    <PreloadContext.Provider
      value={{
        splashScreenLoading,
        lobbyScreenLoading,
        battleScreenLoading,
      }}
      {...props}
    />
  );
}
