import React, {useEffect, useState} from "react";
import {Tree} from "../Tree/Tree";
import {ItemCard} from "../itemCard/ItemCard";
import {IItem} from "../../types/IItem";
import {Search} from "../search/Search";

const App: React.FC = () => {

    const [activeItem, setActiveItem] = useState<IItem>({
        atributesObject: {},
        atributesRelation: {},
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

    const [activeId, setActiveId] = useState(0)
    const [showCard, setShowCard] = useState(false)

    const onItemSelected = (item: IItem) => {
        setActiveItem(item)
    }

    const onShowCard = (showCard: boolean) => {
        setShowCard(showCard)
    }

    useEffect(() => {
        setActiveId(activeItem.id)
    }, [activeItem])

    return (
        <div>
            <Search/>
            <Tree
                onItemSelected={onItemSelected}
                onShowCard={onShowCard}
                activeId={activeId}
            />
            {showCard ? <ItemCard item={activeItem}/> : null}
        </div>
    )
}

export {App}