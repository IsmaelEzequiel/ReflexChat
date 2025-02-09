import { createSlice } from '@reduxjs/toolkit'
import fetchUserAndSession from '../async-thunk/fetchUserAndSession'

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAndSession.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserAndSession.fulfilled, (state, action) => {
        state.data = action.payload.content
        state.loading = false
      })
      .addCase(fetchUserAndSession.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ErrorResponse
      })
  }
})

export const {} = sessionSlice.actions

export default sessionSlice.reducer