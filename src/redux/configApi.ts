import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const configApi = createApi({
    reducerPath: "configApi",
    baseQuery: fetchBaseQuery({baseUrl: "/"}),
    endpoints: builder => ({
        getConfig: builder.query<any, void>({
            query: () => "config/"
        })
    })
})

export const {useGetConfigQuery} = configApi