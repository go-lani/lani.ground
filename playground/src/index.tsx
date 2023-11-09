import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hooks from './Hooks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Hooks />
  </React.StrictMode>,
);
