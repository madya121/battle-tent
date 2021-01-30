import React from 'react';
import { Router } from './navigation';
import { AuthProvider } from './auth';
import { PreloadContextProvider } from './assets/preloading';

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <PreloadContextProvider>
          <Router />
        </PreloadContextProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
