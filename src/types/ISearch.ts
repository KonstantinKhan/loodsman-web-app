export interface ISearch {
    product: string
    version: string
    types: string[]
    states: string[]
    attrCondition: AttrCondition[]
}

interface AttrCondition {
    name: string
    condition: string
    pattern: string
}