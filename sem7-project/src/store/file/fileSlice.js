import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { handleFileExtraReducers, postFile } from "./fileSlice.helper"
const initialState = {
    errMsg: "",
    loading: false
}

export const postFileThunk = createAsyncThunk("api/postAccreditationFile", (file,thunkAPI) => postFile(file,thunkAPI))

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => handleFileExtraReducers(builder, postFileThunk)
})

export default fileSlice.reducer