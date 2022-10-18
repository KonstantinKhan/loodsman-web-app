import {IItem} from "../../types/IItem";
import React, {useEffect, useState} from "react";
import {Item} from "../item/Item";
import {fetchItems} from "../fetch/fetchItems";
import {query} from "../urls";

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

    const [items, setItems] = useState<IItem[]>([])
    const [toggleArr, setToggleArr] = useState<IToggle[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onRequest()
    }, [])


    const onRequest = () => {
        const promises = [] as Promise<void>[]

        fetchItems<IItem[]>(url)
            .then(response => {
                setItems(response)
                for (const iItem of response) {
                    promises.push(something(iItem))
                }
                Promise.all(promises)
                    .then(() => {
                        setLoading(false)
                    })
            })
            .catch(error => console.log(error))
    }

    const something = (item: IItem) => {


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

    const render = () => {

        const list = items.map(item => {
            return <Item
                project={item}
                key={item.id}
                level={level}
                toggle={toggleArr.find((value) => value.id === item.id)?.toggle || false}
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