import { useSelector } from "react-redux"
import store from "../store/store"
import { getTestThunk } from "../store/test/testSlice"

export const testLoader = () => {
    store.dispatch(getTestThunk())
}

function TestComponent(){

    const {message} = useSelector((state)=>state.test)

    return(
        <>
            <p>Hello</p>
            <p>{message}</p>
        </>
    )
}

export default TestComponent