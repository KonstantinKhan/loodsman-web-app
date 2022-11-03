import {IItem} from "../../types/IItem";
import React, {useEffect, useState} from "react";
import {query} from "../urls";

import {ItemList} from "../itemList/ItemList";
import arrowRight from "../../icons/arrow-right.png"
import arrowDown from "../../icons/down-arrow.png"

import "./item.sass"

interface IProps {
    item: IItem
    items?: IItem[]
    level: number
    toggle: boolean,
    iconType: string,
    iconState: string,
    onItemSelected: (item: IItem) => void
    onShowCard: (showCard: boolean) => void
    activeId: number
    queryRequest: string
    typesRequest: string[]
    statesRequest: string[]
    versionRequest: string
}

const Item: React.FC<IProps> = (props) => {

    const {activeId, queryRequest, typesRequest, statesRequest, versionRequest} = props
    const {product, id, type, state} = props.item
    const {level, toggle, iconType, iconState, onItemSelected, onShowCard} = props
    const [toggled, setToggled] = useState(false)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (id === activeId) {
            setActive(prevState => !prevState)
        } else {
            setActive(false)
        }
    }, [onItemSelected])

    const expand = () => {
        setToggled(prevState => !prevState)
    }

    const renderItems = () => {
        return <ItemList
            level={level}
            url={query + id}
            onItemSelected={onItemSelected}
            onShowCard={onShowCard}
            activeId={activeId}
            queryRequest={queryRequest}
            typesRequest={typesRequest}
            statesRequest={statesRequest}
            versionRequest={versionRequest}
        />
    }

    const content = toggled ? renderItems() : null

    const showInfo = () => {
        onItemSelected(props.item)
        if (Object.entries(props.item.atributesObject).length > 0) {
            onShowCard(true)
        } else {
            onShowCard(false)
        }
    }

    const render = () => {
        return (
            <>
                <li
                    className={"item"}
                    style={{
                        left: `${level + 1}rem`
                    }}
                    key={id}
                >
                    <div className={!active ? "item__block" : "item__block item__block_active"}>
                        {
                            toggle ?
                                <div
                                    className={"item__toggle"}
                                    onClick={expand}
                                >
                                    {!toggled ?
                                        <img
                                            className={"item__toggle__status"}
                                            src={arrowRight}
                                            alt={"toggle_right"}
                                        /> : null}

                                    {toggled ?
                                        <img
                                            className={"item__toggle__status"}
                                            src={arrowDown}
                                            alt={"toggle_down"}
                                        /> : null}
                                </div> : null
                        }
                        <div className={"item__icon-type__box"} data-title={type}>
                            <img
                                className={"item__icon-type"}
                                src={iconType} alt="iconType"
                            />
                        </div>
                        <div className={"item__icon-state__box"} data-title={state}>
                            <img
                                className={"item__icon-state"}
                                src={iconState} alt="iconState"/>
                        </div>
                        <span
                            className={"item__title"}
                            onClick={showInfo}
                        >
                             {product}
                         </span>
                    </div>
                    {content}
                </li>
            </>
        )
    }
    return (
        <>
            {render()}
        </>
    )
}

export {Item}