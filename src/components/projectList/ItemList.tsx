import {IItem} from "../../types/IItem";
import React, {useEffect, useState} from "react";
import {Item} from "../item/Item";
import {fetchItems} from "../fetch/fetchItems";
import {query} from "../urls";
import {queryIcons} from "../urls";

interface IProps {
    level: number,
    url: string,
    onItemSelected: (item: IItem) => void,
    activeId: number
}

interface IToggle {
    id: number,
    toggle: boolean,
}

interface IIcon {
    id: number,
    icon: string
}

const ItemList: React.FC<IProps> = (props) => {

    const {level, url, onItemSelected, activeId} = props

    const [items, setItems] = useState<IItem[]>([])
    const [loading, setLoading] = useState(true)
    const [toggleArr, setToggleArr] = useState<IToggle[]>([])
    const [iconArr, setIconArr] = useState<IIcon[]>([])

    useEffect(() => {
        onRequest()
    }, [])


    const onRequest = () => {
        const promises = [] as Promise<void>[]

        fetchItems<IItem[]>(url)
            .then(response => {
                setItems(response)
                for (const iItem of response) {
                    promises.push(setToggled(iItem))
                    promises.push(setIcons(iItem))
                }
                Promise.all(promises)
                    .then(() => {
                        setLoading(false)
                    })
            })
            .catch(error => console.log(error))
    }

    const setToggled = (item: IItem) => {
        return fetch(`${query}${item.id}`)
            .then(res => res.json())
            .then(data => {
                const dataItems = data as IItem[]
                if (dataItems.length > 0) {
                    setToggleArr(prevState => [...prevState, {id: item.id, toggle: true}])
                } else {
                    setToggleArr((prevState => [...prevState, {id: item.id, toggle: false}]))
                }
            })
    }

    const setIcons = (item: IItem) => {
        return fetch(`${queryIcons}${item.idType}/icon`, {
            headers: []
        })
            .then(res => res.blob())
            .then(blob => {
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = () => setIconArr(prevState => [...prevState, {
                    id: item.id,
                    icon: reader.result as string
                }])
            })
    }

    const render = () => {
        const list = items.map(item => {
            return <Item
                item={item}
                key={item.id}
                level={level}
                toggle={toggleArr.find((value) => value.id === item.id)?.toggle || false}
                icon={iconArr.find(value => value.id === item.id)?.icon || ""}
                onItemSelected={onItemSelected}
                activeId={activeId}
            />
        })
        return (
            <ul className={"item-list"}>
                {list}
            </ul>
        )
    }

    const content = !loading ? render() : null

    return (
        <>
            {
                content
            }
        </>
    )
}

export {ItemList}