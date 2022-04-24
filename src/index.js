import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { ScreenContextProvider } from './context/screen-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScreenContextProvider>
      <App />
    </ScreenContextProvider>
  </React.StrictMode>
);

