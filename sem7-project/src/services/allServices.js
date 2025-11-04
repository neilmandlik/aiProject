import data from '../assets/accPdfAPI.json' //Later will be changed with the actual path
import performanceData from '../assets/performanceAPI.json' //Later will be changed with the actual path

export const accrediationFileDataService = async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
}

export const performanceDataService = async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return performanceData;
}
