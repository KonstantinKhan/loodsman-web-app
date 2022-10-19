import React, {useEffect, useState} from "react";

import {ItemList} from "../projectList/ItemList";

import "./tree.sass"
import {query} from "../urls";
import {IItem} from "../../types/IItem";

interface IProps {
    onItemSelected: (item: IItem) => void
}

const Tree: React.FC<IProps> = (props: IProps) => {

    const {onItemSelected} = props

    useEffect(() => {

    }, [])


    return (
        <div
            className={"tree"}
        >
            <ItemList level={1} url={query} onItemSelected={onItemSelected}/>
        </div>
    )
}

export {Tree}