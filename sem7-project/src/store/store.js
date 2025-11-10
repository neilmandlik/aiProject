import { configureStore } from '@reduxjs/toolkit'
import testReducer from './test/testSlice'
import accreditationReducer from './accreditation/accSlice'
import performanceReducer from './performance/performanceSlice'
import progressReducer from './progress/progressSlice'
import syllabusReducer from './syllabus/syllabusSlice'

const store = configureStore({
    reducer: {
        test: testReducer,
        accreditation: accreditationReducer,
        performance: performanceReducer,
        progress: progressReducer,
        syllabus: syllabusReducer,
    },
})

export default store