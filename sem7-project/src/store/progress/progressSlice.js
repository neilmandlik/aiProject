import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1,
    maxProgressSteps: 3,
    maxSteps: 5,
    minSteps: 1
}

const progressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        setProgressStep: (state,action) => {
            if(action.payload < state.minSteps || action.payload > state.maxSteps) return
            state.step = action.payload
        }
    },
})

export const {
    setProgressStep,
} = progressSlice.actions
export default progressSlice.reducer