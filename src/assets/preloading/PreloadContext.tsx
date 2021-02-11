import React, { useState, Dispatch, SetStateAction } from 'react';

interface PreloadContextValue {
  splashScreenLoading: boolean;
  setSplashScreenLoading: Dispatch<SetStateAction<boolean>>;
  lobbyScreenLoading: boolean;
  setLobbyScreenLoading: Dispatch<SetStateAction<boolean>>;
  battleScreenLoading: boolean;
  setBattleScreenLoading: Dispatch<SetStateAction<boolean>>;
}

export const PreloadContext = React.createContext<PreloadContextValue>({
  splashScreenLoading: true,
  setSplashScreenLoading: () => { },
  lobbyScreenLoading: true,
  setLobbyScreenLoading: () => { },
  battleScreenLoading: true,
  setBattleScreenLoading: () => { },
});

export function PreloadContextProvider(props: { children: React.ReactNode }) {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);
  const [lobbyScreenLoading, setLobbyScreenLoading] = useState(true);
  const [battleScreenLoading, setBattleScreenLoading] = useState(true);
  return (
    <PreloadContext.Provider
      value={{
        splashScreenLoading, setSplashScreenLoading,
        lobbyScreenLoading, setLobbyScreenLoading,
        battleScreenLoading, setBattleScreenLoading,
      }}
      {...props}
    />
  );
}
