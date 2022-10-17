import {IItem} from "../../types/IItem";
import React, {useState} from "react";

import "./item.sass"
import {fetchItems} from "../fetch/fetchItems";

interface IProps {
    project: IItem
    items?: IItem[]
    level: number
    toggle: boolean
}

const url = "http://78.29.34.68:8888/object/"

const Item: React.FC<IProps> = (props) => {

    const {product, id} = props.project
    const {level, toggle} = props
    const [items, setItems] = useState<IItem[]>([])
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     console.log("useEffect")
    //     setLoading(true)
    //     fetch(`${url}${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.length > 0) {
    //                 setToggle(true)
    //             } else {
    //                 setToggle(false)
    //             }
    //             setLoading(false)
    //         })
    // }, [])

    const expandTree = () => {
        fetchItems<IItem[]>(`${url}${id}`)
            .then(response => {
                setItems(response)
            })
            .catch(error => console.log(error))
    }

    const expand = () => {
        onLoading()
        if (items.length === 0) {
            expandTree()
        } else {
            setItems([])
        }
        setLoading(false)
    }

    const onLoading = () => {
        setLoading(true)
    }

    const renderItems = () => {
        return (
            <>
                <li
                    className={"item"}
                    style={{
                        left: `${level + 1}rem`
                    }}
                >
                 <span
                     className={"item__title"}
                     style={{
                         left: `${level + 2}rem`
                     }}
                 >
                    {product}
                </span>
                    {
                        toggle ? <div
                            className={"item__toggle"}
                            style={{
                                left: `${level}rem`
                            }}
                            onClick={expand}
                        >
                    <span>
                        {items.length > 0 ? "-" : "+"}
                    </span>
                        </div> : null
                    }

                </li>
                {/*<ul>*/}
                {/*    <ItemList level={level + 1} url={url}/>*/}
                {/*</ul>*/}
            </>
        )
    }
    return (
        <>
            {renderItems()}
        </>
    )
}

export {Item}