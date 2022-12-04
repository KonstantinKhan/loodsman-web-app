import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {IItem} from "../types/IItem";
import configApp from "../data/config.json"
import {IFindObject} from "../types/IFindObject";

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
        }),
        findObject: builder.query<IItem[], IFindObject>({
            query: (findObject: IFindObject) => ({
                url: "object/find",
                method: "POST",
                body: findObject
            })

        })
    })
})

export const {useGetLoodsmanObjectsQuery, useLazyGetLoodsmanObjectQuery, useLazyFindObjectQuery} = loodsmanObjectApi