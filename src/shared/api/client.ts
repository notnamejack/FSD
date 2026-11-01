import { resolveApiBaseUrl, setConfiguredApiBaseUrl } from './base-url';
import { client } from './generated/client.gen';

export const ENCODE_PATH = encodeURIComponent;

const assertEncodedPaths = (): void => {
  const encoded = ENCODE_PATH('a/b?#');
  const url = client.buildUrl({
    path: { id: 'a/b?#' },
    url: '/probe/{id}',
  });

  if (!url.includes(`/probe/${encoded}`)) {
    throw new Error(
      '[api] path parameters must be encoded with encodeURIComponent',
    );
  }
};

client.interceptors.request.use((request) => {
  if (!resolveApiBaseUrl()) {
    throw new Error('[api] VITE_API_URL is not set');
  }

  return request;
});

export const configureApiClient = (baseUrl?: string): void => {
  const resolvedBase = setConfiguredApiBaseUrl(baseUrl);

  client.setConfig({
    baseUrl: resolvedBase,
    credentials: 'same-origin',
  });
  assertEncodedPaths();

  if (import.meta.env.DEV && !resolvedBase) {
    console.warn(
      '[api] VITE_API_URL is not set. Create .env.local with VITE_API_URL=https://your-api-host',
    );
  }
};

export const getApiClient = () => {
  if (!resolveApiBaseUrl()) {
    configureApiClient();
  }

  if (!resolveApiBaseUrl()) {
    throw new Error('[api] VITE_API_URL is not set');
  }

  return client;
};
