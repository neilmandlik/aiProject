import { getData, postData, postFile } from '../CRUDOps';

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

export const generatePerformanceDataService = async(postDataObj) => {
    return await postData(`generate-review`, postDataObj)
}

export const getPerformanceReviewService = async(perId) => {
    return await getData(`get-review/${perId}`)
}