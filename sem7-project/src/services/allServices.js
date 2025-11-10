import data from '../assets/accPdfAPI.json' //Later will be changed with the actual path
import performanceData from '../assets/performanceAPI.json' //Later will be changed with the actual path
import { getData } from '../CRUDOps';

export const accrediationFileDataService = async() => {
    return await getData(`accreditation-file-names`)
}

export const performanceHistoryService = async() => {
    return await getData('performance-review-names')
}

export const performanceDataService = async() => {
    return await getData(`review-report`)
}

export const syllabusFileNamesService = async() => {
    return await getData(`syllabus-file-name`)
}