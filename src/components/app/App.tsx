import React from "react";
import {Tree} from "../tree/Tree";
import {useGetConfigQuery} from "../../redux/configApi";
import {Spinner} from "../spinner/Spinner";
import {SearchPanel} from "../search/SearchPanel";

import "./app.sass"

export const App: React.FC = () => {
    const {isSuccess} = useGetConfigQuery()

    const content = isSuccess ? <Tree/> : <Spinner/>
    return (
        <div className={"flex container"}>
            <SearchPanel/>
            {content}
        </div>
    )
}