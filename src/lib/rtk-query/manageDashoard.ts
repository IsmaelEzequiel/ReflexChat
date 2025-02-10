import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const manageDashoard = createApi({
  reducerPath: 'manageDashoard',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<ApiResponse<User[]>, null>({
      query: () => `/api/dashboard/users`,
    }),
    selectCurrentConversation: builder.mutation<ApiResponse<Message[]>, string>({
      query(id) {
        return {
          url: `/api/dashboard/${id}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useSelectCurrentConversationMutation,
} = manageDashoard