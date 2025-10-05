import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getTestData, handleTestExtraReducers } from "./testSlice.helper"


const initialState = {
    message: "",
    errMsg: "",
    loading: false
}

export const getTestThunk = createAsyncThunk("api/getTest",getTestData)

const testSlice = createSlice({
    name:"test",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => handleTestExtraReducers(builder,getTestThunk)
})

export default testSlice.reducer