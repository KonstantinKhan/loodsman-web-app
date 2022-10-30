import {ItemList} from "../itemList/ItemList";
import {query} from "../urls";
import {IItem} from "../../types/IItem";
import React from "react";

import "./tree.sass"

interface IProps {
    onItemSelected: (item: IItem) => void
    onShowCard: (showCard: boolean) => void
    activeId: number
    url: string
    queryRequest: string
    typesRequest: string[]
    statesRequest: string[]
}

const Tree: React.FC<IProps> = (props: IProps) => {

    const {onItemSelected, onShowCard, activeId, queryRequest, typesRequest, statesRequest} = props

    return (
        <div
            className={"tree"}
        >
            <ItemList
                level={1}
                url={query}
                onItemSelected={onItemSelected}
                onShowCard={onShowCard}
                activeId={activeId}
                queryRequest={queryRequest}
                typesRequest={typesRequest}
                statesRequest={statesRequest}
            />
        </div>
    )
}

export {Tree}