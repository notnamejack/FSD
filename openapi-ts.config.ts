import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi.json',
  output: './src/shared/api/generated',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      baseUrl: false,
      runtimeConfigPath: './src/shared/api/hey-api.ts',
    },
  ],
});
