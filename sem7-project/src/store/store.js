import { configureStore } from '@reduxjs/toolkit'
import testReducer from './test/testSlice'
import accreditationReducer from './accreditation/accSlice'
import performanceReducer from './performance/performanceSlice'

const store = configureStore({
    reducer: {
        test: testReducer,
        accreditation: accreditationReducer,
        performance: performanceReducer
    },
})

export default store