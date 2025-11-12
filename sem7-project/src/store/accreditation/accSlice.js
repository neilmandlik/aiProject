import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAccrediationFileData, handleAccrediationExtraReducers} from "./accSlice.helper"
const initialState = {
    fileNames: [],
    loading: false,
    errMsg: '',
    currentAccBody: '',
}

export const getAccrediationThunk = createAsyncThunk("api/getAccreditationFiles", getAccrediationFileData)

const accSlice = createSlice({
    name: "accreditation",
    initialState,
    reducers: {
        setCurrentAccBody: (state, action) => {
            state.currentAccBody = action.payload
        }
    },
    extraReducers: (builder) => handleAccrediationExtraReducers(builder, getAccrediationThunk)
})


export const {setCurrentAccBody} = accSlice.actions
export default accSlice.reducer