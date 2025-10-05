import { getTestDataService } from "../../services/testService"

export const getTestData = async()=> {
    return await getTestDataService()
}

export const handleTestDataExtraReducers = (builder,getTestDataThunk) =>{

    builder
    .addCase(getTestDataThunk.pending,(state)=>{state.loading = true})
    .addCase(getTestDataThunk.fulfilled,(state,action)=>{
        state.message = action.payload.message
        state.loading = false
    })
    .addCase(getTestDataThunk.rejected,(state)=>{
        state.errMsg = "Error Occured"
        state.loading = false
    })
}