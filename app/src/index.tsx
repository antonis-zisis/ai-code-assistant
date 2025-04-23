import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from './components/ErrorBoundary';
import { App } from './App';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
}
