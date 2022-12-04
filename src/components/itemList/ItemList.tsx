 import {IItem} from "../../types/IItem";
// import React, {useEffect, useState} from "react";
// import {Item} from "../item/Item";
// import {fetchItems} from "../fetch/fetchItems";
// import {search} from "../urls";
// import {ISearch} from "../../types/ISearch";
// // import fetchTypeIcon from "../fetch/fetchTypeIcon";
// import fetchStateIcon from "../fetch/fetchStateIcon";
// import {Spinner} from "../spinner/Spinner";
//
// interface IProps {
//     level: number
//     url: string
//     onItemSelected: (item: IItem) => void
//     onShowCard: (showCard: boolean) => void
//     activeId: number
//     queryRequest: string
//     typesRequest: string[]
//     statesRequest: string[]
//     versionRequest: string
// }
//
// interface IToggle {
//     id: number
//     toggle: boolean
// }
//
// interface IIcon {
//     id: number
//     icon: string
// }
//
// const ItemList: React.FC<IProps> = (props) => {
//     const {
//         level,
//         url,
//         onItemSelected,
//         onShowCard,
//         activeId,
//         queryRequest,
//         typesRequest,
//         statesRequest,
//         versionRequest
//     } = props
//
//     const [items, setItems] = useState<IItem[]>([])
//     const [loading, setLoading] = useState(true)
//     const [toggleArr, setToggleArr] = useState<IToggle[]>([])
//     const [iconTypeArr, setIconTypeArr] = useState<IIcon[]>([])
//     const [iconStateArr, setIconStateArr] = useState<IIcon[]>([])
//
//     useEffect(() => {
//         onRequest()
//     }, [queryRequest, typesRequest, statesRequest, versionRequest])
//
//     const fetchData = (promises: Promise<void>[]) => {
//         setLoading(true)
//         if (queryRequest.trim().length > 1 || versionRequest.trim().length > 0 || typesRequest.length > 0 || statesRequest.length > 0) {
//             const data: ISearch = {
//                 attrCondition: [],
//                 product: `%${queryRequest}%`,
//                 states: statesRequest,
//                 types: typesRequest,
//                 version: `${versionRequest}%`
//             }
//
//             if (data.product.length > 3 || data.version.trim().length > 0) {
//                 fetch(`${search}`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(data)
//                 })
//                     .then(response => response.json())
//                     .then(data => {
//                         setItems(data)
//                         for (const iItem of data) {
//                             setToggled(iItem)
//                             promises.push(fetchTypeIcon(iItem.idType).then(data => {
//                                 setIconTypeArr(prevState => [...prevState, {
//                                     id: iItem.id,
//                                     icon: data
//                                 }])
//                             }))
//                             promises.push(fetchStateIcon(iItem.idState).then(data => {
//                                 setIconStateArr(prevState => [...prevState, {
//                                     id: iItem.id,
//                                     icon: data
//                                 }])
//                             }))
//                         }
//                         Promise.all(promises)
//                             .then(() => {
//                                 setLoading(false)
//                             })
//                     })
//                     .catch(error => console.log(error))
//             }
//         }
//     }
//
//     const onRequest = () => {
//         setLoading(true)
//
//         const promises = [] as Promise<void>[]
//
//         if (queryRequest.trim().length > 1 || statesRequest.length > 0 || typesRequest.length > 0 || versionRequest.length > 0) {
//             fetchData(promises)
//         } else {
//             if (queryRequest.trim().length !== 1) {
//                 fetchItems<IItem[]>(url)
//                     .then(response => {
//                         setItems(response)
//                         for (const iItem of response) {
//                             setToggled(iItem)
//                             promises.push(fetchTypeIcon(iItem.idType).then(data => {
//                                 setIconTypeArr(prevState => [...prevState, {
//                                     id: iItem.id,
//                                     icon: data
//                                 }])
//                             }))
//                             promises.push(fetchStateIcon(iItem.idState).then(data => {
//                                 setIconStateArr(prevState => [...prevState, {
//                                     id: iItem.id,
//                                     icon: data
//                                 }])
//                             }))
//                         }
//                         Promise.all(promises)
//                             .then(() => {
//                                 setLoading(false)
//                             })
//                     })
//                     .catch(error => console.log(error))
//             } else {
//                 setLoading(false)
//             }
//         }
//     }
//
//     const setToggled = (item: IItem) => {
//         if (item.childCount > 0) {
//             setToggleArr(prevState => [...prevState, {id: item.id, toggle: true}])
//         } else {
//             setToggleArr(prevState => [...prevState, {id: item.id, toggle: false}])
//         }
//     }
//
//     const render = () => {
//         const list = items.map(item => {
//             return <Item
//                 item={item}
//                 key={item.id}
//                 level={level}
//                 toggle={toggleArr.find((value) => value.id === item.id)?.toggle || false}
//                 iconType={iconTypeArr.find(value => value.id === item.id)?.icon || ""}
//                 iconState={iconStateArr.find(value => value.id === item.id)?.icon || ""}
//                 onItemSelected={onItemSelected}
//                 onShowCard={onShowCard}
//                 activeId={activeId}
//                 queryRequest={queryRequest}
//                 typesRequest={typesRequest}
//                 statesRequest={statesRequest}
//                 versionRequest={versionRequest}
//             />
//         })
//         return (
//             <ul className={"item-list"}>
//                 {list}
//             </ul>
//         )
//     }
//
//     const content = !loading ? render() : <Spinner/>
//
//     return (
//         <>
//             {
//                 content
//             }
//         </>
//     )
// }
//
// export {ItemList}