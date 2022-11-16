import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {IItem} from "../types/IItem";
import configApp from "../data/config.json"

export const loodsmanObjectApi = createApi({
    reducerPath: "loodsmanObjectApi",
    baseQuery: fetchBaseQuery({baseUrl: "/"}),
    endpoints: (builder) => ({
        getLoodsmanObjects: builder.query<IItem[], void>({
            query: () => "object/",
            transformResponse: (response: IItem[]) => {
                return response.filter(object => configApp.projectsId.includes(object.id))
            }
        }),
        getLoodsmanObject: builder.query<IItem[], number>({
            query: (id: number) => `object/${id}`
        })
    })
})

export const {useGetLoodsmanObjectsQuery, useGetLoodsmanObjectQuery} = loodsmanObjectApi