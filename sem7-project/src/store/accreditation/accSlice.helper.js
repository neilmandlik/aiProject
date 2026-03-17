import { accrediationFileDataService, getRubricsService } from "../../services/allServices"

export const getAccrediationFileData = async() => {
    return await accrediationFileDataService()
}

export const getRubrics = async(thunkAPI) => {
    const accId = thunkAPI.getState().accreditation.selectedAccId
    return await getRubricsService(accId)
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
            isChecked: (state.selectedAccFiles.includes(fileObj.acc_id)?true:false)
        }))
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.loading = false
    })
}
export const handleGetRubricsExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.isLoadingRubrics = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.rubrics = action.payload.map(ele=>({
            accRubTitle: ele.accRubTitle,
            accRubDescription: ele.accRubDescription,
            accRubId: ele.accRubId,
            accId: ele.accId
        }))
        state.isLoadingRubrics = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.isLoadingRubrics = false
    })
}