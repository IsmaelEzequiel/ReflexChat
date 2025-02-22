import { configureStore } from "@reduxjs/toolkit"
import { sessionSlice } from "@/lib/session/sessionSlice"
import { manageSession } from "@/lib/rtk-query/manageSession"
import { rtkQueryErrorLogger } from "./middlewares/errorHandler"
import { manageDashoard } from "./rtk-query/manageDashoard"

export const makeStore = () => {
  return configureStore({
    reducer: {
      session: sessionSlice.reducer,
      [manageSession.reducerPath]: manageSession.reducer,
      [manageDashoard.reducerPath]: manageDashoard.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(
          manageSession.middleware,
          manageDashoard.middleware,
          rtkQueryErrorLogger
        )
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']