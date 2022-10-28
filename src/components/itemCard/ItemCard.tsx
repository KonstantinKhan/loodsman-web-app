import {IItem} from "../../types/IItem";

import "./itemCard.sass"
import {PropertyRow} from "../PropertyRow/PropertyRow";
import {useEffect, useState} from "react";

interface IProps {
    item: IItem
}

interface IData {
    id: string,
    firstValue: string,
    secondValue: string
}

export const ItemCard = (props: IProps) => {

    const {product, atributesObject, atributesRelation, id} = props.item
    const [data, setData] = useState<IData[]>([])

    const sendData = (e: any) => {
        console.log("sendData")
        if (window)
            window.opener.postMessage({
                id: id
            }, "*")
    }

    useEffect(() => {
        setData([])
        Object.entries(atributesObject)
            .forEach(value => setData(prevState => [...prevState, {
                id: "obj " + value[0],
                firstValue: value[0],
                secondValue: value[1]
            }]))
        Object.entries(atributesRelation)
            .forEach(value => setData(prevState => [...prevState, {
                id: "rel " + value[0],
                firstValue: value[0],
                secondValue: value[1]
            }]))
    }, [atributesObject, atributesRelation])

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
                    data.map(value => {
                        return <PropertyRow
                            key={value.id}
                            first={value.firstValue}
                            second={value.secondValue}/>
                    })
                }
            </div>
            <button
                className={"itemCard__button"}
                onClick={sendData}
            >
                Получить id
            </button>
        </div>
    )
}