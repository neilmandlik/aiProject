import { getData, postData, postFile, putData } from '../CRUDOps';


//Accreditation Services

export const accrediationFileDataService = async() => {
    return await getData(`accreditation-file-names`)
}
export const getRubricsService = async(accId) => {
    return await getData(`rubrics/${accId}`)
}

export const saveRubricsService = async(accId, rubrics) => {
    return await putData(`rubrics/${accId}`, rubrics)    
}

export const addRubricsService = async(accId, rubrics) => {
    return await postData(`rubrics/${accId}`, rubrics)
}

export const generateRubricsService = async(accId) => {
    return await getData(`generate-rubrics/${accId}`)
}

//File Services

export const postFileDataService = async(file, accBodyName, collectionName, step) => {
    return await postFile(`file-upload?file-type=${step===1?"accreditation":"syllabus"}`, file, {accBodyName, collectionName})
}


//Performance Services

export const performanceHistoryService = async() => {
    return await getData('performance-review-names')
}

export const performanceDataService = async() => {
    return await getData(`review-report`)
}

export const generatePerformanceDataService = async(postDataObj) => {
    return await postData(`generate-review`, postDataObj)
}

export const getPerformanceReviewService = async(perId) => {
    return await getData(`get-review/${perId}`)
}


// Syllabus Services
export const syllabusFileNamesService = async() => {
    return await getData(`syllabus-file-name`)
}

