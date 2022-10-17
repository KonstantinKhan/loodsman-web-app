import React, {useEffect} from "react";

import {ItemList} from "../projectList/ItemList";

import "./tree.sass"

const url = "http://78.29.34.68:8888/object/"

const Tree: React.FC = () => {

    useEffect(() => {

    }, [])

    return (
        <div
            className={"tree"}
        >
            <ItemList level={1} url={url}/>
        </div>
    )
}

export {Tree}