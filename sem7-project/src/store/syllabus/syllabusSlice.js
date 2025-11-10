import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSyllabusFileNames, handleSyllabusExtraReducers } from "./syllabusSlice.helper"

const initialState = {
    syllabusFile: {
        fileName: ""
    },
    loading: false,
    errMsg: ""
}

export const getSyllabusFileNameThunk = createAsyncThunk('syllabus/fetchFileNames', getSyllabusFileNames)

const syllabusSlice = createSlice({
    name: 'syllabus',
    initialState,
    reducers: {},
    extraReducers: (builder) => handleSyllabusExtraReducers(builder, getSyllabusFileNameThunk)
})

export default syllabusSlice.reducer
