import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hooks from './Hooks';
import String from './String';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <String />
  </React.StrictMode>,
);
