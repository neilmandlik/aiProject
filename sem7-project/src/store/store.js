import { configureStore } from '@reduxjs/toolkit'
import testReducer from './test/testSlice'
import accreditationReducer from './accreditation/accSlice'
import performanceReducer from './performance/performanceSlice'
import progressReducer from './progress/progressSlice'

const store = configureStore({
    reducer: {
        test: testReducer,
        accreditation: accreditationReducer,
        performance: performanceReducer,
        progress: progressReducer,
    },
})

export default store