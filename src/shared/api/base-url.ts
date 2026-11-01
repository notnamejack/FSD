const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

let configuredBaseUrl: string | null = null;

const normalizeApiBaseUrl = (raw: string): string => {
  if (!raw) {
    return '';
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('[api] VITE_API_URL must be an absolute http(s) URL');
  }

  if (url.username || url.password) {
    throw new Error('[api] VITE_API_URL must not include credentials');
  }

  const loopback = LOOPBACK_HOSTS.has(url.hostname);
  const https = url.protocol === 'https:';
  const httpOnLoopback =
    url.protocol === 'http:' && loopback && import.meta.env.DEV;

  if (!https && !httpOnLoopback) {
    throw new Error(
      '[api] VITE_API_URL must use https (http is allowed only for localhost in development)',
    );
  }

  const pathname = url.pathname.replace(/\/$/, '');
  return `${url.origin}${pathname === '/' ? '' : pathname}`;
};

export const resolveApiBaseUrl = (baseUrl?: string): string => {
  if (baseUrl !== undefined) {
    return normalizeApiBaseUrl(baseUrl.trim());
  }

  if (configuredBaseUrl !== null) {
    return configuredBaseUrl;
  }

  return normalizeApiBaseUrl((import.meta.env.VITE_API_URL ?? '').trim());
};

export const setConfiguredApiBaseUrl = (baseUrl?: string): string => {
  configuredBaseUrl = resolveApiBaseUrl(
    baseUrl ?? import.meta.env.VITE_API_URL ?? '',
  );
  return configuredBaseUrl;
};
