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
            <div
                className={"itemCard__properties"}
            >
                {
                    Object.entries(atributesObject).map(value => {
                        return <PropertyRow key={value[0]} first={value[0]} second={value[1]}/>
                    })
                }
            </div>
        </div>
    )
}