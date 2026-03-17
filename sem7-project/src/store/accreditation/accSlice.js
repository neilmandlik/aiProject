import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { 
    getAccrediationFileData, 
    getRubrics, 
    handleAccrediationExtraReducers,
    handleGetRubricsExtraReducers
} from "./accSlice.helper"
const initialState = {
    fileNames: [],

    loading: false,
    isLoadingRubrics: false,

    errMsg: '',

    currentAccBody: '',
    selectedAccFiles: [],
    rubrics: [],
    selectedAccId: 0
}

export const getAccrediationThunk = createAsyncThunk("api/getAccreditationFiles", getAccrediationFileData)
export const getGetRubricsThunk = createAsyncThunk("api/getRubrics", (_,thunkAPI) => getRubrics(thunkAPI))

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
            state.selectedAccFiles = state.fileNames.filter(fileObj=>fileObj.isChecked).map(fileObj=>fileObj.acc_id)
        },
        setSelectedAccId: (state, action) => {
            state.selectedAccId = action.payload
        }
    },
    extraReducers: (builder) => {
        handleAccrediationExtraReducers(builder, getAccrediationThunk)
        handleGetRubricsExtraReducers(builder, getGetRubricsThunk)
    }
})


export const {
    setCurrentAccBody, 
    setIsChecked, 
    setSelectedAccFiles,
    setSelectedAccId
} = accSlice.actions
export default accSlice.reducer