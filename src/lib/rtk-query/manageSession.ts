import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const manageSession = createApi({
  reducerPath: 'manageSession',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getMessageById: builder.query<Message, string>({
      query: (sessionId) => `api/message/${sessionId}`,
    }),
    fetchOrCreateUserPost: builder.mutation<ApiResponse<{ user: User, session: Session }>, string>({
      query(userName) {
        return {
          url: `api/user`,
          method: 'POST',
          body: { userName },
        }
      }
    })
  }),
})

export const { useFetchOrCreateUserPostMutation, useGetMessageByIdQuery } = manageSession