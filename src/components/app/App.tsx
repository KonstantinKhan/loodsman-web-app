import React, {useState} from "react";
import {Tree} from "../tree/Tree";
import {ItemCard} from "../itemCard/ItemCard";
import {IItem} from "../../types/IItem";

const App: React.FC = () => {

    const [activeItem, setActiveItem] = useState<IItem>({
        atributesObject: {},
        atributesRelation: undefined,
        dateOfCreate: "",
        id: 0,
        idLinkType: undefined,
        idParent: undefined,
        idProduct: 0,
        idState: 0,
        idType: 0,
        inverseName: undefined,
        maxQuantity: undefined,
        minQuantity: undefined,
        product: "",
        relationName: undefined,
        state: "",
        type: "",
        version: undefined
    })

    const onItemSelected = (item: IItem) => {
        setActiveItem(item)
    }

    return (
        <div>
            <Tree onItemSelected={onItemSelected}/>
            <ItemCard item={activeItem}/>
        </div>
    )
}

export {App}