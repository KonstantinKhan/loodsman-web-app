import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const typeApi = createApi({
    reducerPath: "typeApi",
    baseQuery: fetchBaseQuery({baseUrl: "/config/type/"}),
    endpoints: builder => ({
        getType: builder.query<string, number>({
            query: (id: number) => ({
                url: `${id}/icon`,
                responseHandler: response => response.blob()
                    .then(blob => URL.createObjectURL(blob)),
            })
        })
    })
})

export const {useGetTypeQuery} = typeApi