// src/App.js
import React from 'react';
import { SiniestroProvider } from './context/siniestroContext';
import SiniestrosPage from './pages/siniestrosPage';

const App = () => {
  return (
    <SiniestroProvider>
      <SiniestrosPage />
    </SiniestroProvider>
  );
};

export default App;
