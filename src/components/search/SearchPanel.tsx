import React from "react";
import {InputSearch} from "../input/InputSearch";

import "./search.sass"
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {queryProduct} from "../../redux/findObjectSlice";
import {Mode, toggleMode} from "../../redux/modeSlice";

export const SearchPanel: React.FC = () => {

    const dispatch = useAppDispatch()
    const mode = useAppSelector(state => state.mode)
    const findObject = useAppSelector(state => state.findObject)

    const fetchProduct = (query: string) => {
        dispatch(queryProduct(`%${query}%`))
        if (query.length > 1 && mode.mode === Mode.Tree)
            dispatch(toggleMode(Mode.Search))
    }


    return (
        <div className="col-2 search-panel__container">
            <div className={"search-panel__block"}>
                <i className={"pi pi-search search-panel__icon_left"}></i>
                <InputSearch
                    placeholder={"Поиск..."}
                    onQuery={fetchProduct}
                />
                {findObject.product.length > 2 ? <i className={"pi pi-times search-panel__icon_right"}/> : null}

            </div>
            <div className={"search-panel__block"}>
                <i className={"pi pi-tags search-panel__icon_left"}></i>
                <InputSearch
                    placeholder={"Тип..."}
                    onQuery={() => {
                    }}
                />
                <i className={"pi pi-times search-panel__icon_right"}/>
            </div>
            <div className={"search-panel__block"}>
                <i className={"pi pi-pencil search-panel__icon_left"}></i>
                <InputSearch
                    placeholder={"Состояние..."}
                    onQuery={() => {
                    }}
                />
                <i className={"pi pi-times search-panel__icon_right"}/>
            </div>
            <div className={"search-panel__block"}>
                <i className={"pi pi-copy search-panel__icon_left"}></i>
                <InputSearch
                    placeholder={"Версия..."}
                    onQuery={() => {
                    }}
                />
                <i className={"pi pi-times search-panel__icon_right"}/>
            </div>
        </div>
    )
}