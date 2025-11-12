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
        increment: (state) => {
            state.step = state.step===state.maxSteps?state.maxSteps:state.step+1
        },
        decrement: (state) => {
            state.step = state.step===state.minSteps?state.minSteps:state.step-1
        },
        setIsOnPerformanceHistory: (state,action) => {
            if(action.payload){
                state.step=state.minSteps
            }
            state.isOnPerformanceHistory = action.payload
        }
    },
})

export const {
    increment,
    decrement,
    setIsOnPerformanceHistory
} = progressSlice.actions
export default progressSlice.reducer