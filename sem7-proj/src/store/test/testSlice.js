import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { getTestData, handleTestDataExtraReducers } from './testSlice.helper'

export const getTestDataThunk = createAsyncThunk('data/getTestData',getTestData)

const initialState = {
    message: "",
    loading: false,
    errMsg: ""
}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {},
    extraReducers: (builder) => handleTestDataExtraReducers(builder,getTestDataThunk)
})


export default testSlice.reducer

