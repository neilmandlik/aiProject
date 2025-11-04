import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPerformanceData, handlePerformanceExtraReducers } from "./performance.helper"

export const getPerformanceThunk = createAsyncThunk("api/getPerformanceRecords", getPerformanceData)

const initialState = {
    performanceRecords: [],
    loading: false,
    errMsg: ""
}

const performanceSlice = createSlice({
    name: "performance",
    initialState,
    reducers: {
        toggleReviewVisibility: (state, action) => {
            const index = action.payload;
            state.performanceRecords = state.performanceRecords.map((item, idx) => index === idx ? {...item, isReviewVisible: !item.isReviewVisible} : item);
        }
    },
    extraReducers: (builder) => handlePerformanceExtraReducers(builder, getPerformanceThunk)
})

export const { toggleReviewVisibility } = performanceSlice.actions
export default performanceSlice.reducer