import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAccrediationFileData, handleAccrediationExtraReducers } from "./accSlice.helper"
const initialState = {
    fileNames: [],
    loading: false,
    errMsg: ""
}

export const getAccrediationThunk = createAsyncThunk("api/getAccreditationFiles", getAccrediationFileData)

const accSlice = createSlice({
    name: "accreditation",
    initialState,
    reducers: {},
    extraReducers: (builder) => handleAccrediationExtraReducers(builder, getAccrediationThunk)
})

export default accSlice.reducer