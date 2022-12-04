export interface IFindObject {
    product: string
    version?: string
    types?: string[]
    states?: string[]
    attrCondition?: IAttrCondition[]
}

export interface IAttrCondition {
    name?: string
    condition?: string
    pattern?: string
}
