import { generatePerformanceDataService, getPerformanceReviewService, performanceHistoryService } from "../../services/allServices"

export const getPerformanceData = async() => {
    return await performanceHistoryService()
}

export const generatePerformanceReview = async(thunk) => {
    const performance = thunk.getState().performance
    const syllabus = thunk.getState().syllabus
    const postBodyObj = {
        accFiles: performance.selectedAccFiles,
        syllFile: syllabus.selectedSyllFile
    }

    return await generatePerformanceDataService(postBodyObj)
}

export const getPerformanceReview = async(thunk) => {
    const performance = thunk.getState().performance
    const id = performance.selectedId
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
            reviewData: item.reviewData,
            isReviewVisible: false
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
        state.loading = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.successData = {...action.payload}
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.loading = false
    })
}


export const handleGetReviewExtraReducers = (builder, getThunk) => {
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.successData = {...action.payload}
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.loading = false
    })
}