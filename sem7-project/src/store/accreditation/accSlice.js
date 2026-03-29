import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { 
    addRubrics,
    getAccrediationFileData, 
    getRubrics, 
    handleAccrediationExtraReducers,
    handleGetRubricsExtraReducers,
    handleSaveRubricsExtraReducers,
    handleAddRubricsExtraReducers,
    saveRubrics,
    generateRubrics,
} from "./accSlice.helper"

const initialState = {
    fileNames: [],

    loading: false,
    isLoadingRubrics: false,
    isSavingRubrics: false,

    errMsg: '',

    currentAccBody: '',
    currentCollection: '',
    selectedAccFiles: [],
    rubricData: null,
    selectedAccId: 0
}

export const getAccrediationThunk = createAsyncThunk("api/getAccreditationFiles", getAccrediationFileData)
export const getGetRubricsThunk = createAsyncThunk("api/getRubrics", (_,thunkAPI) => getRubrics(thunkAPI))
export const saveRubricsThunk = createAsyncThunk("api/saveRubrics", (_,thunkAPI) => saveRubrics(thunkAPI))
export const addRubricsThunk = createAsyncThunk("api/addRubrics", (_,thunkAPI) => addRubrics(thunkAPI))
export const generateRubricsThunk = createAsyncThunk("api/generateRubrics", (_,thunkAPI) => generateRubrics(thunkAPI))

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
        },
        setRubricData: (state, action) => {
            state.rubricData.rubrics = action.payload.map(ele=>ele)
        },
        setFileNames: (state,action) => {
            state.fileNames = action.payload.map(ele=>ele)
        },
        setCurrentCollectionName: (state, action) => {
            state.currentCollection = action.payload
        }
    },
    extraReducers: (builder) => {
        handleAccrediationExtraReducers(builder, getAccrediationThunk)
        handleGetRubricsExtraReducers(builder, getGetRubricsThunk)
        handleSaveRubricsExtraReducers(builder, saveRubricsThunk)
        handleAddRubricsExtraReducers(builder, addRubricsThunk)
        handleGetRubricsExtraReducers(builder, generateRubricsThunk)
    }
})


export const {
    setCurrentAccBody, 
    setIsChecked, 
    setSelectedAccFiles,
    setSelectedAccId,
    setRubricData,
    setFileNames,
    setCurrentCollectionName
} = accSlice.actions
export default accSlice.reducer