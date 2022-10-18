import React, {useEffect} from "react";

import {ItemList} from "../projectList/ItemList";

import "./tree.sass"
import {query} from "../urls";

const Tree: React.FC = () => {

    useEffect(() => {

    }, [])

    return (
        <div
            className={"tree"}
        >
            <ItemList level={1} url={query}/>
        </div>
    )
}

export {Tree}