import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User extends Record<string, any> {
  id: string
  firstName: string
}

const baseUrl =  `${process.env.REACT_APP_BASE_URL}`

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUsers: build.query<any, void>({
      query: () => 'fetch-users',
      providesTags: ["User"],
      transformResponse: response => {
        return response?.users;
    },
    }),
    addUser: build.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `signup`,
        method: 'POST',
        body,
        }),
      invalidatesTags: ['User'],
    }),
    // getUser: build.query<Post, string>({
    //   query: (id) => `posts/${id}`,
    //   providesTags: (result, error, id) => [{ type: 'Post', id }],
    // }),
    // updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
    //   query: ({ id, ...patch }) => ({
    //     url: `posts/${id}`,
    //     method: 'PUT',
    //     body: patch,
    //   }),
    //   async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    //     const patchResult = dispatch(
    //       api.util.updateQueryData('getPost', id, (draft) => {
    //         Object.assign(draft, patch)
    //       }),
    //     )
    //     try {
    //       await queryFulfilled
    //     } catch {
    //       patchResult.undo()
    //     }
    //   },
    //   invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    // }),
    // deletePost: build.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `posts/${id}`,
    //       method: 'DELETE',
    //     }
    //   },
    //   invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    // }),
  }),
})

export const {
  useAddUserMutation,
  useGetUsersQuery
} = userApi
