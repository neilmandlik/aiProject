import { performanceHistoryService } from "../../services/allServices"

export const getPerformanceData = async() => {
    return await performanceHistoryService()
}

export const handlePerformanceExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
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