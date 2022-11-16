import React from "react";

import "./tree.sass"
import {useGetLoodsmanObjectsQuery} from "../../redux";
import {TreeItem} from "./TreeItem";

export const Tree: React.FC = (IProps) => {

    const {data = []} = useGetLoodsmanObjectsQuery()

    return (
        <ul className={"col-3 col-offset-1 tree"}>
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