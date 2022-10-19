import {IItem} from "../../types/IItem";
import React, {useState} from "react";
import {query} from "../urls";

import {ItemList} from "../projectList/ItemList";
import arrowRight from "../../icons/arrow-right.png"
import arrowDown from "../../icons/down-arrow.png"

import "./item.sass"

interface IProps {
    item: IItem
    items?: IItem[]
    level: number
    toggle: boolean,
    icon: string,
    onItemSelected: (item: IItem) => void
}

const Item: React.FC<IProps> = (props) => {

    const {product, id} = props.item
    const {level, toggle, icon, onItemSelected} = props
    const [toggled, setToggled] = useState(false)

    const expand = () => {
        setToggled(prevState => !prevState)
    }

    const renderItems = () => {
        return <ItemList level={level} url={query + id} onItemSelected={onItemSelected}/>
    }

    const content = toggled ? renderItems() : null

    const showInfo = () => {
        onItemSelected(props.item)
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
                    <div className={"item__block"}>
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
                        <img
                            className={"item__icon"}
                            src={icon} alt="icon"/>
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