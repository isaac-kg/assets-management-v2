import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<any, void>({
      query: () => 'items/item/fetch-items',
      providesTags: ['Product'],
      transformResponse: (response) => {
        console.log("This is is product::: ", response.items)
        return response.items;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
