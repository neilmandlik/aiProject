import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { generatePerformanceReview, getPerformanceData, getPerformanceReview, handleGenerateReviewExtraReducers, handleGetReviewExtraReducers, handlePerformanceExtraReducers } from "./performance.helper"

export const getPerformanceThunk = createAsyncThunk("api/getPerformanceRecords", getPerformanceData)
export const generatePerformanceThunk = createAsyncThunk("api/generatePerformance", (_,thunkAPI) => generatePerformanceReview(thunkAPI) )
export const getPerformanceReviewThunk = createAsyncThunk("api/getPerformanceReview", (_,thunkAPI) => getPerformanceReview(thunkAPI))

const initialState = {
    performanceSummary: {},
    successData: {},
    performanceRecords: [],
    loading: false,
    errMsg: "",
    selectedId: 0,
    reviewLoading: false,
    isGenerateResponseLoading: false
}

const performanceSlice = createSlice({
    name: "performance",
    initialState,
    reducers: {
        toggleReviewVisibility: (state, action) => {
            const index = action.payload;
            state.performanceRecords = state.performanceRecords.map((item, idx) => index === idx ? {...item, isReviewVisible: !item.isReviewVisible} : item);
        },
        setSelectedId: (state,action) => {
            state.selectedId = action.payload
        },
        setIsGenerateResponseLoading: (state,action) => {
            state.isGenerateResponseLoading = action.payload
        },
        setSuccessdata: (state,action) => {
            state.successData = action.payload
        },
    },
    extraReducers: (builder) => {
        handlePerformanceExtraReducers(builder, getPerformanceThunk);
        handleGenerateReviewExtraReducers(builder, generatePerformanceThunk);
        handleGetReviewExtraReducers(builder, getPerformanceReviewThunk)
    }
})

export const { 
    toggleReviewVisibility, 
    setSelectedId, 
    setIsGenerateResponseLoading,
    setSuccessdata
} = performanceSlice.actions
export default performanceSlice.reducer