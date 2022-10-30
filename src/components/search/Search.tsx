import "./search.sass"
import React from "react";

import {DropDown, IDropItem} from "../dropDown/DropDown";
import {IItem} from "../../types/IItem";

interface IProps {
    states: IDropItem[]
    types: IDropItem[]
    onFetch: (items: IItem[]) => void
    onChangeRequest: (queryRequest: string) => void
    onChangeTypesProps: (types: string[]) => void
    onChangeStatesProps: (states: string[]) => void
    typesRequest: string[]
    statesRequest: string[]
}

export const Search: React.FC<IProps> = (props: IProps) => {

    const {onChangeRequest, onChangeTypesProps, onChangeStatesProps, typesRequest, statesRequest} = props

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeRequest(e.currentTarget.value)
    }

    const onChangeTypes = (items: string[]) => {
        onChangeTypesProps(items)
    }

    const onChangeStates = (items: string[]) => {
        onChangeStatesProps(items)
    }

    const onChangeVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setVersion(e.currentTarget.value)
    }

    return (
        <div
            className={"searchContainer"}
        >
            <div
                className="searchContainer__block"
            >
                <input
                    className={"input"}
                    onChange={onChange}
                />
            </div>
            <div
                className="searchContainer__block"
            >
                <DropDown
                    getItems={onChangeStates}
                    items={props.states}
                    typesRequest={typesRequest}
                    statesRequest={statesRequest}
                />
            </div>
            <div
                className="searchContainer__block"
            >
                <DropDown
                    getItems={onChangeTypes}
                    items={props.types}
                    typesRequest={typesRequest}
                    statesRequest={statesRequest}
                />
            </div>
            <div
                className="searchContainer__block"
            >
                <input
                    className={"input"}
                    onChange={onChangeVersion}
                />
            </div>
        </div>
    )
}