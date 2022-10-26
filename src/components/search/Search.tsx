import "./search.sass"
import React from "react";
import {search} from "../urls";
import {ISearch} from "../../types/ISearch";

export const Search: React.FC = () => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const data: ISearch = {
            attrCondition: [],
            product: "АГ52.289.047",
            states: [],
            types: [],
            version: ""
        }

        fetch(`${search}`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    return (
        <>
            <input
                onChange={onChange}
            />
        </>
    )
}