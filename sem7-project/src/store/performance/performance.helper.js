import { generatePerformanceDataService, getPerformanceReviewService, performanceHistoryService } from "../../services/allServices"

export const getPerformanceData = async() => {
    return await performanceHistoryService()
}

export const generatePerformanceReview = async(thunk) => {
    const accreditation = thunk.getState().accreditation
    const syllabus = thunk.getState().syllabus
    const postBodyObj = {
        accFiles: accreditation.selectedAccFiles,
        syllFile: syllabus.selectedSyllabusFile
    }

    return await generatePerformanceDataService(postBodyObj)
}

export const getPerformanceReview = async(thunk) => {
    const performance = thunk.getState().performance
    const id = performance.selectedId
    if(id == -1){
        console.error("No Id selected")
    }
    return await getPerformanceReviewService(id)
}

export const handlePerformanceExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.performanceRecords = action.payload.performances.map(item=>({
            reviewName: item.performance_name,
        }))
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.loading = false
    })
}

export const handleGenerateReviewExtraReducers = (builder, getThunk) => {
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.isGenerateResponseLoading = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.successData = {...action.payload}
        if(!state.successData.performanceId){
            state.successData.isReviewGenerated = false
        }
        else{
            state.selectedId = state.successData.performanceId
        }
        state.isGenerateResponseLoading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.isGenerateResponseLoading = false
    })
}


export const handleGetReviewExtraReducers = (builder, getThunk) => {
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.performanceSummary = {...action.payload}
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.loading = false
    })
}