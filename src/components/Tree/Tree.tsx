import React from "react";

import {ItemList} from "../itemList/ItemList";

import "./tree.sass"
import {query} from "../urls";
import {IItem} from "../../types/IItem";

interface IProps {
    onItemSelected: (item: IItem) => void
    onShowCard: (showCard: boolean) => void
    activeId: number
}

const Tree: React.FC<IProps> = (props: IProps) => {

    const {onItemSelected, onShowCard, activeId} = props

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
            />
        </div>
    )
}

export {Tree}