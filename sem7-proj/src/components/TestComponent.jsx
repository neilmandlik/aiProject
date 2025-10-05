import { getTestDataThunk } from '../store/test/testSlice'
import { store } from '../store/store'
import { useSelector } from 'react-redux'

export const testLoader = () => { 
    store.dispatch(getTestDataThunk())
    return null  
} 
function TestComponent(){

    const {message} = useSelector((state)=>state.test)

    return(
        <>
            <p>Hello World</p>
            <p>{message}</p>
        </>
    )
}

export default TestComponent