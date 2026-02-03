import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1,
    maxSteps: 3,
    minSteps: 1,
    isOnPerformanceHistory: false
}

const progressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        setProgressStep: (state,action) => {
            if(action.payload < state.minSteps || action.payload > state.maxSteps) return
            state.step = action.payload
        },
        setIsOnPerformanceHistory: (state,action) => {
            state.isOnPerformanceHistory = action.payload
        }
    },
})

export const {
    setProgressStep,
    setIsOnPerformanceHistory
} = progressSlice.actions
export default progressSlice.reducer