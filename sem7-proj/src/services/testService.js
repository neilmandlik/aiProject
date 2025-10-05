import { getData } from '../CRUDOps'
export const getTestDataService = async() =>{
    return await getData('api/test')
}