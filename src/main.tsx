import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DealershipProvider } from './context/DealershipContext';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DealershipProvider>
        <App />
      </DealershipProvider>
    </BrowserRouter>
  </React.StrictMode>
);
