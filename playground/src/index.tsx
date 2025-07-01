import { ModalProvider } from '@lani.ground/react-modal';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './App.css';
import Hooks from './test/Hooks';
import ImageViewer from './test/ImageVIewer';
import KitPage from './test/KitPage';
import CookieKitPage from './test/kits/CookieKitPage';
import DateKitPage from './test/kits/DateKitPage';
import NumberKitPage from './test/kits/NumberKitPage';
import ObjectKitPage from './test/kits/ObjectKitPage';
import StringKitPage from './test/kits/StringKitPage';
import ValidateKitPage from './test/kits/ValidateKitPage';
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
  {
    path: '/kits',
    element: <KitPage />,
  },
  {
    path: '/kits/date',
    element: <DateKitPage />,
  },
  {
    path: '/kits/number',
    element: <NumberKitPage />,
  },
  {
    path: '/kits/string',
    element: <StringKitPage />,
  },
  {
    path: '/kits/object',
    element: <ObjectKitPage />,
  },
  {
    path: '/kits/validate',
    element: <ValidateKitPage />,
  },
  {
    path: '/kits/cookie',
    element: <CookieKitPage />,
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
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>,
);
