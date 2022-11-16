import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const settingsAppApi = createApi({
    reducerPath: "settingsAppApi",
    baseQuery: fetchBaseQuery({baseUrl: "/"}),
    endpoints: (builder) => ({
        getSettingsApp: builder.query<any, void>({
            query: () => "data/config.json",
            transformResponse: (response: any) => {
                return response.data.json()
            }
        })
    })
})

export const {useGetSettingsAppQuery} = settingsAppApi