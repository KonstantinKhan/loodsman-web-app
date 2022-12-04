import React, {useEffect, useState} from "react"

import "./input.sass"
import {useDebounced} from "../../hooks/debounced";

interface InputProps {
    placeholder?: string
    onQuery: (query: string) => void
}

export const InputSearch: React.FC<InputProps> = (props) => {

    const {placeholder, onQuery} = props

    const [query, setQuery] = useState("")

    const debounced = useDebounced(query)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
    }

    useEffect(() => {
        onQuery(debounced)
    }, [debounced])

    return (
        <div className={"input__container"}>
            <input
                className={"input__area"}
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={onChange}
            />
        </div>
    )
}