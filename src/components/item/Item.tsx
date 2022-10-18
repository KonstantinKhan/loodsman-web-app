import {IItem} from "../../types/IItem";
import React, {useState} from "react";
import {query} from "../urls";

import {ItemList} from "../projectList/ItemList";
import arrowRight from "../../icons/arrow-right.png"
import arrowDown from "../../icons/down-arrow.png"

import "./item.sass"

interface IProps {
    project: IItem
    items?: IItem[]
    level: number
    toggle: boolean
}

const Item: React.FC<IProps> = (props) => {

    const {product, id} = props.project
    const {level, toggle} = props
    const [toggled, setToggled] = useState(false)

    const expand = () => {
        setToggled(prevState => !prevState)
    }

    const renderItems = () => {
        return <ItemList level={level} url={query + id}/>
    }

    const content = toggled ? renderItems() : null

    const render = () => {
        return (
            <>
                <li
                    className={"item"}
                    style={{
                        left: `${level + 1}rem`
                    }}
                >
                         <span
                             className={"item__title"}
                             style={{
                                 left: `${level + 2}rem`
                             }}
                         >
                    {product}
                </span>
                    {
                        toggle ?
                            <div
                                className={"item__toggle"}
                                style={{
                                    left: `${level}rem`
                                }}
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