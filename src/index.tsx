import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { rootStore } from './stores/root-store';
import { RootStoreProvider } from './stores/root-store-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RootStoreProvider value={rootStore}>
            <App />
        </RootStoreProvider>
    </React.StrictMode>
);
