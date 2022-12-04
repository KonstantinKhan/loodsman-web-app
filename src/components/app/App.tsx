import React from "react";
import {SearchPanel} from "../search/SearchPanel";

import "./app.sass"
import {Tree} from "../tree/Tree";

export const App: React.FC = () => {
    return (
        <div className={"flex container"}>
            <SearchPanel/>
            <Tree/>
        </div>
    )
}