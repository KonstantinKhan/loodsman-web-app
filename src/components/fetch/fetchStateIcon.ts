import {queryIconsState} from "../urls";
import {memoize} from "lodash"

const fetchTypeIcon = (idState: number): Promise<string> => {
    return new Promise(resolve => {
        fetch(`${queryIconsState}${idState}/icon`)
            .then(res => res.blob())
            .then(blob => {
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = () => resolve(reader.result as string)
            })
    })
}

export default memoize(fetchTypeIcon)