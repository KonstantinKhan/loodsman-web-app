import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IConfig} from "../types/IConfig";

export const configApi = createApi({
    reducerPath: "configApi",
    baseQuery: fetchBaseQuery({baseUrl: "/"}),
    endpoints: builder => ({
        getConfig: builder.query<IConfig, void>({
            query: () => "config/"
        })
    })
})

export const {useGetConfigQuery} = configApi