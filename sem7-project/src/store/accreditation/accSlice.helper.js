import { accrediationFileDataService } from "../../services/allServices"

export const getAccrediationFileData = async() => {
    return await accrediationFileDataService()
}

export const handleAccrediationExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.fileNames = action.payload
        state.loading = false
    })
    .addCase(getThunk.rejected ,(state)=>{
        state.errMsg = "Error Occured"
        state.loading = false
    })
}