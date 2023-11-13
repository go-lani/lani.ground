import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import App from './App';
import ImageViewer from './test/ImageVIewer';
import OutsideClickHandler from './test/OutsideClickHandler';
import Hooks from './test/Hooks';
import Modals from './test/Modal';

export const TEST_COMPONENTS = [
  {
    path: '/react-image-viewer',
    element: <ImageViewer />,
  },
  {
    path: '/react-outside-click-handler',
    element: <OutsideClickHandler />,
  },
  {
    path: '/react-hooks',
    element: <Hooks />,
  },
  {
    path: '/react-modal',
    element: <Modals />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: TEST_COMPONENTS,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
