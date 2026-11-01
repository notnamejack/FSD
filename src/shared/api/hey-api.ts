import { resolveApiBaseUrl } from './base-url';

const guardedFetch: typeof fetch = (input, init) => {
  if (!resolveApiBaseUrl()) {
    return Promise.reject(new Error('[api] VITE_API_URL is not set'));
  }

  return globalThis.fetch(input, init);
};

export const createClientConfig = <T extends { baseUrl?: string }>(
  config: T = {} as T,
): T & {
  baseUrl: string;
  credentials: RequestCredentials;
  fetch: typeof fetch;
} => ({
  ...config,
  baseUrl: resolveApiBaseUrl(),
  credentials: 'same-origin',
  fetch: guardedFetch,
});
