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
    atributesObject: AttributesObject
    atributesRelation: AttributeRelation
    idParent: any
    idLinkType: any
    relationName: any
    inverseName: any
    minQuantity: any
    maxQuantity: any
}

interface AttributesObject {}

interface AttributeRelation {}