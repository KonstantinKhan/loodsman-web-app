import {IItem} from "../../types/IItem";
import React, {useEffect, useState} from "react";
import {Item} from "../project/Item";
import {fetchItems} from "../fetch/fetchItems";

interface IProps {
    level: number,
    url: string
}

interface IToggle {
    id: number,
    toggle: boolean
}

const ItemList: React.FC<IProps> = (props) => {

    const {level, url} = props

    let toggleArr: IToggle[] = []

    const [items, setItems] = useState<IItem[]>([])
    const [loading, setLoading] = useState(true)
    const [cont, setCont] = useState<JSX.Element[]>([])

    useEffect(() => {
        onRequest()
    }, [])

    const prepare = () => {
        items.forEach(item => {
            fetchItems<IItem[]>(url + item.id)
                .then(response => {
                    const res: IToggle = {id: item.id, toggle: !!response.length}
                    toggleArr.push(res)
                })
        })
    }

    const onRequest = () => {
        onLoading()
        fetchItems<IItem[]>(url)
            .then(response => {
                setItems(response)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    const onLoading = () => {
        setLoading(true)
    }

    const render = () => {

        prepare()
        console.log("toggleArr", toggleArr)

        return items.map(item => {
            return <Item
                project={item}
                key={item.id}
                level={level}
                toggle={true}
            />
        })
    }

    return (
        <>
            {
                render()
            }
        </>
    )
}

export {ItemList}