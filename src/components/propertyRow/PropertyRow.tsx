import "./propertyRow.sass"
import React from "react";

interface IProps {
    first: string,
    second: string
}

export const PropertyRow: React.FC<IProps> = (props: IProps) => {

    const {first, second} = props

    return (
        <div className={"propertyRow"}>
            <span
                className={"propertyRow__first"}
            >
                {first}
            </span>
            <span
                className={"propertyRow__second"}
            >
                {second}
            </span>

            <hr className={"propertyRow__underline"}/>
        </div>
    )
}