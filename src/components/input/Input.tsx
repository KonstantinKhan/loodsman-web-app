import React from "react"

import "./input.sass"

interface InputProps {
    placeholder?: string
}

export const Input: React.FC<InputProps> = (props) => {

    const {placeholder} = props

    return (
        <div className={"input__container"}>
            <input
                className={"input__area"}
                type="text"
                placeholder={placeholder}
            />
        </div>
    )
}