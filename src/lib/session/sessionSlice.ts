import { createSlice } from '@reduxjs/toolkit'
import { manageSession } from '../rtk-query/manageSession'

const initialState: sessionState = {
  data: {
    user: null,
    session: null,
    message: null,
  },
  loading: false,
  error: null
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    resetSession: (state) => {
      state = initialState
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        manageSession.endpoints.fetchOrCreateUserPost.matchFulfilled,
        (state, { payload }) => {
          state.data = payload.content
        }
      )
      .addMatcher(
        manageSession.endpoints.fetchCreateMessagePost.matchFulfilled,
        (state, { payload }) => {
          state.data = payload.content
        }
      )
  }
})

export const { resetSession } = sessionSlice.actions

export default sessionSlice.reducer