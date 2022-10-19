import {IItem} from "../../types/IItem";

import "./itemCard.sass"

interface IProps {
    item: IItem
}

export const ItemCard = (props: IProps) => {

    const {product, atributesObject} = props.item

    return (
        <div
            className={"itemCard"}
        >
            <ul>
                <li>{product}</li>
                {
                    Object.entries(atributesObject).map((value, index) => <li key={index}>{value[0]} : {value[1]}</li>)
                }
            </ul>
        </div>
    )
}