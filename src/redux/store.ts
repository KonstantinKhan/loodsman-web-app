import {configureStore} from "@reduxjs/toolkit";
import {loodsmanObjectApi} from "./loodsmanObjectApi";
import {configApi} from "./configApi";
import modeReducer from "./modeSlice"
import findObjectReducer from "./findObjectSlice"

export const store = configureStore({
    reducer: {
        mode: modeReducer,
        findObject: findObjectReducer,
        [loodsmanObjectApi.reducerPath]: loodsmanObjectApi.reducer,
        [configApi.reducerPath]: configApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                loodsmanObjectApi.middleware,
                configApi.middleware
            ),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
