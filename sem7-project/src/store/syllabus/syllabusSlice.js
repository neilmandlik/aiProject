import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSyllabusFileNames, handleSyllabusExtraReducers } from "./syllabusSlice.helper"

const initialState = {
    syllabusFiles: [],
    loading: false,
    errMsg: "",
    selectedSyllabusFile: 0
}

export const getSyllabusFileNameThunk = createAsyncThunk('syllabus/fetchFileNames', getSyllabusFileNames)

const syllabusSlice = createSlice({
    name: 'syllabus',
    initialState,
    reducers: {
        setSelectedSyllabusFile: (state, action) => {
            state.selectedSyllabusFile = action.payload
        }
    },
    extraReducers: (builder) => handleSyllabusExtraReducers(builder, getSyllabusFileNameThunk)
})


export const {setSelectedSyllabusFile} = syllabusSlice.actions
export default syllabusSlice.reducer
