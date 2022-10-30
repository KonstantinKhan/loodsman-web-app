export interface IConfig {
    attributes: Attribute[]
    states: State[]
    types: Type[]
}

export interface Attribute {
    id: number
    name: string
    type: number
    def: string
    txtlist: string
    system: boolean
    onlyListItems: boolean
}

export interface State {
    id: number
    name: string
}

export interface Type {
    id: number
    name: string
    isAbstract: boolean
    isDocument: boolean
    states: number[]
    attributes: number[]
    idParent: number
}