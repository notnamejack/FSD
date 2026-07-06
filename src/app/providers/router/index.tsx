import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';

import { ROUTES } from '@/shared/config';

import { BaseLayout } from './base-layout';

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
