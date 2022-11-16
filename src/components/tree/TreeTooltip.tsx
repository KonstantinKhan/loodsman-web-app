import React from "react";

interface ITreeTooltip {
    title: string
}

export const TreeTooltip: React.FC<ITreeTooltip> = (props) => {

    const {title} = props

    return (
        <div className="tree__tooltip">
            <span>{title}</span>
        </div>
    )
}