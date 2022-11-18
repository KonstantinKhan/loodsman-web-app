import {configureStore} from "@reduxjs/toolkit";
import {loodsmanObjectApi} from "./loodsmanObjectApi";
import {stateApi} from "./stateApi";
import {typeApi} from "./typeApi";
import {configApi} from "./configApi";
import modeReducer from "./modeSlice"

export const store = configureStore({
    reducer: {
        mode: modeReducer,
        [loodsmanObjectApi.reducerPath]: loodsmanObjectApi.reducer,
        [stateApi.reducerPath]: stateApi.reducer,
        [typeApi.reducerPath]: typeApi.reducer,
        [configApi.reducerPath]: configApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                loodsmanObjectApi.middleware,
                stateApi.middleware,
                typeApi.middleware,
                configApi.middleware
            ),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch