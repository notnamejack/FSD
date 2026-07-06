import { ApiClient, OpenAPI } from './generated';

let apiClient: ApiClient | null = null;

const resolveApiBaseUrl = (baseUrl?: string): string =>
  (baseUrl ?? import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export const configureApiClient = (baseUrl?: string): void => {
  const resolvedBase = resolveApiBaseUrl(baseUrl);

  OpenAPI.BASE = resolvedBase;
  apiClient = new ApiClient({ BASE: resolvedBase });

  if (import.meta.env.DEV && !resolvedBase) {
    console.warn(
      '[api] VITE_API_URL is not set. Create .env.local with VITE_API_URL=https://your-api-host',
    );
  }
};

export const getApiClient = (): ApiClient => {
  if (!apiClient) {
    configureApiClient();
  }

  return apiClient as ApiClient;
};
