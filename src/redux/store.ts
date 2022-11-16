import {configureStore} from "@reduxjs/toolkit";
import {loodsmanObjectApi} from "./loodsmanObjectApi";
import {stateApi} from "./stateApi";
import {typeApi} from "./typeApi";
import {configApi} from "./configApi";

export const store = configureStore({
    reducer: {
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