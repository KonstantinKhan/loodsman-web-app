import "./dropDown.sass"
import React, {useEffect, useRef, useState} from "react";

interface IProps {
    items: IDropItem[]
    getItems: (items: string[], currentQueryItem: string) => void
    statesRequest: string[]
    typesRequest: string[]
    type: string
    placeholder: string
    clearProps: boolean
    setClear: (clear: boolean) => void
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

    const sea = useRef<HTMLInputElement>(null)

    const {items, getItems, typesRequest, statesRequest, type, placeholder, clearProps, setClear} = props

    const [show, setShow] = useState(false)
    const [itemsArr, setItemsArr] = useState<IDropItem[]>([])
    const [value, setValue] = useState<string[]>([])
    const [focus, setFocus] = useState<IFocus>({inputFocus: false, suggestedFocus: false})
    const [queryValue, setQueryValue] = useState("")

    useEffect(() => {
        setItemsArr(items)
    }, [items])

    useEffect(() => {
        getItems(value, queryValue)
    }, [value, queryValue])

    useEffect(() => {
        if (clearProps) {
            setQueryValue("")
            setValue([])
        }
    }, [clearProps])

    useEffect(() => {
        if (!focus.inputFocus && !focus.suggestedFocus) {
            setShow(false)
        } else setShow(true)
    }, [focus])

    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.currentTarget.value
        setItemsArr(items.filter(value => value.name.toLowerCase().includes(q.toLowerCase())))
        setQueryValue(q)
    }

    const onChecked = (val: string, checked: boolean) => {
        setValue(prevState => {
            if (checked) {
                return [...prevState, val]
            } else {
                return prevState.filter(item => item !== val)
            }
        })
        sea.current!!.focus()
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
            <div
                className={"dropDown__search"}
            >
                <input
                    ref={sea}
                    className={"input"}
                    onChange={onFilter}
                    onFocus={() => {
                        setClear(false)
                        setFocus(prevState => ({
                            ...prevState,
                            inputFocus: true
                        }))
                    }}
                    onBlur={() => setFocus(prevState => ({
                        ...prevState,
                        inputFocus: false
                    }))}
                    placeholder={placeholder}
                    value={queryValue}
                />
                {
                    queryValue.length > 0 ?
                        <div className={"clearFilter"}
                             style={{
                                 right: "2rem"
                             }}
                             onClick={() => {
                                 setQueryValue("")
                                 sea.current!!.focus()
                             }}
                        >
                            <span className={"clearFilter__action"}
                                  style={{marginTop: "0.7rem", marginLeft: "-0.05rem"}}>{"<"}</span>
                        </div> : null
                }
                {
                    (statesRequest.length > 0 || typesRequest.length > 0) && value.length > 0 ?
                        <div className={"clearFilter"}
                             onClick={() => {
                                 setValue([])
                                 setQueryValue("")
                             }}
                        >
                            <span className={"clearFilter__action"}>x</span>
                        </div> : null
                }
            </div>
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