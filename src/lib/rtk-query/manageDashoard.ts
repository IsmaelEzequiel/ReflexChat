import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const manageDashoard = createApi({
  reducerPath: 'manageDashoard',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<ApiResponse<User[]>, null>({
      query: () => `api/dashboard/users`,
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
  useGetAllUsersQuery
} = manageDashoard