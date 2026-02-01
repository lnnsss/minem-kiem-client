import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { rootStore } from './stores/root-store';
import { RootStoreProvider } from './stores/root-store-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RootStoreProvider value={rootStore}>
          <App />
      </RootStoreProvider>
  </StrictMode>,
)
