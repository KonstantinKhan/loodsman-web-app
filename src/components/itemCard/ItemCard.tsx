import {IItem} from "../../types/IItem";

import "./itemCard.sass"
import {PropertyRow} from "../propertyRow/PropertyRow";
import React, {useEffect, useState} from "react";

interface IProps {
    item: IItem
    isSystemAttr: (name: string) => boolean
    onClose: () => void
}

interface IData {
    id: string,
    firstValue: string,
    secondValue: string
}

export const ItemCard = (props: IProps) => {

    const {product, atributesObject, atributesRelation, id, maxQuantity, minQuantity, version} = props.item
    const {isSystemAttr, onClose} = props
    const [data, setData] = useState<IData[]>([])

    const sendData = (e: any) => {
        if (window)
            window.opener.postMessage({
                id: id
            }, "*")
    }

    const quantity = () => {
        if (minQuantity !== null || maxQuantity !== null) {
            if (minQuantity === maxQuantity) {
                return maxQuantity.toString()
            } else {
                return `${minQuantity}..${maxQuantity}`
            }
        }
    }

    useEffect(() => {
        setData([])

        setData(prevState => [...prevState, {
            id: "_id",
            firstValue: "id",
            secondValue: id.toString()
        }])


        if (minQuantity !== null || maxQuantity !== null) {
            setData(prevState => [...prevState, {
                id: "quantity",
                firstValue: "Количество",
                secondValue: quantity()
            }])
        }

        if (atributesObject) {
            Object.entries(atributesObject)
                .forEach(value => {
                        console.log(value)
                        if (!isSystemAttr(value[0])) {
                            setData(prevState => [...prevState, {
                                id: "obj " + value[0],
                                firstValue: value[0],
                                secondValue: value[1]
                            }])
                        }
                    }
                )
        }

        if (atributesRelation) {
            Object.entries(atributesRelation)
                .forEach(value => {
                        if (!isSystemAttr(value[0])) {
                            setData(prevState => [...prevState, {
                                id: "rel " + value[0],
                                firstValue: value[0],
                                secondValue: value[1]
                            }])
                        }
                    }
                )
        }
        if (version) {
            setData(prevState => [...prevState, {id: "ver" + id, firstValue: "Версия", secondValue: version}])
        }

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

            <div className={"clearFilter"} style={{top: "1rem", right: "1rem"}}
                 onClick={() => onClose()}
            >
                <span className={"clearFilter__action"}>x</span>
            </div>
        </div>
    )
}