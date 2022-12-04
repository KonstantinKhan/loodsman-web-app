import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFindObject} from "../types/IFindObject";

const initialState: IFindObject = {product: ""}

const findObjectSlice = createSlice({
    initialState,
    name: "findObject",
    reducers: {
        queryProduct(state, action: PayloadAction<string>) {
            state.product = action.payload
        }
    }
})

export const {queryProduct} = findObjectSlice.actions
export default findObjectSlice.reducer