import React, {useEffect, useState} from "react"

import {useGetLoodsmanObjectsQuery, useLazyFindObjectQuery,} from "../../redux";
import {TreeItem} from "./TreeItem";

import "./tree.sass"
import {useAppSelector} from "../../hooks/hooks";
import {Mode} from "../../redux/modeSlice";
import {IItem} from "../../types/IItem";
import {Spinner} from "../spinner/Spinner";
import fetchTypeIcon from "../fetch/fetchTypeIcon";
import fetchStateIcon from "../fetch/fetchStateIcon";

export const Tree: React.FC = (IProps) => {

    const findObject = useAppSelector(state => state.findObject)
    const mode = useAppSelector(state => state.mode)

    const [content, setContent] = useState<JSX.Element[]>([])
    const [rendered, setRendered] = useState(false)

    const {data: treeItems = [], isSuccess: loadedTreeItems} = useGetLoodsmanObjectsQuery()

    const [getSearchItems, {data: searchItems = [], isSuccess: loadedSearchItems}] = useLazyFindObjectQuery()

    const items = (): IItem[] => {
        switch (mode.mode) {
            case Mode.Tree:
                return treeItems
            case Mode.Search:
                return searchItems
            default:
                return []
        }
    }

    const renderItems = () => {
        console.log("renderItems")
        setRendered(false)
        const promises = items().map(async item => {
            return <TreeItem
                key={item.id}
                id={item.id}
                title={item.product}
                type={item.type}
                typeSrc={await fetchTypeIcon(item.idType)}
                state={item.state}
                stateSrc={await fetchStateIcon(item.idState)}
            />
        })

        Promise.all(promises)
            .then(value => setContent(value))
            .then(() => setRendered(true))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        if (findObject.product.length > 3) {
            getSearchItems(findObject, true)
        }
    }, [findObject])

    useEffect(() => {
        if (findObject.product.length < 3)
            if (loadedTreeItems)
                renderItems()
    }, [loadedTreeItems])

    useEffect(() => {
        if (loadedSearchItems)
            renderItems()
    }, [searchItems, loadedSearchItems])


    return (
        <ul className={"col-3 tree"}>
            {rendered ? content : <Spinner/>}
        </ul>
    )
}