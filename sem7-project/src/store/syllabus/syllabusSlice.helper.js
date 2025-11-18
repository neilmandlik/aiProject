import { syllabusFileNamesService } from "../../services/allServices"


export const getSyllabusFileNames = async() => {
    return await syllabusFileNamesService()
}

export const handleSyllabusExtraReducers = (builder,getThunk) =>{
    builder
    .addCase(getThunk.pending ,(state)=>{
        state.loading = true
        state.errMsg = ""
    })
    .addCase(getThunk.fulfilled ,(state,action)=>{
        state.syllabusFiles = action.payload
        state.loading = false
        state.errMsg = ""
    })
    .addCase(getThunk.rejected ,(state,action)=>{
        state.errMsg = action.error.message
        state.loading = false
    })
}