import { accrediationFileDataService } from "../../services/allServices"

export const getAccrediationFileData = async() => {
    return await accrediationFileDataService()
}

export const handleAccrediationExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.fileNames = action.payload.map(fileObj=>({
            ...fileObj,
            isChecked: false
        }))
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.loading = false
    })
}