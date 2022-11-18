import React, {useState} from "react";
import {useGetStateQuery} from "../../redux/stateApi";
import {useGetTypeQuery} from "../../redux/typeApi";
import {useGetConfigQuery} from "../../redux/configApi";
import {useGetLoodsmanObjectQuery} from "../../redux";
import {IConfig} from "../../types/IConfig";
import configApp from "../../data/config.json"

interface ITreeItems {
    id: number,
    title: string,
    idType: number,
    idState: number
}

export const TreeItem: React.FC<ITreeItems> = (props) => {

    const {id, title, idType, idState} = props

    const [toggle, setToggle] = useState(false)

    const state = useGetStateQuery(idState)
    const type = useGetTypeQuery(idType)
    const config: IConfig = useGetConfigQuery().data
    const items = useGetLoodsmanObjectQuery(id).data

    const getToggleClass = () => {
        if (toggle) return "open"
        else return "close"
    }

    const getTitleType = () => {
        const typeTitle = config.types.find(value => value.id === idType)
        if (typeTitle) {
            return typeTitle.name
        }
    }

    const getTitleState = () => {
        return config.states.find((value: any) => value.id === idState)?.name
    }

    const onToggle = () => {
        setToggle(prevState => !prevState)
    }

    const renderItems = () => {
        const list = items?.map(item => {
            let title = item.product
            let attributeName = ""

            const res = configApp.configTitle.find(i => i.idType === item.idType)
            if (res) {
                const result = config.attributes.find(attribute => attribute.id === res.idAttr)
                if (result) {
                    attributeName = result.name
                }
            }
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
                idType={item.idType}
                idState={item.idState}/>
        })

        return (
            <ul>
                {list}
            </ul>
        )
    }

    const content = toggle && renderItems()

    return (
        <li style={{
            paddingLeft: "1.5rem",
            margin: "0.25rem 0",
        }}>
            <div className={"tree__item"}>
                <i
                    className={`pi pi-angle-right tree__item__button tree__item__button_${getToggleClass()}`}
                    onClick={() => onToggle()}
                ></i>
                <div className={"tree__container"}>
                    <img
                        className={"tree__icon"}
                        src={type.data}
                        alt="type"
                    />
                    <span className={"tree__tooltip"}>{getTitleType()}</span>
                </div>
                <div className={"tree__container"}>
                    <img
                        className={"tree__icon"}
                        src={state.data}
                        alt="state"
                    />
                    <span className={"tree__tooltip"}>{getTitleState()}</span>
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
            {content}
        </li>
    )
}