import {IItem} from "../../types/IItem";
import React, {useEffect, useState} from "react";
import {Item} from "../project/Item";
import {fetchItems} from "../fetch/fetchItems";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
                console.log(promises.length)
                Promise.all(promises)
                    .then(() => {
                        setLoading(false)
                        console.log("promise all")
                    })
            })
            .catch(error => console.log(error))
    }

    const something = (item: IItem) => {
        return fetch(`${url}${item.id}`)
            .then(res => res.json())
            .then(data => {
                console.log("then with data", loading)
                const dataItems = data as IItem[]
                if (dataItems.length > 0) {
                    setToggleArr(prevState => [...prevState, {id: item.id, toggle: true}])
                } else {
                    setToggleArr((prevState => [...prevState, {id: item.id, toggle: false}]))
                }
            })
    }

    const onLoading = () => {
        setLoading(true)
    }

    const render = () => {
        console.log("render")
        return items.map(item => {
            return <Item
                project={item}
                key={item.id}
                level={level}
                toggle={toggleArr.find((value) => value.id === item.id)?.toggle || false}
            />
        })
    }

    console.log("check", loading)
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