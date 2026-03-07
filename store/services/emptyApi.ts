import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from '@/env';

export const emptyApi = createApi({
  reducerPath: 'notespitaraApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    credentials: 'include', // send/receive HttpOnly cookies
  }),
  endpoints: () => ({}),
});
