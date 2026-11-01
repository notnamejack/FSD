import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getApiErrorMessage, resolveApiBaseUrl } from '@/shared/api';

type HealthResponse = {
  status: string;
};

export const healthApi = createApi({
  reducerPath: 'healthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: resolveApiBaseUrl(),
  }),
  endpoints: (builder) => ({
    getHealth: builder.query<HealthResponse, void>({
      query: () => '/api/health',
      transformErrorResponse: (response) =>
        getApiErrorMessage(response, 'Health check failed'),
    }),
  }),
});

export const { useGetHealthQuery } = healthApi;
