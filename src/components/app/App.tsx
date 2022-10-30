import React, {useEffect, useState} from "react";
import {Tree} from "../Tree/Tree";
import {ItemCard} from "../itemCard/ItemCard";
import {IItem} from "../../types/IItem";
import {Search} from "../search/Search";
import {IConfig} from "../../types/IConfig";
import {configPath, query} from "../urls";

interface IToggle {
    id: number,
    toggle: boolean,
}

const App: React.FC = () => {

    const [activeItem, setActiveItem] = useState<IItem>({
        atributesObject: {},
        atributesRelation: {},
        dateOfCreate: "",
        id: 0,
        idLinkType: undefined,
        idParent: undefined,
        idProduct: 0,
        idState: 0,
        idType: 0,
        inverseName: undefined,
        maxQuantity: undefined,
        minQuantity: undefined,
        product: "",
        relationName: undefined,
        state: "",
        type: "",
        version: undefined,
        childCount: 0
    })

    const [activeId, setActiveId] = useState(0)
    const [showCard, setShowCard] = useState(false)
    const [config, setConfig] = useState<IConfig>({
        attributes: [],
        states: [],
        types: []
    })
    const [fetchItems, setFetchItems] = useState<IItem[]>([])
    const [toggleArr, setToggleArr] = useState<IToggle[]>([])
    const [url, setUrl] = useState("")
    const [queryRequest, setQueryRequest] = useState("")
    const [statesRequest, setStatesRequest] = useState<string[]>([])
    const [typesRequest, setTypesRequest] = useState<string[]>([])

    const onItemSelected = (item: IItem) => {
        setActiveItem(item)
    }

    const onShowCard = (showCard: boolean) => {
        setShowCard(showCard)
    }

    const fetchConfig = () => {
        fetch(configPath)
            .then(response => response.json())
            .then(data => setConfig(data))
            .catch(error => console.log(error))
    }

    const isSystemAttr = (name: string): boolean => {
        const attr = config.attributes.find(it => it.name === name)
        return !!attr;
    }

    const setToggled = (item: IItem) => {
        return fetch(`${query}${item.id}`)
            .then(res => res.json())
            .then(data => {
                const dataItems = data as IItem[]
                if (dataItems.length > 0) {
                    setToggleArr(prevState => [...prevState, {id: item.id, toggle: true}])
                } else {
                    setToggleArr((prevState => [...prevState, {id: item.id, toggle: false}]))
                }
            })
    }

    const onChangeRequest = (queryRequest: string) => {
        setQueryRequest(queryRequest)
    }

    const onChangeTypes = (types: string[]) => {
        setTypesRequest(types)
    }

    const onChangeStates = (states: string[]) => {
        setStatesRequest(states)
    }

    useEffect(() => {
        setActiveId(activeItem.id)
    }, [activeItem])

    useEffect(() => {
        setUrl(query)
        fetchConfig()
    }, [])

    const onFetch = (items: IItem[]) => {
        items.forEach(item => {
            setToggled(item)
        })
        setFetchItems(items)
    }

    return (
        <div>
            <Search
                states={config.states.sort((a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                })}
                types={config.types.sort((a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                })}
                onFetch={onFetch}
                onChangeRequest={onChangeRequest}
                onChangeTypesProps={onChangeTypes}
                onChangeStatesProps={onChangeStates}
                typesRequest={typesRequest}
                statesRequest={statesRequest}
            />

            <Tree
                onItemSelected={onItemSelected}
                onShowCard={onShowCard}
                activeId={activeId}
                url={url}
                queryRequest={queryRequest}
                typesRequest={typesRequest}
                statesRequest={statesRequest}
            />
            {showCard ? <ItemCard item={activeItem} isSystemAttr={isSystemAttr}/> : null}
        </div>
    )
}

export {App}