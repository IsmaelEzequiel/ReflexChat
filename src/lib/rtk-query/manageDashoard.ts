import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const manageDashoard = createApi({
  reducerPath: 'manageDashoard',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<ApiResponse<User[]>, null>({
      query: () => `api/dashboard/users`,
    }),
    selectCurrentConversation: builder.mutation<ApiResponse<Message[]>, string>({
      query(id) {
        return {
          url: `api/dashboard/${id}`,
          method: 'GET',
        }
      },
    }),
    findUserByName: builder.mutation<ApiResponse<User[]>, string>({
      query(name) {
        return {
          url: `api/dashboard/users/search/${name}`,
          method: 'GET',
        }
      },
    }),
    fetchOrCreateUserPost: builder.mutation<ApiResponse<{ user: User, session: Session }>, string>({
      query(userName) {
        return {
          url: 'api/user',
          method: 'POST',
          body: { userName },
        }
      }
    })
  }),
})

export const {
  useGetAllUsersQuery,
  useFindUserByNameMutation,
  useSelectCurrentConversationMutation,
} = manageDashoard