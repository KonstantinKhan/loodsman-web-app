import "./dropDown.sass"
import React, {useEffect, useState} from "react";

interface IProps {
    items: IDropItem[]
    getItems: (items: string[]) => void
    statesRequest: string[]
    typesRequest: string[]
    type: string
}

interface IFocus {
    inputFocus: boolean
    suggestedFocus: boolean
}

export interface IDropItem {
    id: number,
    name: string,
}

export const DropDown: React.FC<IProps> = (props: IProps) => {

    const {items, getItems, typesRequest, statesRequest, type} = props
    const [show, setShow] = useState(false)
    const [itemsArr, setItemsArr] = useState<IDropItem[]>([])
    const [value, setValue] = useState<string[]>([])
    const [focus, setFocus] = useState<IFocus>({inputFocus: false, suggestedFocus: false})

    useEffect(() => {
        setItemsArr(items)
    }, [items])

    useEffect(() => {
        getItems(value)
    }, [value])

    useEffect(() => {
        if (!focus.inputFocus && !focus.suggestedFocus) {
            setShow(false)
        } else setShow(true)
    }, [focus])

    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemsArr(items.filter(value => value.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())))
    }

    const onChecked = (val: string, checked: boolean) => {
        setValue(prevState => {
            if (checked) {
                return [...prevState, val]
            } else {
                return prevState.filter(item => item !== val)
            }
        })
    }

    const isChecked = (value: string) => {
        switch (type) {
            case "types":
                return typesRequest.includes(value)
            case "states":
                return statesRequest.includes(value)
            default:
                return false
        }
    }


    return (
        <div
            className={"dropDown__container"}
        >

            <input
                className={"input"}
                onChange={onFilter}
                onFocus={() => setFocus(prevState => ({
                    ...prevState,
                    inputFocus: true
                }))}
                onBlur={() => setFocus(prevState => ({
                    ...prevState,
                    inputFocus: false
                }))}
            />

            {
                show ? <div
                    className="dropDown__suggest"
                >
                    {
                        itemsArr.map(item =>
                            <RowDropDown
                                key={item.id}
                                name={item.name}
                                onChecked={onChecked}
                                onFocusProps={focus => setFocus(prevState => ({
                                    ...prevState,
                                    suggestedFocus: focus
                                }))}
                                checked={isChecked(item.name)}
                            />)
                    }
                </div> : null
            }
        </div>
    )
}

interface IRowProps {
    name: string
    onChecked: (value: string, checked: boolean) => void
    onFocusProps: (focus: boolean) => void
    checked: boolean
}

const RowDropDown: React.FC<IRowProps> = (props: IRowProps) => {

    const {name, onChecked, onFocusProps, checked} = props

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChecked(name, e.currentTarget.checked)
    }

    const onFocus = () => {
        onFocusProps(true)
    }

    const onBlur = () => {
        onFocusProps(false)
    }

    return (
        <div
            className={"dropDown__rowBlock"}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <input
                className={"dropDown__rowBlock__input"}
                type={"checkbox"}
                onChange={onChange}
                checked={checked}
            />
            <p
                className={"dropDown__rowBlock__value"}
            >
                {name}
            </p>
        </div>
    )
}