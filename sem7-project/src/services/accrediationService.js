import data from '../assets/accPdfAPI.json' //Later will be changed with the actual path
export const accrediationFileDataService = async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
}