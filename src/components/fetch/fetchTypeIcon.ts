import {queryIconsType} from "../urls";
import {memoize} from "lodash"

const fetchTypeIcon = (idType: number): Promise<string> => {
    return new Promise(resolve => {
        fetch(`${queryIconsType}${idType}/icon`)
            .then(res => res.blob())
            .then(blob => {
                resolve(URL.createObjectURL(blob))
            })
    })
}

export default memoize(fetchTypeIcon)
