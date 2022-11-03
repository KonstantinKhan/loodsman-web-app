import "./search.sass"
import React, {useState} from "react";

import {DropDown, IDropItem} from "../dropDown/DropDown";

interface IProps {
    states: IDropItem[]
    types: IDropItem[]
    onChangeRequest: (queryRequest: string) => void
    onChangeTypesProps: (types: string[], currentQueryItem: string) => void
    onChangeStatesProps: (states: string[], currentQueryItem: string) => void
    onChangeVersionProps: (version: string) => void
    typesRequest: string[]
    statesRequest: string[]
}

export const Search: React.FC<IProps> = (props: IProps) => {

    const {
        onChangeRequest,
        onChangeTypesProps,
        onChangeStatesProps,
        onChangeVersionProps,
        typesRequest,
        statesRequest
    } = props

    const [clearQuery, setClearQuery] = useState(false)
    const [clearVersion, setClearVersion] = useState(false)
    const [version, setVersion] = useState("")
    const [query, setQuery] = useState("")
    const [clear, setClear] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.currentTarget.value.trim()
        onChangeRequest(q)
        setClearQuery(q.length > 0)
        setQuery(q)
    }

    const onChangeTypes = (items: string[], currentQueryItem: string) => {
        onChangeTypesProps(items, currentQueryItem)
    }

    const onChangeStates = (items: string[], currentQueryItem: string) => {
        onChangeStatesProps(items, currentQueryItem)
    }

    const onChangeVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ver = e.currentTarget.value.trim()
        onChangeVersionProps(ver)
        setClearVersion(ver.length > 0)
        setVersion(ver)
    }

    return (
        <div
            className={"searchContainer"}
        >
            <div className={"clearAll"}
                 onClick={() => {
                     onChangeRequest("")
                     setQuery("")
                     setClearQuery(false)
                     onChangeVersionProps("")
                     setVersion("")
                     setClearVersion(false)
                     onChangeStatesProps([], "")
                     onChangeTypesProps([], "")
                     setClear(true)
                 }}
            >
                <span
                    className={"clearAll__action"}
                >Очистить фильтры</span>
            </div>

            <div
                className="searchContainer__block"
            >
                <div className={"dropDown__search"}>
                    <input
                        className={"input"}
                        onChange={onChange}
                        placeholder={"Поиск..."}
                        value={query}
                    />
                    {
                        clearQuery ?
                            <div className={"clearFilter"}
                                 onClick={() => {
                                     onChangeRequest("")
                                     setQuery("")
                                     setClearQuery(false)
                                 }}
                            >
                                <span className={"clearFilter__action"}>x</span>
                            </div> : null
                    }

                </div>

            </div>
            <div
                className="searchContainer__block"
            >
                <DropDown
                    type={"states"}
                    getItems={onChangeStates}
                    items={props.states}
                    typesRequest={typesRequest}
                    statesRequest={statesRequest}
                    placeholder={"Состояние..."}
                    clearProps={clear}
                    setClear={setClear}
                />
            </div>
            <div
                className="searchContainer__block"
            >
                <DropDown
                    type={"types"}
                    getItems={onChangeTypes}
                    items={props.types}
                    typesRequest={typesRequest}
                    statesRequest={statesRequest}
                    placeholder={"Тип..."}
                    clearProps={clear}
                    setClear={setClear}
                />
            </div>
            <div className="searchContainer__block">
                <div className={"dropDown__search"}>
                    <input
                        className={"input"}
                        onChange={onChangeVersion}
                        placeholder={"Версия..."}
                        value={version}
                    />
                    {
                        clearVersion ?
                            <div className={"clearFilter"}
                                 onClick={() => {
                                     onChangeVersionProps("")
                                     setVersion("")
                                     setClearVersion(false)
                                 }}
                            >
                                <span className={"clearFilter__action"}>x</span>
                            </div> : null
                    }
                </div>
            </div>
        </div>
    )
}