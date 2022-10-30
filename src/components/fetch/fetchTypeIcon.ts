import {queryIconsType} from "../urls";
import {memoize} from "lodash"

const fetchTypeIcon = (idType: number): Promise<string> => {
    return new Promise(resolve => {
        fetch(`${queryIconsType}${idType}/icon`)
            .then(res => res.blob())
            .then(blob => {
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = () => resolve(reader.result as string)
            })
    })
}

export default memoize(fetchTypeIcon)