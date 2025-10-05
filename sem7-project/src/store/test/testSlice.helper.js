import { getTestDataService } from "../../services/testService"

export const getTestData = async() => {
    return await getTestDataService()
}

export const handleTestExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.message = action.payload.message
        state.loading = false
    })
    .addCase(getThunk.rejected ,(state)=>{
        state.errMsg = "Error Occured"
        state.loading = false
    })
}