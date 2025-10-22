import { configureStore } from '@reduxjs/toolkit'
import testReducer from './test/testSlice'
import accreditationReducer from './accreditation/accSlice'

const store = configureStore({
    reducer: {
        test: testReducer,
        accreditation: accreditationReducer,
    },
})

export default store