import { postFileDataService } from "../../services/allServices"

export const postFile = async(file,thunkAPI) => {
    const state = thunkAPI.getState()
    const accBodyName = state.accreditation.currentAccBody
    const step = state.progress.step
    return await postFileDataService(file, accBodyName, step)
}

export const handleFileExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        console.log("File uploaded successfully:", action.payload);
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        console.log("File upload error: ", state.errMsg);
        state.loading = false
    })
}