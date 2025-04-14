import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import { BrowserRouter } from 'react-router';
import './styles/index.css';
import { App } from './App';
import AlertProvider from './providers/AlertProvider';
import AlertDialog from './components/AlertDialog';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider AlertComponent={AlertDialog}>
      <App />
    </AlertProvider>
  </StrictMode>
);
