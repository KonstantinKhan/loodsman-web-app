import React from "react"

import {useGetLoodsmanObjectsQuery} from "../../redux";
import {TreeItem} from "./TreeItem";

import "./tree.sass"

export const Tree: React.FC = (IProps) => {

    const {data = []} = useGetLoodsmanObjectsQuery()

    return (
        <ul className={"col-3 tree"}>
            {
                data.map(item => {
                    return <TreeItem
                        key={item.id}
                        id={item.id}
                        title={item.product}
                        idType={item.idType}
                        idState={item.idState}
                    />
                })
            }
        </ul>
    )
}