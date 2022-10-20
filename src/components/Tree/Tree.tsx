import React from "react";

import {ItemList} from "../projectList/ItemList";

import "./tree.sass"
import {query} from "../urls";
import {IItem} from "../../types/IItem";

interface IProps {
    onItemSelected: (item: IItem) => void
    activeId: number
}

const Tree: React.FC<IProps> = (props: IProps) => {

    const {onItemSelected, activeId} = props

    return (
        <div
            className={"tree"}
        >
            <ItemList level={1} url={query} onItemSelected={onItemSelected} activeId={activeId}/>
        </div>
    )
}

export {Tree}