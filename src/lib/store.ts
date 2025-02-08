import { configureStore } from "@reduxjs/toolkit"
import { sessionSlice } from "@/lib/session/sessionSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      session: sessionSlice.reducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']