import { createSlice } from '@reduxjs/toolkit'
import { manageSession } from '../rtk-query/manageSession'
import { manageDashoard } from '../rtk-query/manageDashoard'

const initialState: sessionState = {
  data: {
    user: null,
    users: null,
    session: null,
    message: null,
  }
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
        manageDashoard.endpoints.findUserByName.matchFulfilled,
        (state, { payload }) => {
          state.data.users = payload.content
        }
      )
  }
})

export const { resetSession } = sessionSlice.actions

export default sessionSlice.reducer