import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['location'],
  endpoints: (build) => ({
    getLocations: build.query<any, void>({
      query: () => 'fetch-all-locations',
      providesTags: ['location'],
      transformResponse: (response) => {
        return response.locations;
      },
    }),
  }),
});

export const { useGetLocationsQuery } = locationApi;
