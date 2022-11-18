import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum Mode {
    Tree,
    Search,
}

type ModeState = {
    mode: Mode
}

const initialState: ModeState = {
    mode: Mode.Tree
}

const modeSlice = createSlice({
    initialState,
    name: "mode",
    reducers: {
        toggleMode(state, action: PayloadAction<Mode>) {
            state.mode = action.payload
        }
    }
})

export const {toggleMode} = modeSlice.actions
export default modeSlice.reducer