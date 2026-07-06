import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@/shared/lib/i18n';

import { configureApiClient } from '@/shared/api';

import { App } from '@/app';

configureApiClient();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "#root" not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
