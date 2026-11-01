const STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isNetworkError = (error: unknown): boolean => {
  if (error instanceof TypeError) {
    const message = error.message.toLowerCase();
    return (
      message === 'failed to fetch' ||
      message.includes('networkerror') ||
      message.includes('network request failed')
    );
  }

  if (!isRecord(error)) {
    return false;
  }

  return error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR';
};

const readStatus = (error: unknown): number | undefined => {
  if (!isRecord(error) || typeof error.status !== 'number') {
    return undefined;
  }

  return error.status;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (isNetworkError(error)) {
    return import.meta.env.DEV
      ? 'Network error: check VITE_API_URL in .env.local and restart npm run dev'
      : 'Network error: unable to reach the API server';
  }

  const status = readStatus(error);
  if (status !== undefined) {
    return STATUS_MESSAGES[status] ?? fallback;
  }

  return fallback;
};
