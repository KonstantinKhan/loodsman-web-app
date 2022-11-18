import React, {FC} from "react";
import {Input} from "../input/Input";

import "./search.sass"

export const SearchPanel: React.FC = () => {
    return (
        <div className="col-2 search-panel__container">
            <div className={"search-panel__block"}>
                <i className={"pi pi-search search-panel__icon"}></i>
                <Input placeholder={"Поиск..."}/>
            </div>
            <div className={"search-panel__block"}>
                <i className={"pi pi-tags search-panel__icon"}></i>
                <Input placeholder={"Тип..."}/>
            </div>
            <div className={"search-panel__block"}>
                <i className={"pi pi-pencil search-panel__icon"}></i>
                <Input placeholder={"Состояние..."}/>
            </div>
            <div className={"search-panel__block"}>
                <i className={"pi pi-copy search-panel__icon"}></i>
                <Input placeholder={"Версия..."}/>
            </div>
        </div>
    )
}