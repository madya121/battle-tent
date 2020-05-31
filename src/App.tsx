import React from 'react';
import { Router } from './navigation';
import { AuthProvider } from './auth';

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </React.StrictMode>
  );
}
