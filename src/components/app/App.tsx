import React, {useEffect, useState} from "react";
import {Tree} from "../tree/Tree";
import {ItemCard} from "../itemCard/ItemCard";
import {IItem} from "../../types/IItem";
import {Search} from "../search/Search";
import {IConfig, State, Type} from "../../types/IConfig";
import {configPath, query} from "../urls";
import {useGetConfigQuery} from "../../redux/configApi";

import config from "./../../data/config.json"

const App: React.FC = () => {

    const {data = {}} = useGetConfigQuery()

    // const [activeItem, setActiveItem] = useState<IItem>({
    //     atributesObject: {},
    //     atributesRelation: {},
    //     dateOfCreate: "",
    //     id: 0,
    //     idLinkType: undefined,
    //     idParent: undefined,
    //     idProduct: 0,
    //     idState: 0,
    //     idType: 0,
    //     inverseName: undefined,
    //     maxQuantity: undefined,
    //     minQuantity: undefined,
    //     product: "",
    //     relationName: undefined,
    //     state: "",
    //     type: "",
    //     version: undefined,
    //     childCount: 0
    // })

    // const [activeId, setActiveId] = useState(0)
    // const [showCard, setShowCard] = useState(false)
    // const [config, setConfig] = useState<IConfig>({
    //     attributes: [],
    //     states: [],
    //     types: []
    // })
    // const [url, setUrl] = useState("")
    // const [queryRequest, setQueryRequest] = useState("")
    // const [statesRequest, setStatesRequest] = useState<string[]>([])
    // const [typesRequest, setTypesRequest] = useState<string[]>([])
    // const [versionRequest, setVersionRequest] = useState("")
    // const [currentQueryItem, setCurrentQueryItem] = useState("")
    //
    // const onItemSelected = (item: IItem) => {
    //     setActiveItem(item)
    // }
    //
    // const onShowCard = (showCard: boolean) => {
    //     setShowCard(showCard)
    // }
    //
    // const fetchConfig = () => {
    //     fetch(configPath)
    //         .then(response => response.json())
    //         .then(data => setConfig(data))
    //         .catch(error => console.log(error))
    // }
    //
    // const isSystemAttr = (name: string): boolean => {
    //     const attr = config.attributes.find(it => it.name === name)
    //     if (attr) {
    //         return attr.system
    //     } else return false
    // }
    //
    // const onChangeRequest = (queryRequest: string) => {
    //     setQueryRequest(queryRequest)
    // }
    //
    // const onChangeTypes = (types: string[], currentQueryItem: string) => {
    //     setTypesRequest(types)
    //     setCurrentQueryItem(currentQueryItem)
    // }
    //
    // const onChangeStates = (states: string[], currentQueryItem: string) => {
    //     setStatesRequest(states)
    //     setCurrentQueryItem(currentQueryItem)
    // }
    //
    // const onChangeVersion = (version: string) => {
    //     setVersionRequest(version)
    // }
    //
    // const onCloseCard = () => {
    //     setShowCard(false)
    // }

    // useEffect(() => {
    //     setActiveId(activeItem.id)
    // }, [activeItem])

    // useEffect(() => {
    //     setUrl(query)
    //     fetchConfig()
    // }, [])

    // const sort = (items: State[] | Type[], arr: string[]) => {
    //     const checkedItems = items.filter(value => arr.includes(value.name))
    //         .sort((a, b) => {
    //             if (a.name < b.name) return -1
    //             if (a.name > b.name) return 1
    //             return 0
    //         })
    //     const unCheckedItems = items.filter(state => !arr.includes(state.name))
    //         .sort((a, b) => {
    //             if (a.name < b.name) return -1
    //             if (a.name > b.name) return 1
    //             return 0
    //         })
    //     return (checkedItems.concat(unCheckedItems).map(item =>
    //         ({id: item.id, name: item.name})
    //     )).filter(it => it.name.toLowerCase().includes(currentQueryItem.toLowerCase()))
    // }

    return (
        <div className={"grid-nogutter"}>

            {/*<Search*/}
            {/*    states={sort(config.states, statesRequest)}*/}
            {/*    types={sort(config.types, typesRequest)}*/}
            {/*    onChangeRequest={onChangeRequest}*/}
            {/*    onChangeTypesProps={onChangeTypes}*/}
            {/*    onChangeStatesProps={onChangeStates}*/}
            {/*    onChangeVersionProps={onChangeVersion}*/}
            {/*    typesRequest={typesRequest}*/}
            {/*    statesRequest={statesRequest}*/}
            {/*/>*/}

            <Tree/>
            {/*{showCard ? <ItemCard item={activeItem} isSystemAttr={isSystemAttr} onClose={onCloseCard}/> : null}*/}
        </div>
    )
}

export {App}