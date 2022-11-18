export interface FindObject {
    product: string
    version: string
    types: string[]
    states: string[]
    attrCondition: AttrCondition[]
}

export interface AttrCondition {
    name: string
    condition: string
    pattern: string
}
