import { ApiError } from './generated';

const readProblemField = (
  body: unknown,
  field: 'detail' | 'title',
): string | null => {
  if (typeof body !== 'object' || body === null) {
    return null;
  }

  const value = (body as Record<string, unknown>)[field];
  return typeof value === 'string' && value.length > 0 ? value : null;
};

const readValidationErrors = (body: unknown): string | null => {
  if (typeof body !== 'object' || body === null) {
    return null;
  }

  const errors = (body as Record<string, unknown>).errors;
  if (typeof errors !== 'object' || errors === null) {
    return null;
  }

  const messages = Object.values(errors as Record<string, unknown>).flatMap(
    (value) => {
      if (Array.isArray(value)) {
        return value.filter((item): item is string => typeof item === 'string');
      }

      return typeof value === 'string' ? [value] : [];
    },
  );

  return messages.length > 0 ? messages.join('; ') : null;
};

export const getProblemDetailsMessage = (
  body: unknown,
  fallback: string,
): string => {
  const validationErrors = readValidationErrors(body);
  if (validationErrors) {
    return validationErrors;
  }

  const detail = readProblemField(body, 'detail');
  if (detail) {
    return detail;
  }

  const title = readProblemField(body, 'title');
  if (title) {
    return title;
  }

  if (typeof body === 'string' && body.length > 0) {
    return body;
  }

  return fallback;
};

const isNetworkError = (error: unknown): boolean => {
  if (!(error instanceof TypeError)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message === 'failed to fetch' ||
    message.includes('networkerror') ||
    message.includes('network request failed')
  );
};

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (typeof error === 'string' && error.length > 0) {
    return error;
  }

  if (error instanceof ApiError) {
    return getProblemDetailsMessage(error.body, error.statusText || fallback);
  }

  if (isNetworkError(error)) {
    return import.meta.env.DEV
      ? 'Network error: check VITE_API_URL in .env.local and restart npm run dev'
      : 'Network error: unable to reach the API server';
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
