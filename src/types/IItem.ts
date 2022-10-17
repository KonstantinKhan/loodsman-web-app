export interface IItem {
    id: number
    idType: number
    type: string
    idProduct: number
    product: string
    idState: number
    state: string
    version: any
    dateOfCreate: string
    atributesObject: AtributesObject
    atributesRelation: any
    idParent: any
    idLinkType: any
    relationName: any
    inverseName: any
    minQuantity: any
    maxQuantity: any
}

interface AtributesObject {}