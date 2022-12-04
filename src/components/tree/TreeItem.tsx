import React, {useEffect, useMemo, useState} from "react";
import {useLazyGetLoodsmanObjectQuery} from "../../redux";
import fetchTypeIcon from "../fetch/fetchTypeIcon";
import fetchStateIcon from "../fetch/fetchStateIcon";
import {Spinner} from "../spinner/Spinner";

interface ITreeItems {
    id: number,
    title: string,
    type: string,
    typeSrc: string,
    state: string,
    stateSrc: string
}

export const TreeItem: React.FC<ITreeItems> = (props) => {

    const {id, title, type, typeSrc, state, stateSrc} = props

    const [toggle, setToggle] = useState(false)
    const [children, setChildren] = useState<JSX.Element[]>([])

    const [getObject, {
        data = [],
        isSuccess, isUninitialized
    }] = useLazyGetLoodsmanObjectQuery()

    const getToggleClass = () => {
        if (toggle) return "open"
        else return "close"
    }

    const onToggle = () => {
        setToggle(prevState => !prevState)
    }

    useEffect(() => {
        if (toggle) {
            getObject(id, true)
        }
    }, [toggle])

    const renderItems = () => {
        const promises = data?.map(async item => {
            let title = item.product
            let attributeName = ""

            // const res = configApp.configTitle.find(i => i.idType === item.idType)
            // if (res) {
            //     const result = config?.attributes.find(attribute => attribute.id === res.idAttr)
            //     if (result) {
            //         attributeName = result.name
            //     }
            // }
            if (Object.keys(item.atributesObject).includes(attributeName)) {
                const v = Object.entries(item.atributesObject).find(pair => pair[0] === attributeName)
                if (v) {
                    title = v[1]
                }
            }
            return <TreeItem
                key={item.id}
                id={item.id}
                title={title}
                type={item.type}
                typeSrc={await fetchTypeIcon(item.idType)}
                state={item.state}
                stateSrc={await fetchStateIcon(item.idState)}
            />
        })

        Promise.all(promises)
            .then(value => {
                setChildren(value)
            })
            .catch(e => console.log(e))
    }

    const childrenElements = useMemo(() => {
        if (children && children.length > 0) {
            return (
                <ul>
                    {children}
                </ul>
            )
        } else if (toggle && isUninitialized) {
            return (
                <div
                    style={{
                        position: "relative",
                        borderRadius: "6px",
                        overflowY: "auto",
                        height: "2rem",
                        margin: "0.25rem",
                    }}
                >
                    <Spinner/>
                </div>
            )
        } else return null
    }, [children, toggle])

    useEffect(() => {
        if (isSuccess) {
            renderItems()
        }
    }, [data])

    const renderTreeItem = useMemo(() => {
        return (
            <div className={"tree__item"}>
                <i
                    className={`pi pi-angle-right tree__item__button tree__item__button_${getToggleClass()}`}
                    onClick={() => onToggle()}
                ></i>
                <div className={"tree__container"}>
                    <img
                        className={"tree__icon"}
                        src={typeSrc}
                        alt="type"
                    />

                    <span className={"tree__tooltip"}>{type}</span>
                </div>
                <div className={"tree__container"}>
                    <img
                        className={"tree__icon"}
                        src={stateSrc}
                        alt="state"
                    />
                    <span className={"tree__tooltip"}>{state}</span>
                </div>
                <div className={"tree__container"} style={{
                    width: "80%",
                    textOverflow: "ellipsis"
                }}>
                    <span
                        className={"tree__item__title"}
                    >
                        {title}
                    </span>
                </div>
            </div>
        )
    }, [id, toggle])

    return (
        <li style={{
            paddingLeft: "1.5rem",
            margin: "0.25rem 0",
        }}>
            {renderTreeItem}
            {toggle ? childrenElements : null}
        </li>
    )
}