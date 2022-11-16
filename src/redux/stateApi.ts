import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const stateApi = createApi({
    reducerPath: "stateApi",
    baseQuery: fetchBaseQuery({baseUrl: "/config/state/"}),
    endpoints: builder => ({
        getState: builder.query<string, number>({
            query: (id: number) => ({
                url: `${id}/icon`,
                responseHandler: response => response.blob()
                    .then(blob => URL.createObjectURL(blob)),
            })
        })
    })
})

export const {useGetStateQuery} = stateApi