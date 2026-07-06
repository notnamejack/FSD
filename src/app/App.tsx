import { RouterProvider } from 'react-router-dom';

import { AntdProvider } from './providers/antd';
import { I18nProvider } from './providers/i18n';
import { router } from './providers/router';
import { StoreProvider } from './providers/store';
import './styles/index.scss';

export const App = () => {
  return (
    <StoreProvider>
      <I18nProvider>
        <AntdProvider>
          <RouterProvider router={router} />
        </AntdProvider>
      </I18nProvider>
    </StoreProvider>
  );
};
