import data from '../assets/accPdfAPI.json' //Later will be changed with the actual path
import performanceData from '../assets/performanceAPI.json' //Later will be changed with the actual path
import { getData, postFile } from '../CRUDOps';

export const accrediationFileDataService = async() => {
    return await getData(`accreditation-file-names`)
}

export const postFileDataService = async(file, accBodyName, step) => {
    return await postFile(`file-upload?file-type=${step===1?"accreditation":"syllabus"}`, file, {accBodyName})
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