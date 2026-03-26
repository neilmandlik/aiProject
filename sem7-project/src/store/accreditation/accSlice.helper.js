import { accrediationFileDataService, addRubricsService, getRubricsService, saveRubricsService } from "../../services/allServices"
import { getGetRubricsThunk } from "./accSlice"

export const getAccrediationFileData = async() => {
    return await accrediationFileDataService()
}

export const getRubrics = async(thunkAPI) => {
    const accId = thunkAPI.getState().accreditation.selectedAccId
    return await getRubricsService(accId)
}

export const saveRubrics = async(thunkAPI) => {
    const rubrics = thunkAPI.getState().accreditation.rubricData.rubrics
    const tranformedRubrics = mapRubricDataToPayload(rubrics)
    const accId = thunkAPI.getState().accreditation.selectedAccId
    return await saveRubricsService(accId, tranformedRubrics)
}

export const addRubrics = async(thunkAPI) => {
    const rubrics = thunkAPI.getState().accreditation.rubricData.rubrics
    const tranformedRubrics = mapRubricDataToPayload(rubrics)
    const accId = thunkAPI.getState().accreditation.selectedAccId
    return await addRubricsService(accId, tranformedRubrics)
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
        state.rubricData = {
            usedInEvaluation: action.payload.usedInEvaluation,
            rubrics: action.payload.rubrics.map(ele=>({
                accRubTitle: ele.accRubTitle,
                accRubDescription: ele.accRubDescription,
                accRubId: ele.accRubId,
                accId: ele.accId,
                status: ele.accActiveStatus,
                hasChanged: false
            }))
        }
        state.isLoadingRubrics = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.isLoadingRubrics = false
    })
}

export const handleSaveRubricsExtraReducers = (builder, getThunk) => {
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.isSavingRubrics = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.isSavingRubrics = false
        getGetRubricsThunk()
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.isSavingRubrics = false
    })

}

export const handleAddRubricsExtraReducers = (builder, getThunk, thunkAPI) => {
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.isSavingRubrics = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.isSavingRubrics = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.isSavingRubrics = false
    })

}


export const mapRubricDataToPayload = (rubrics) => {
    return rubrics.map(ele=>({
        rubric: ele.accRubTitle,
        description: ele.accRubDescription,
        status: ele.status,
        hasChanged: ele.hasChanged,
        accRubId: ele.accRubId,
        accId: ele.accId
    }))
}
