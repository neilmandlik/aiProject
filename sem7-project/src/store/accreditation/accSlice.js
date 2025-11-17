import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAccrediationFileData, handleAccrediationExtraReducers} from "./accSlice.helper"
const initialState = {
    fileNames: [],
    loading: false,
    errMsg: '',
    currentAccBody: '',
    selectedAccFiles: []
}

export const getAccrediationThunk = createAsyncThunk("api/getAccreditationFiles", getAccrediationFileData)

const accSlice = createSlice({
    name: "accreditation",
    initialState,
    reducers: {
        setCurrentAccBody: (state, action) => {
            state.currentAccBody = action.payload
        },
        setIsChecked: (state, action) => {
            const {index, isChecked} = action.payload
            state.fileNames[index].isChecked = isChecked
        },
        setSelectedAccFiles: (state) => {
            state.selectedAccFiles = state.fileNames.filter(fileObj=>fileObj.isChecked)
        }
    },
    extraReducers: (builder) => handleAccrediationExtraReducers(builder, getAccrediationThunk)
})


export const {setCurrentAccBody, setIsChecked, setSelectedAccFiles} = accSlice.actions
export default accSlice.reducer