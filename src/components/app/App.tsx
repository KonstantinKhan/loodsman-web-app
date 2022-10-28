import React, {useEffect, useState} from "react";
import {Tree} from "../Tree/Tree";
import {ItemCard} from "../itemCard/ItemCard";
import {IItem} from "../../types/IItem";
import {Search} from "../search/Search";
import {IConfig} from "../../types/IConfig";
import {configPath} from "../urls";

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
    const [config, setConfig] = useState<IConfig>({
        attributes: [],
        states: [],
        types: []
    })

    const onItemSelected = (item: IItem) => {
        setActiveItem(item)
    }

    const onShowCard = (showCard: boolean) => {
        setShowCard(showCard)
    }

    const fetchConfig = () => {
        fetch(configPath)
            .then(response => response.json())
            .then(data => setConfig(data))
            .catch(error => console.log(error))
    }

    const isSystemAttr = (name: string): boolean => {
        const attr = config.attributes.find(it => it.name === name)
        return !!attr;
    }

    useEffect(() => {
        setActiveId(activeItem.id)
    }, [activeItem])

    useEffect(() => {
        fetchConfig()
    }, [])

    return (
        <div>
            <Search/>
            <Tree
                onItemSelected={onItemSelected}
                onShowCard={onShowCard}
                activeId={activeId}

            />
            {showCard ? <ItemCard item={activeItem} isSystemAttr={isSystemAttr}/> : null}
        </div>
    )
}

export {App}