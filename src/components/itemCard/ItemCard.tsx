import {IItem} from "../../types/IItem";

import "./itemCard.sass"
import {PropertyRow} from "../PropertyRow/PropertyRow";

interface IProps {
    item: IItem
}

export const ItemCard = (props: IProps) => {

    const {product, atributesObject} = props.item

    return (
        <div
            className={"itemCard"}
        >
            <span
                className={"itemCard__title"}
            >
                {product}
            </span>
            <ul
                className={"itemCard__properties"}
            >
                {
                    Object.entries(atributesObject).map(value => {
                        console.log(value)
                        return <PropertyRow first={value[0]} second={value[1]}/>
                    })
                }
            </ul>
        </div>
    )
}