export { resolveApiBaseUrl } from './base-url';
export { configureApiClient, ENCODE_PATH, getApiClient } from './client';
export { getApiErrorMessage } from './errors';
export { getApiHealth, type Options } from './generated';
export type {
  ClientOptions,
  GetApiHealthData,
  GetApiHealthError,
  GetApiHealthErrors,
  GetApiHealthResponse,
  GetApiHealthResponses,
  HealthResponse,
  ProblemDetails,
} from './generated';
