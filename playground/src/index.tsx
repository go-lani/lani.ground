import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './App.css';
import Hooks from './test/Hooks';
import ImageViewer from './test/ImageVIewer';
import Modals from './test/Modal';
import OutsideClickHandler from './test/OutsideClickHandler';
import Picker from './test/Picker';
import CustomPickerPage from './test/picker/CustomPickerPage';
import DatePickerPage from './test/picker/DatePickerPage';
import DateTimePickerPage from './test/picker/DateTimePickerPage';
import RangePickerPage from './test/picker/RangePickerPage';
import TimePickerPage from './test/picker/TimePickerPage';

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
  {
    path: '/react-picker',
    element: <Picker />,
  },
  {
    path: '/react-picker/date',
    element: <DatePickerPage />,
  },
  {
    path: '/react-picker/range',
    element: <RangePickerPage />,
  },
  {
    path: '/react-picker/datetime',
    element: <DateTimePickerPage />,
  },
  {
    path: '/react-picker/time',
    element: <TimePickerPage />,
  },
  {
    path: '/react-picker/custom',
    element: <CustomPickerPage />,
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
